import { AbstractClass, NotImplementedError } from "./AbstractClass.js";
import { AbstractGridCell } from "./AbstractGridCell.js";

/**
 * @abstract
 */
export class AbstractGridParser extends AbstractClass {
  #gridSelectorQuery;
  #edgeModifierSelectorQuery;
  /**
   * @param {string} gridSelectorQuery
   * @param {string} edgeModifierSelectorQuery
   */
  constructor(gridSelectorQuery, edgeModifierSelectorQuery = null) {
    super();
    this.#gridSelectorQuery = gridSelectorQuery;
    this.#edgeModifierSelectorQuery = edgeModifierSelectorQuery;
  }

  /**
   * @abstract
   * @param {HTMLElement} domElement
   * @param {number} rowIndex
   * @param {number} columnIndex
   * @returns {AbstractGridCell}
   */
  parseToGameCell(domElement, rowIndex, columnIndex) {
    throw new NotImplementedError("parseToGameCell");
  }

  /**
   * @abstract
   * @param {HTMLElement} domElement
   * @returns {string|null}
   */
  extractEdgeModifierContent(domElement) {
    return null; // Default implementation, can be overridden
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

  gridContainsEdgeModifiers() {
    return this.#edgeModifierSelectorQuery !== null;
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
   * @returns {AbstractGridCell[][]}
   */
  parseToGameCellGrid(doc) {
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

  parseToEdgeModifierGrid(doc) {
    if (!this.#edgeModifierSelectorQuery) {
      console.log("No edge modifier selector query defined.");
      return null;
    }
    const gridElement = this.#getGridElement(doc);
    const { rows, columns } = this.extractGridDimensions(gridElement);

    const grid = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => null)
    );

    const edgeModifierElements = gridElement.querySelectorAll(
      this.#edgeModifierSelectorQuery
    );

    const edgeModifierClassName = this.#edgeModifierSelectorQuery.replace(
      ".",
      ""
    );

    for (const edgeModifierElement of edgeModifierElements) {
      const { row, column } = this.extractCellPosition(
        edgeModifierElement.parentElement,
        columns
      );
      const edgeModifierMatch = edgeModifierElement.className.match(
        new RegExp(`${edgeModifierClassName}--(\\w+)`)
      );

      if (!edgeModifierMatch) {
        throw new Error(
          "Edge modifier class name does not match expected format."
        );
      }
      const edgeModifierPosition = edgeModifierMatch[1];

      grid[row][column] = {
        position: edgeModifierPosition,
        content: this.extractEdgeModifierContent(edgeModifierElement),
      };
    }

    return grid;
  }
}
