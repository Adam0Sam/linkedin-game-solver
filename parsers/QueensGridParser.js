import { QueensGridCell } from "../utils/grid/QueensGridCell.js";
import { AbstractGridParser } from "./AbstractGridParser.js";

export default class QueensGridParser extends AbstractGridParser {
  constructor() {
    super("#queens-grid");
  }

  /**
   * @param {HTMLElement} domElement
   * @param {number} rowIndex
   * @param {number} columnIndex
   * @returns {QueensGridCell}
   */
  DomElementToGameCell(domElement, rowIndex, columnIndex) {
    const color = parseInt(domElement.classList[1].split("-")[2], 10);
    return new QueensGridCell(columnIndex, rowIndex, color, "empty");
  }
}
