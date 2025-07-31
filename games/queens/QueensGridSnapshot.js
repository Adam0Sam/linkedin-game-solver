import { AbstractGridSnapshot } from "../common/abstract-helpers/AbstractGridSnapshot.js";

export class QueensGridSnapshot extends AbstractGridSnapshot {
  /**
   * @param {Map<number, ColorGroup>} colorGroupMap
   */
  hasSolution(colorGroupMap) {
    console.log("Checking solution for color groups", colorGroupMap);
    for (const colorGroup of colorGroupMap.values()) {
      let hasQueen = false;

      for (const cellId of colorGroup.cellIds) {
        const cell = this.getCellById(cellId);
        if (cell.cellState === "queen") {
          hasQueen = true;
          break;
        }
      }

      if (!hasQueen) return false;
    }

    return true;
  }

  /**
   * @param {ColorGroup} colorGroup
   */
  getEmptyCellsInGroup(colorGroup) {
    /**
     * @type {QueensGridCell[]}
     */
    const emptyCells = [];
    for (const cellId of colorGroup.cellIds) {
      const cell = this.getCellById(cellId);
      if (cell.cellState === "empty") {
        emptyCells.push(cell);
      }
    }
    return emptyCells;
  }

  /**
   * @param {QueensGridCell} cell
   * @returns {GridSnapshot}
   */
  placeQueen(cell) {
    const newSnapshot = this.clone();
    newSnapshot.setCellState(cell, "queen");

    const crossOutCell = (row, col) => {
      if (row === cell.row && col === cell.col) return;
      const targetCell = newSnapshot.getCellByCoord(row, col);

      if (
        targetCell &&
        newSnapshot.containsCell(targetCell) &&
        targetCell.cellState === "empty"
      ) {
        newSnapshot.setCellState(targetCell, "cross");
      }
    };

    // Cross out entire row and column
    for (let i = 0; i < newSnapshot.gridSize; i++) {
      crossOutCell(i, cell.col);
      crossOutCell(cell.row, i);
    }

    // Cross out only the diagonal neighbors
    const diagonals = [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];

    for (const [rowOffset, colOffset] of diagonals) {
      crossOutCell(cell.row + rowOffset, cell.col + colOffset);
    }

    return newSnapshot;
  }
}
