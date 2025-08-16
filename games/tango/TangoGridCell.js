import { AbstractGridCell } from "../common/abstract-helpers/AbstractGridCell.js";

export class TangoGridCell extends AbstractGridCell {
  /**
   * @param {number} col
   * @param {number} row
   * @param {"moon"|"sun"|"empty"} cellState
   * @param {boolean} isLocked
   */
  constructor(col, row, cellState, isLocked) {
    super(col, row);

    /**
     * @type {"moon"|"sun"|"empty"}
     */
    this.cellState = cellState;

    /**
     * @type {boolean}
     */
    this.isLocked = isLocked;
  }

  static isValidCell(object) {
    return (
      AbstractGridCell.isValidCell(object) &&
      (object.cellState === "moon" ||
        object.cellState === "sun" ||
        object.cellState === "empty")
    );
  }

  static toValidCell(object) {
    if (!TangoGridCell.isValidCell(object)) {
      throw new Error("Invalid TangoGridCell object");
    }
    return new TangoGridCell(object.col, object.row, object.cellState);
  }

  static getFilledStates() {
    return ["moon", "sun"];
  }
}
