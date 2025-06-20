import { QueensGridCell } from "../utils/grid/QueensGridCell";

export class QueensGridParser {
  constructor() {
    super("#queens-grid");
  }

  /**
   * @param {HTMLElement} queensGrid
   * @returns {HTMLElement[][]}
   */
  getDOMElementGrid(queensGrid) {
    const inlineStyle = queensGrid.getAttribute("style");

    const rows = inlineStyle.match(/--rows:\s*(\d+)/)[1];
    const columns = inlineStyle.match(/--cols:\s*(\d+)/)[1];

    const grid = Array.from({ length: rows }, () =>
      Array.from({ length: columns })
    );

    const cellElements = queensGrid.querySelectorAll(
      ".queens-cell-with-border"
    );

    for (const cellElement of cellElements) {
      const cellIdx = cellElement.dataset.cellIdx;
      const cellCol = cellIdx % columns;
      const cellRow = Math.floor(cellIdx / columns);

      grid[cellRow][cellCol] = cellElement;
    }

    return grid;
  }

  /**
   * @param {HTMLElement} domElement
   * @param {number} rowIndex
   * @param {number} columnIndex
   * @returns {QueensGridCell}
   */
  DOMElementToProcessedCell(domElement, rowIndex, columnIndex) {
    const color = parseInt(domElement.classList[1].split("-")[2], 10);
    return new QueensGridCell(columnIndex, rowIndex, color, "empty");
  }
}
