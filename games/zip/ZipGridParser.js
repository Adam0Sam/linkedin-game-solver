import { AbstractGridParser } from "../common/abstract-helpers/AbstractGridParser.js";
import { ZipGridCell } from "./ZipGridCell.js";

export class ZipGridParser extends AbstractGridParser {
  constructor() {
    super(".trail-grid", ".trail-cell-wall");
  }

  /**
   * @param {HTMLElement} domElement
   * @param {number} rowIndex
   * @param {number} columnIndex
   * @returns {ZipGridCell}
   */
  parseToGameCell(domElement, rowIndex, columnIndex) {
    const cellContentElement = domElement.querySelector(".trail-cell-content");
    if (!cellContentElement) {
      return new ZipGridCell(columnIndex, rowIndex, "blank", "empty");
    }
    const cellContent = parseInt(cellContentElement.textContent.trim(), 10);
    return new ZipGridCell(columnIndex, rowIndex, cellContent, "empty");
  }
}
