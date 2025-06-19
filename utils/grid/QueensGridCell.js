export class QueensGridCell extends GridCell {
  /**
   * @param {number} col
   * @param {number} row
   * @param {string} colorGroup
   * @param {boolean} isQueen
   */
  constructor(col, row, colorGroup, isQueen) {
    super(col, row);
    /**
     * @type {number}
     */
    this.colorGroup = colorGroup;
    /**
     * @type {boolean}
     */
    this.isQueen = isQueen;
  }
}
