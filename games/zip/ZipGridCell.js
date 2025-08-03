import { AbstractGridCell } from "../common/abstract-helpers/AbstractGridCell.js";

export class ZipGridCell extends AbstractGridCell {
  /**
   * @param {number} col
   * @param {number} row
   * @param {"blank"|"wall"|number} cellContent
   * @param {"empty"|"cross"} cellState
   */
  constructor(col, row, cellContent, cellState) {
    super(col, row);

    /**
     * @type {"blank"|"wall"|number}
     */
    this.cellContent = cellContent;

    /**
     * @type {"empty"|"cross"}
     */
    this.cellState = cellState;
  }

  /**
   * @returns {boolean}
   */
  isTraversable() {
    return this.cellContent === "blank" && this.cellState === "empty";
  }

  /**
   * @param {ZipGridCell} cell
   */
  isNeighborOf(cell) {
    return (
      (this.col === cell.col && Math.abs(this.row - cell.row) === 1) ||
      (this.row === cell.row && Math.abs(this.col - cell.col) === 1)
    );
  }

  /**
   * @param {object} object
   */
  static isValidCell(object) {
    const isValid =
      AbstractGridCell.isValidCell(object) &&
      (object.cellContent === "blank" ||
        object.cellContent === "wall" ||
        typeof object.cellContent === "number") &&
      (object.cellState === "empty" || object.cellState === "cross");

    if (!isValid) {
      console.warn("Invalid ZipGridCell object:", object);
    }

    return isValid;
  }

  static toValidCell(object) {
    if (!ZipGridCell.isValidCell(object)) {
      throw new Error("Invalid ZipGridCell object");
    }
    return new ZipGridCell(
      object.col,
      object.row,
      object.cellContent,
      object.cellState
    );
  }
}
