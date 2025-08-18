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
    const cellElement = domElement.querySelector(".lotka-cell-content");
    const isLocked = cellElement.classList.contains(
      "lotka-cell-content--locked"
    );

    const cellContentElement = cellElement.firstElementChild;
    const cellState = cellContentElement.ariaLabel.toLocaleLowerCase();

    return new TangoGridCell(columnIndex, rowIndex, cellState, isLocked);
  }
}
