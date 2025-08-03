import { AbstractGridSnapshot } from "../common/abstract-helpers/AbstractGridSnapshot.js";
import { Path } from "./solver/Path.js";
import { ZipGridCell } from "./ZipGridCell.js";

export class ZipGridSnapshot extends AbstractGridSnapshot {
  #traversedCellCount = 0;
  /**
   * @param {number} count
   */
  increaseTraversedCellCount(count) {
    this.#traversedCellCount += count;
  }

  /**
   * @param {Path} path
   */
  traversePath(path) {
    /**
     * @type {ZipGridSnapshot}
     */
    const newSnapshot = this.clone();
    const pathCells = path.getPathCells();
    newSnapshot.increaseTraversedCellCount(pathCells.length);
    for (const cell of pathCells) {
      newSnapshot.setCellState(cell, "cross");
    }
    return newSnapshot;
  }

  hasSolution() {
    return this.#traversedCellCount === this.gridSize * this.gridSize;
  }
}
