import { AbstractClass, NotImplementedError } from "./AbstractClass.js";
import { GridCell } from "../GridCell.js";

/**
 * @abstract
 */
export class AbstractGridParser extends AbstractClass {
  #gridSelectorQuery;
  constructor(gridSelectorQuery) {
    super();
    this.#gridSelectorQuery = gridSelectorQuery;
  }

  /**
   * @abstract
   * @param {HTMLElement} domElement
   * @param {number} rowIndex
   * @param {number} columnIndex
   * @returns {GridCell}
   */
  parseToGameCell(domElement, rowIndex, columnIndex) {
    throw new NotImplementedError("DOMElementToProcessedCell");
  }

  /**
   * @param {Document} doc
   * @returns {HTMLElement}
   * @throws {Error} If the grid element is not found in the document.
   */
  #getGridElement(doc) {
    const gridElement = doc.querySelector(this.#gridSelectorQuery);
    if (!gridElement) {
      throw new Error("Grid element not found in the document.");
    }
    return gridElement;
  }

  /**
   * @param {HTMLElement} gridElement
   * @returns {{ rows: number, columns: number }}
   */
  extractGridDimensions(gridElement) {
    const inlineStyle = gridElement.getAttribute("style");
    const rows = parseInt(inlineStyle.match(/--rows:\s*(\d+)/)[1], 10);
    const columns = parseInt(inlineStyle.match(/--cols:\s*(\d+)/)[1], 10);
    return { rows, columns };
  }

  /**
   * @param {HTMLElement} cellElement
   * @param {number} columns
   * @returns {{ row: number, column: number }}
   */
  extractCellPosition(cellElement, columns) {
    const cellIdx = parseInt(cellElement.dataset.cellIdx, 10);
    const column = cellIdx % columns;
    const row = Math.floor(cellIdx / columns);
    return { row, column };
  }

  /**
   * @param {Document} doc
   * @returns {GridCell[][]}
   */
  parseparseToGameCellGrid(doc) {
    const domElementGrid = this.parseToDomElementGrid(doc);

    return domElementGrid.map((elements, rowIndex) =>
      elements.map((element, columnIndex) =>
        this.parseToGameCell(element, rowIndex, columnIndex)
      )
    );
  }

  /**
   * @param {Document} doc
   * @returns {HTMLElement[][]}
   */
  parseToDomElementGrid(doc) {
    const gridElement = this.#getGridElement(doc);

    const { rows, columns } = this.extractGridDimensions(gridElement);

    const grid = Array.from({ length: rows }, () =>
      Array.from({ length: columns })
    );

    const cellElements = gridElement.querySelectorAll("[data-cell-idx]");

    for (const cellElement of cellElements) {
      const { row, column } = this.extractCellPosition(cellElement, columns);
      grid[row][column] = cellElement;
    }

    return grid;
  }
}
