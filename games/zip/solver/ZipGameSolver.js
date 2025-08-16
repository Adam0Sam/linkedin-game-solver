import { AbstractGameSolver } from "../../common/abstract-helpers/AbstractGameSolver.js";
import { ZipGridCell } from "../ZipGridCell.js";
import { ZipGridSnapshot } from "../ZipGridSnapshot.js";
import { PathCollection } from "./PathCollection.js";
import { EdgeModifierGrid } from "../../common/EdgeModifierGrid.js";

/**
 * Utility function to print a zip game grid snapshot to the console
 * @param {ZipGridSnapshot} snapshot - The zip grid snapshot to print
 * @param {string} [title="Grid Snapshot"] - Optional title for the console output
 */
function printZipGridSnapshot(snapshot, title = "Grid Snapshot") {
  if (!snapshot || !snapshot.grid) {
    console.log(`${title}: Invalid snapshot`);
    return;
  }

  console.group(title);
  console.log(`Has Solution: ${snapshot.hasSolution()}`);

  const gridLines = [];
  for (let row = 0; row < snapshot.gridSize; row++) {
    let line = "";
    for (let col = 0; col < snapshot.gridSize; col++) {
      const cell = snapshot.grid[row][col];
      let symbol;

      if (cell.cellState === "cross") {
        symbol = "X";
      } else if (typeof cell.cellContent === "number") {
        symbol = cell.cellContent.toString();
      } else if (cell.cellContent === "wall") {
        symbol = "█";
      } else if (cell.cellContent === "blank") {
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

export class ZipGameSolver extends AbstractGameSolver {
  constructor() {
    super(ZipGridCell);
  }

  /**
   * @type {{number: ZipGridCell}}
   */
  #numberedCellDict = {};

  /**
   * @type {number}
   */
  #highestCellContentNumber = 0;

  /**
   * @type {EdgeModifierGrid}
   */
  #edgeModifierGrid;

  /**
   * @param {ZipGridSnapshot} currentGridSnapshot
   * @param {number} cellContentNumber
   * @param {Path[]} paths
   * @private
   * @return {Path[]|null}
   */
  #explorePaths(currentGridSnapshot, cellContentNumber, paths) {
    if (cellContentNumber >= this.#highestCellContentNumber) {
      return currentGridSnapshot.hasSolution() ? paths : null;
    }

    /**
     * @type {ZipGridCell}
     */
    const startCell = this.#numberedCellDict[cellContentNumber];
    /**
     * @type {ZipGridCell}
     */
    const endCell = this.#numberedCellDict[cellContentNumber + 1];
    const pathCollection = new PathCollection(
      startCell,
      endCell,
      currentGridSnapshot.grid,
      this.#edgeModifierGrid
    );

    const allPaths = pathCollection.getAllPaths();
    for (const path of allPaths) {
      const nextSnapshot = currentGridSnapshot.traversePath(path);

      const solutionPaths = this.#explorePaths(
        nextSnapshot,
        cellContentNumber + 1,
        [...paths, path]
      );

      if (solutionPaths) {
        return solutionPaths;
      }
    }

    return null;
  }

  /**
   * @param {ZipGridCell[][]} gameGrid
   * @param {EdgeModifierGrid} edgeModifierGrid
   */
  getSolvedGrid(gameGrid, edgeModifierGrid) {
    this.#edgeModifierGrid = edgeModifierGrid;

    for (const row of gameGrid) {
      for (const cell of row) {
        if (typeof cell.cellContent === "number") {
          this.#numberedCellDict[cell.cellContent] = cell;
          this.#highestCellContentNumber = Math.max(
            this.#highestCellContentNumber,
            cell.cellContent
          );
        }
      }
    }

    const initialSnapshot = new ZipGridSnapshot(gameGrid);
    const solutionSnapshot = this.#explorePaths(initialSnapshot, 1, []);
    return solutionSnapshot;
  }
}
