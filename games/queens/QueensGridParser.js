import { QueensGridCell } from "./QueensGridCell.js";
import { AbstractGridParser } from "../common/abstract-helpers/AbstractGridParser.js";

export class QueensGridParser extends AbstractGridParser {
  constructor() {
    super("#queens-grid");
  }

  /**
   * @param {HTMLElement} domElement
   * @param {number} rowIndex
   * @param {number} columnIndex
   * @returns {QueensGridCell}
   */
  parseToGameCell(domElement, rowIndex, columnIndex) {
    const color = parseInt(domElement.classList[1].split("-")[2], 10);
    return new QueensGridCell(columnIndex, rowIndex, color, "empty");
  }
}
