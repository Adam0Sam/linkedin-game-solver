import { AbstractGameSolver } from "../../common/abstract-helpers/AbstractGameSolver.js";
import { TangoGridCell } from "../TangoGridCell.js";
import { EdgeModifierGrid } from "../../common/EdgeModifierGrid.js";
import { TangoGridSnapshot } from "../TangoGridSnapshot.js";
import { TangoRowCollection } from "./TangoRowCollection.js";

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
    console.log("Row index:", rowIndex, "All valid rows:", allValidRows);

    for (const validRow of allValidRows) {
      const nextSnapshot = currentSnapshot.crossRow(validRow);
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
    const initialSnapshot = new TangoGridSnapshot(gameGrid);
    const solutionSnapshot = this.#exploreRows(initialSnapshot, 0);
    return solutionSnapshot;
  }
}
