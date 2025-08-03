import { AbstractGridSnapshot } from "../common/abstract-helpers/AbstractGridSnapshot.js";
import { Path } from "./solver/Path.js";

export class ZipGridSnapshot extends AbstractGridSnapshot {
  /**
   * @param {Path} path
   */
  traversePath(path) {
    const newSnapshot = this.clone();
    for (const cell of path.getPathCells()) {
      newSnapshot.setCellState(cell, "cross");
    }
    return newSnapshot;
  }

  hasSolution() {}
}
