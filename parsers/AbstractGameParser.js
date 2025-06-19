import { AbstractClass, NotImplementedError } from "../utils/AbstractClass.js";
import { GridCell } from "../utils/grid/GridCell.js";

/**
 * @abstract
 */
export class AbstractGameParser extends AbstractClass {
  /**
   * @param {string} htmlContent
   * @returns {{
   *  type: string,
   *  grid: GridCell[][]
   * }}
   */
  extractGameGridFromHtml(htmlContent) {
    const doc = this.#parseHtmlToDocument(htmlContent);
    const grid = this.extractGameGrid(doc);

    return grid;
  }

  /**
   * @abstract
   * @param {Document} doc
   * @throws {Error}
   */
  validateDocument(doc) {
    if (!this.getGridElement(doc)) {
      throw new Error("Game grid not found in the HTML content.");
    }
  }

  /**
   * @abstract
   * @param {Document} doc
   * @returns {GridCell[]}
   */
  extractGameGrid(doc) {
    throw new NotImplementedError("extractGameData");
  }

  /**
   * @abstract
   * @param {Document} doc
   * @returns {HTMLElement}
   */
  getGridElement(doc) {
    throw new NotImplementedError("getGridElement");
  }

  /**
   * @private
   * @param {string} htmlContent
   * @returns {Document}
   * @throws {Error}
   */
  #parseHtmlToDocument(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    this.validateDocument(doc);
    return doc;
  }
}
