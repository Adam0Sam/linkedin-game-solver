import { AbstractClass, NotImplementedError } from "../utils/AbstractClass";

export class AbstractGameSolver extends AbstractClass {
  constructor() {
    super();
    /**
     * @type {GridCell[]}
     */
    this.gridClicks = [];
  }
  /**
   * @abstract
   * @param {GridCell} cell
   * @returns {boolean}
   */
  isInstanceOfGameSpecificCell(cell) {
    throw new NotImplementedError("isInstanceOfGameSpecificCell");
  }

  /**
   * @param {GridCell[][]} gameGrid
   * @returns {boolean}
   */
  isGameGridValid(gameGrid) {
    if (!Array.isArray(gameGrid) || gameGrid.length === 0) {
      return false;
    }

    return gameGrid.every((row) => {
      if (!Array.isArray(row) || row.length === 0) {
        return false;
      }
      return row.every((cell) => this.isInstanceOfGameSpecificCell(cell));
    });
  }

  /**
   * @abstract
   * @param {GridCell[][]} grid
   * @returns {GridCell[][]}
   */
  getGridClicks(grid) {
    throw new NotImplementedError("getClickPlacements");
  }
  /**
   * @param {GridCell[][]} grid
   * @returns {GridCell[][]}
   */
  solve(grid) {
    if (!this.isGameGridValid(grid)) {
      throw new Error("Invalid game grid provided.");
    }

    return this.getGridClicks(grid);
  }
}
