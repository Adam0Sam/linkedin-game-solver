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
   * @returns {string}
   */
  toString() {
    return `${this.row},${this.col}`;
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
   * @abstract
   * @param {object} object
   * @returns {AbstractGridCell}
   */
  static toValidCell(object) {
    throw new NotImplementedError("toValidCell");
  }
}
