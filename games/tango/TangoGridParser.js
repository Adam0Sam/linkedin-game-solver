import { AbstractGridParser } from "../common/abstract-helpers/AbstractGridParser.js";
import { TangoGridCell } from "./TangoGridCell.js";

export class TangoGridParser extends AbstractGridParser {
  constructor() {
    super(".lotka-grid", ".lotka-cell-edge");
  }

  /**
   * @param {HTMLElement} domElement
   * @param {number} rowIndex
   * @param {number} columnIndex
   * @returns {TangoGridCell}
   */
  parseToGameCell(domElement, rowIndex, columnIndex) {
    const cellContentElement = domElement.querySelector(
      ".lotka-cell-content"
    ).firstElementChild;
    const cellState = cellContentElement.ariaLabel.toLocaleLowerCase();
    const isLocked =
      cellContentElement.classList.contains("lotka-cell--locked");
    return new TangoGridCell(columnIndex, rowIndex, cellState, isLocked);
  }
}
