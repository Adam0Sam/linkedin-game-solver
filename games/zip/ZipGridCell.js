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
   * @param {ZipGridCell} cell
   */
  static isTraversable(cell) {
    return cell.cellContent === "blank" && cell.cellState === "empty";
  }

  /**
   * @param {ZipGridCell} cellA
   * @param {ZipGridCell} cellB
   */
  static areNeighbours(cellA, cellB) {
    return (
      (cellA.col === cellB.col && Math.abs(cellA.row - cellB.row) === 1) ||
      (cellA.row === cellB.row && Math.abs(cellA.col - cellB.col) === 1)
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
