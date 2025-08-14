import { EdgeModifierGridCell } from "./EdgeModifierGridCell.js";
import { AbstractGridCell } from "./abstract-helpers/AbstractGridCell.js";

const InversedPositionMap = {
  left: "right",
  right: "left",
  top: "bottom",
  bottom: "top",
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

  /**
   * @param {AbstractGridCell} cell1
   * @param {AbstractGridCell} cell2
   */
  areCellsConnectedByModifier(cell1, cell2) {
    const position1 = this.grid[cell1.row][cell1.col]?.position;
    const position2 = this.grid[cell2.row][cell2.col]?.position;

    if (
      !position1 ||
      !position2 ||
      !AbstractGridCell.areNeighbours(cell1, cell2)
    ) {
      return false;
    }

    return InversedPositionMap[position1] === position2;
  }
}
