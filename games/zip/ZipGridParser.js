import { AbstractGridParser } from "../common/abstract-helpers/AbstractGridParser.js";
import { ZipGridCell } from "./ZipGridCell.js";

export class ZipGridParser extends AbstractGridParser {
  constructor() {
    super(".trail-grid");
  }

  /**
   * @param {HTMLElement} domElement
   * @param {number} rowIndex
   * @param {number} columnIndex
   * @returns {ZipGridCell}
   */
  parseToGameCell(domElement, rowIndex, columnIndex) {
    const cellHasContent = domElement.children.length > 1;
    if (!cellHasContent) {
      return new ZipGridCell(columnIndex, rowIndex, "blank", "empty");
    }
    const cellContent = parseInt(domElement.children[1].textContent.trim(), 10);
    return new ZipGridCell(columnIndex, rowIndex, cellContent, "empty");
  }
}
