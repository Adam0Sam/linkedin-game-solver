import { AbstractGameSolver } from "../../common/abstract-helpers/AbstractGameSolver.js";
import { ZipGridCell } from "../ZipGridCell.js";
import { ZipGridSnapshot } from "../ZipGridSnapshot.js";
import { PathCollection } from "./PathCollection.js";

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
   * @param {ZipGridSnapshot} currentGridSnapshot
   * @param {number} cellContentNumber
   * @private
   * @return {ZipGridSnapshot|null}
   */
  #explorePaths(currentGridSnapshot, cellContentNumber) {
    if (cellContentNumber >= this.#highestCellContentNumber) {
      return currentGridSnapshot.hasSolution() ? currentGridSnapshot : null;
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
      currentGridSnapshot.grid
    );

    const allPaths = pathCollection.getAllPaths();
    for (const path of allPaths) {
      const nextSnapshot = currentGridSnapshot.traversePath(path);
      const solutionSnapshot = this.#explorePaths(
        nextSnapshot,
        cellContentNumber + 1
      );

      if (solutionSnapshot) {
        return solutionSnapshot;
      }
    }

    return null;
  }

  /**
   * @param {ZipGridCell[][]} grid
   */
  getSolvedGrid(grid) {
    for (const row of grid) {
      for (const cell of row) {
        if (typeof cell.cellContent === "number") {
          console.log("Found numbered cell:", cell);
          this.#numberedCellDict[cell.cellContent] = cell;
          this.#highestCellContentNumber = Math.max(
            this.#highestCellContentNumber,
            cell.cellContent
          );
        }
      }
    }

    const initialSnapshot = new ZipGridSnapshot(grid);
    const solutionSnapshot = this.#explorePaths(initialSnapshot, 1);
    return solutionSnapshot;
  }
}
