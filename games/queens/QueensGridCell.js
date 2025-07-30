import { AbstractGridCell } from "../common/abstract-helpers/AbstractGridCell.js";

export class QueensGridCell extends AbstractGridCell {
  /**
   * @param {number} col
   * @param {number} row
   * @param {number} color
   * @param {"queen"|"cross"|"empty"} cellState
   */
  constructor(col, row, color, cellState) {
    super(col, row);
    /**
     * @type {number}
     */
    this.color = color;
    /**
     * @type {"queen"|"cross"|"empty"}
     */
    this.cellState = cellState;
  }

  /**
   * @param {object} object
   */
  static isValidCell(object) {
    return (
      super.isValidCell(object) &&
      typeof object.color === "number" &&
      (object.cellState === "queen" ||
        object.cellState === "cross" ||
        object.cellState === "empty")
    );
  }

  static toValidCell(object) {
    if (!this.isValidCell(object)) {
      throw new Error("Invalid QueensGridCell object");
    }
    return new QueensGridCell(
      object.col,
      object.row,
      object.color,
      object.cellState
    );
  }
}
