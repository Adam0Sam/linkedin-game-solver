import { AbstractClass, NotImplementedError } from "../utils/AbstractClass.js";
import { GridCell } from "../utils/grid/GridCell.js";

/**
 * @abstract
 */
export class AbstractGridParser extends AbstractClass {
  #gridSelectorQuery;
  construcotr(gridSelectorQuery) {
    super();
    this.#gridSelectorQuery = gridSelectorQuery;
  }

  /**
   * @abstract
   * @param {HTMLElement} gridElement
   * @returns {HTMLElement[][]}
   */
  getDOMElementGrid(gridElement) {
    throw new NotImplementedError("getDOMElementGrid");
  }

  /**
   * @abstract
   * @param {HTMLElement} domElement
   * @param {number} rowIndex
   * @param {number} columnIndex
   * @returns {GridCell}
   */
  DOMElementToProcessedCell(domElement, rowIndex, columnIndex) {
    throw new NotImplementedError("DOMElementToProcessedCell");
  }

  /**
   * @param {string} htmlContent
   * @returns {GridCell[][]}
   */
  parse(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const gridElement = doc.querySelector(this.#gridSelectorQuery);
    if (!gridElement) {
      throw new Error("Grid element not found in the document.");
    }
    const processedCellGrid = this.getProcessedCellGrid(gridElement);
    return processedCellGrid;
  }

  /**
   * @param {HTMLElement} gridElement
   * @returns {GridCell[][]}
   */
  getProcessedCellGrid(gridElement) {
    const elementGrid = this.getDOMElementGrid(gridElement);
    return elementGrid.map((elements, rowIndex) =>
      elements.map((element, columnIndex) =>
        this.DOMElementToProcessedCell(element, rowIndex, columnIndex)
      )
    );
  }
}
