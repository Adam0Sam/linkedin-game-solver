import { GridCell } from "../common/GridCell.js";

export class ZipGridCell extends GridCell {
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
}
