import { AbstractGameParser } from "./AbstractGameParser.js";
import { QueensGridCell } from "../utils/grid/QueensGridCell.js";

export class QueensGameParser extends AbstractGameParser {
  constructor() {
    super();
    /**
     * @type {HTMLElement|null}
     */
    this.gridElement = null;
  }

  /**
   * @param {Document} doc
   * @returns {HTMLElement}
   */
  getGridElement(doc) {
    if (!this.gridElement) {
      this.gridElement = doc.querySelector("#queens-grid");
    }
    return this.gridElement;
  }

  /**
   * @param {Document} doc
   * @param {Object} metadata
   * @returns {QueensGridCell[][]}
   */
  extractGameGrid(doc) {
    const queensGrid = this.getGridElement(doc);
    const computedStyle = getComputedStyle(queensGrid);
    const columns = parseInt(computedStyle.getPropertyValue("--cols"), 10);
    const rows = parseInt(computedStyle.getPropertyValue("--rows"), 10);

    const grid = Array.from({ length: rows }, () =>
      Array.from({ length: columns })
    );

    const cellElements = queensGrid.querySelectorAll("queens-cell-with-border");
    for (const cellElement of cellElements) {
      const cellIdx = cellElement.dataset.cellIdx;
      const cellRow = cellIdx % columns;
      const cellCol = Math.floor(cellIdx / columns);
      const color = cellElement.classList[1].split("-")[2];
      grid[cellRow][cellCol] = new QueensGridCell(
        cellCol,
        cellRow,
        color,
        false
      );
    }

    return grid;
  }
}
