import { AbstractGameSolver } from "../../common/abstract-helpers/AbstractGameSolver.js";
import { TangoGridCell } from "../TangoGridCell.js";
import { EdgeModifierGrid } from "../../common/EdgeModifierGrid.js";
import { TangoGridSnapshot } from "../TangoGridSnapshot.js";
import { TangoRowCollection } from "./TangoRowCollection.js";

/**
 * Utility function to print a tango game grid snapshot to the console
 * @param {TangoGridSnapshot} snapshot - The tango grid snapshot to print
 * @param {string} [title="Grid Snapshot"] - Optional title for the console output
 */
function printTangoGridSnapshot(snapshot, title = "Grid Snapshot") {
  if (!snapshot || !snapshot.grid) {
    console.log(`${title}: Invalid snapshot`);
    return;
  }

  console.group(title);

  const gridLines = [];
  for (let row = 0; row < snapshot.gridSize; row++) {
    let line = "";
    for (let col = 0; col < snapshot.gridSize; col++) {
      const cell = snapshot.grid[row][col];
      let symbol;

      if (cell.cellState === "moon") {
        symbol = "🌙";
      } else if (cell.cellState === "sun") {
        symbol = "☀️";
      } else if (cell.cellState === "empty") {
        symbol = ".";
      } else {
        symbol = "?";
      }

      line += `${symbol.toString().padStart(2)} `;
    }
    gridLines.push(`${row}: ${line}`);
  }

  console.log("Grid:");
  gridLines.forEach((line) => console.log(line));
  console.groupEnd(`==================`);
}

export class TangoGameSolver extends AbstractGameSolver {
  constructor() {
    super(TangoGridCell);
  }

  /**
   * @type {EdgeModifierGrid}
   */
  #edgeModifierGrid;

  /**
   * @param {TangoGridSnapshot} currentSnapshot
   * @param {number} rowIndex
   */
  #exploreRows(currentSnapshot, rowIndex) {
    if (rowIndex >= currentSnapshot.gridSize) return currentSnapshot;

    const rowCollection = new TangoRowCollection(
      rowIndex,
      currentSnapshot.grid,
      this.#edgeModifierGrid
    );

    const allValidRows = rowCollection.getAllValidRows();

    for (const validRow of allValidRows) {
      const nextSnapshot = currentSnapshot.crossRow(validRow);
      printTangoGridSnapshot(nextSnapshot, `Row ${rowIndex}`);
      const solutionSnapshot = this.#exploreRows(nextSnapshot, rowIndex + 1);
      if (solutionSnapshot) return solutionSnapshot;
    }

    return null;
  }

  /**
   * @param {TangoGridCell[][]} gameGrid
   * @param {EdgeModifierGrid} edgeModifierGrid
   */
  getSolvedGrid(gameGrid, edgeModifierGrid) {
    this.#edgeModifierGrid = edgeModifierGrid;
    // console.log("Starting Tango Game Solver...", gameGrid);
    const initialSnapshot = new TangoGridSnapshot(gameGrid);

    printTangoGridSnapshot(initialSnapshot, "Initial Snapshot");
    // console.log(initialSnapshot.grid);

    const solutionSnapshot = this.#exploreRows(initialSnapshot, 0);
    return solutionSnapshot;
  }
}
