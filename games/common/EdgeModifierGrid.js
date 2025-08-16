import { EdgeModifierGridCell } from "./EdgeModifierGridCell.js";
import { AbstractGridCell } from "./abstract-helpers/AbstractGridCell.js";

const PositionTranslationMap = {
  left: { row: 0, col: -1 },
  right: { row: 0, col: 1 },
  up: { row: -1, col: 0 },
  down: { row: 1, col: 0 },
};

export class EdgeModifierGrid {
  /**
   * @param {object{}[][]} rawEdgeModifierGrid
   */
  constructor(rawEdgeModifierGrid) {
    /**
     * @type {EdgeModifierGridCell[][]}
     */
    this.grid = rawEdgeModifierGrid.map((row) =>
      row.map((cell) =>
        cell ? new EdgeModifierGridCell(cell.position, cell.content) : null
      )
    );
  }

  #modifierPointsTo(fromCell, toCell, position) {
    if (!position || !PositionTranslationMap[position]) return false;
    return (
      fromCell.row + PositionTranslationMap[position].row === toCell.row &&
      fromCell.col + PositionTranslationMap[position].col === toCell.col
    );
  }

  /**
   * @param {AbstractGridCell} cell
   */
  getModifierContent(cell) {
    const gridCell = this.grid[cell.row][cell.col];
    return gridCell ? gridCell.content : null;
  }

  /**
   * @param {AbstractGridCell} cell1
   * @param {AbstractGridCell} cell2
   */
  areCellsConnectedByModifier(cell1, cell2) {
    if (!AbstractGridCell.areNeighbours(cell1, cell2)) {
      return false;
    }

    const position1 = this.grid[cell1.row][cell1.col]?.position;
    const position2 = this.grid[cell2.row][cell2.col]?.position;

    return (
      this.#modifierPointsTo(cell1, cell2, position1) ||
      this.#modifierPointsTo(cell2, cell1, position2)
    );
  }
}
