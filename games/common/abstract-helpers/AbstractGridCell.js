import { AbstractClass, NotImplementedError } from "./AbstractClass.js";

export class AbstractGridCell extends AbstractClass {
  /**
   * @param {number} col
   * @param {number} row
   */
  constructor(col, row) {
    super();

    /**
     * @type {number}
     */
    this.col = col;

    /**
     * @type {number}
     */
    this.row = row;
  }

  /**
   * @param {AbstractGridCell} cell
   * @returns {string}
   */
  static toString(cell) {
    return `${cell.row},${cell.col}`;
  }

  /**
   * @param {object} object
   * @returns {boolean}
   */
  static isValidCell(object) {
    return (
      object &&
      typeof object.col === "number" &&
      typeof object.row === "number" &&
      object.col >= 0 &&
      object.row >= 0
    );
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
   * @abstract
   * @param {object} object
   * @returns {AbstractGridCell}
   */
  static toValidCell(object) {
    throw new NotImplementedError("toValidCell");
  }
}
