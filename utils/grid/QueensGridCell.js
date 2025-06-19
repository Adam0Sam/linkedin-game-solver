import { GridCell } from "./GridCell.js";

export class QueensGridCell extends GridCell {
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
}
