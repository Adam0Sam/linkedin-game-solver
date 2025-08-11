import { AbstractGridSnapshot } from "../common/abstract-helpers/AbstractGridSnapshot.js";
import { Path } from "./solver/Path.js";

export class ZipGridSnapshot extends AbstractGridSnapshot {
  #traversedCellCount = 0;

  /**
   * @param {number} count
   */
  setTraversedCellCount(count) {
    this.#traversedCellCount = count;
  }

  getTraversedCellCount() {
    return this.#traversedCellCount;
  }

  /**
   * @returns {ZipGridSnapshot}
   */
  clone() {
    const cloned = super.clone();
    cloned.setTraversedCellCount(this.#traversedCellCount);
    return cloned;
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
    let newlyTraversedCount = 0;

    for (const cell of pathCells) {
      const currentCell = newSnapshot.getCellByCoord(cell.row, cell.col);
      if (currentCell && currentCell.cellState !== "cross") {
        newlyTraversedCount++;
      }
      newSnapshot.setCellState(cell, "cross");
    }

    const currentTraversedCount = this.getTraversedCellCount();
    newSnapshot.setTraversedCellCount(
      currentTraversedCount + newlyTraversedCount
    );
    return newSnapshot;
  }

  hasSolution() {
    return this.getTraversedCellCount() === this.gridSize * this.gridSize;
  }
}
