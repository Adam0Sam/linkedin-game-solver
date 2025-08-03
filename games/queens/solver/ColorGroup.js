import { QueensGridCell } from "../QueensGridCell.js";

export class ColorGroup {
  constructor(color) {
    /**
     * @type {number}
     */
    this.color = color;

    /**
     * @type {Set<string>}
     */
    this.cellIds = new Set();
  }

  /**
   * @param {QueensGridCell} cell
   */
  appendCell(cell) {
    if (!(cell instanceof QueensGridCell)) {
      cell = new QueensGridCell(cell.col, cell.row, this.color, cell.cellState);
    }
    this.cellIds.add(cell.toString());
  }

  /**
   * @returns {number}
   */
  getSize() {
    return this.cellIds.size;
  }
}
