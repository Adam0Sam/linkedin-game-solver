import { AbstractClass, NotImplementedError } from "./AbstractClass.js";
import { AbstractGridCell } from "./AbstractGridCell.js";

export class AbstractGridSnapshot extends AbstractClass {
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
   * @param {number} row
   * @param {number} col
   */
  getCellByCoord(row, col) {
    if (row < 0 || row >= this.gridSize || col < 0 || col >= this.gridSize) {
      return null;
    }
    return this.grid[row][col];
  }

  /**
   * @param {string} cellId
   */
  getCellById(cellId) {
    const [row, col] = cellId.split(",").map(Number);
    return this.getCellByCoord(row, col);
  }

  /**
   * @returns {AbstractGridSnapshot}
   */
  clone() {
    return new this.constructor(structuredClone(this.grid));
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

  /**
   * @param {AbstractGridCell} cell
   */
  containsCell(cell) {
    return (
      cell.row >= 0 &&
      cell.row < this.gridSize &&
      cell.col >= 0 &&
      cell.col < this.gridSize
    );
  }
}
