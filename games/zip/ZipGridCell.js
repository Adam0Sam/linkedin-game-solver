import { GridCell } from "../common/GridCell";

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
}
