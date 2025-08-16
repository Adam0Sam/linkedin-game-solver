import { AbstractGridSnapshot } from "../common/abstract-helpers/AbstractGridSnapshot.js";

export class TangoGridSnapshot extends AbstractGridSnapshot {
  /**
   * @param {TangoGridCell[]} validRow
   * @returns {TangoGridSnapshot}
   */
  crossRow(validRow) {
    const newSnapshot = this.clone();
    for (const cell of validRow) {
      newSnapshot.setCellState(cell, cell.state);
    }
    return newSnapshot;
  }
}
