import { AbstractClass, NotImplementedError } from "../utils/AbstractClass.js";
import { GridCell } from "../utils/grid/GridCell.js";

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
   * @returns {Document}
   */
  toDoc(htmlContent) {
    const parser = new DOMParser();
    return parser.parseFromString(htmlContent, "text/html");
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
   * @param {Document} doc
   * @returns {GridCell[][]}
   */
  parseToCells(doc) {
    const gridElement = this.#getGridElement(doc);
    const elementGrid = this.getDOMElementGrid(gridElement);
    return elementGrid.map((elements, rowIndex) =>
      elements.map((element, columnIndex) =>
        this.DOMElementToProcessedCell(element, rowIndex, columnIndex)
      )
    );
  }

  /**
   * @param {Document} doc
   * @returns {HTMLElement[][]}
   */
  parseToDomElements(doc) {
    const gridElement = this.#getGridElement(doc);
    return this.getDOMElementGrid(gridElement);
  }
}
