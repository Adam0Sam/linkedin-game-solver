import { AbstractGameParser } from "./AbstractGameParser.js";
import { GridCell } from "../utils/GridCell.js";

export class QueensGameParser extends AbstractGameParser {
  constructor() {
    super("queens");
  }

  /**
   * @param {Document} doc
   * @throws {Error}
   */
  validateDocument(doc) {
    const queensGrid = doc.querySelector("#queens-grid");
    if (!queensGrid) {
      throw new Error("Queens grid not found in the HTML content.");
    }
  }

  /**
   * Extracts Queens game metadata
   * @param {Document} doc - Parsed HTML document
   * @returns {object} - Game metadata including grid dimensions
   */

  extractGameMetadata(doc) {
    const queensGrid = doc.querySelector("#queens-grid");
    const computedStyle = getComputedStyle(queensGrid);

    const columns = parseInt(computedStyle.getPropertyValue("--cols"), 10);
    const rows = parseInt(computedStyle.getPropertyValue("--rows"), 10);

    return { columns, rows };
  }

  /**
   * Extracts the current state of the Queens game
   * @param {Document} doc - Parsed HTML document
   * @param {object} metadata - Game metadata including dimensions
   * @returns {object} - Current game state including grid cells
   */
  extractGameState(doc, metadata) {
    const { columns, rows } = metadata;
    const gridCells = [];
    const queensGrid = doc.querySelector("#queens-grid");

    // Extract cell data from the grid
    const cellElements = queensGrid.querySelectorAll(".cell");
    for (const cellElement of cellElements) {
      const col = parseInt(cellElement.dataset.col, 10);
      const row = parseInt(cellElement.dataset.row, 10);
      const color = cellElement.dataset.color;
      const isQueen = cellElement.classList.contains("queen");

      gridCells.push(new GridCell(col, row, color, isQueen));
    }

    return { gridCells };
  }
}
