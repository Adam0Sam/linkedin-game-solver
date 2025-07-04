export class GridCell {
  /**
   * @param {number} col
   * @param {number} row
   */
  constructor(col, row) {
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
}
