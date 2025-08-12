import { AbstractGridCell } from "../common/abstract-helpers/AbstractGridCell.js";

export class TangoGridCell extends AbstractGridCell {
  /**
   * @param {number} col
   * @param {number} row
   * @param {"moon"|"sun"|"empty"|"cross"}
   */
  constructor(col, row, cellState) {
    super(col, row);

    /**
     * @param {"moon"|"sun"|"empty"|"cross"}
     */
    this.cellState = cellState;
  }

  static isValidCell(object) {
    return (
      AbstractGridCell.isValidCell(object) &&
      (object.cellState === "moon" ||
        object.cellState === "sun" ||
        object.cellState === "cross" ||
        object.cellState === "empty")
    );
  }

  static toValidCell(object) {
    if (!TangoGridCell.isValidCell(object)) {
      throw new Error("Invalid TangoGridCell object");
    }
    return new TangoGridCell(object.col, object.row, object.cellState);
  }
}
