import { AbstractClass, NotImplementedError } from "./AbstractClass.js";
import { AbstractGridCell } from "./AbstractGridCell.js";

class AbstractGridSnapshot extends AbstractClass {
  /**
   * @param {AbstractGridCell[][]} grid
   */
  constructor(grid) {
    super();
    /**
     * @type {AbstractGridCell[][]}
     */
    this.grid = grid;
    /**
     * @type {number}
     */
    this.gridSize = grid.length;
  }

  /**
   * @abstract
   * @param {string} cellId
   * @returns {AbstractGridCell}
   */
  getCellById(cellId) {
    const [row, col] = cellId.split(",").map(Number);
    if (row < 0 || row >= this.gridSize || col < 0 || col >= this.gridSize) {
      throw new Error(`Invalid cellId: ${cellId}`);
    }
    return this.grid[row][col];
  }

  /**
   * @returns {AbstractGridSnapshot}
   */
  clone() {
    return new GridSnapshot(structuredClone(this.grid));
  }

  /**
   * @param {AbstractGridCell} cell
   * @param {string} state
   */
  setCellState(cell, state) {
    this.grid[cell.row][cell.col].cellState = state;
  }

  /**
   * @abstract
   * @returns {boolean}
   */
  hasSolution() {
    throw new NotImplementedError("hasSolution");
  }
}
