import { AbstractClass, NotImplementedError } from "../utils/AbstractClass.js";

export class AbstractGameSolver extends AbstractClass {
  /**
   * @abstract
   * @param {GridCell} cell
   * @returns {object}
   * @throws {NotImplementedError}
   */
  toGameCell(cell) {
    throw new NotImplementedError("toGameCell");
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
      return row.every((cell) => this.toGameCell(cell));
    });
  }

  /**
   * @abstract
   * @param {GridCell[][]} grid
   * @returns {GridCell[][]}
   */
  getSolvedGrid(grid) {
    throw new NotImplementedError("getClickPlacements");
  }
  /**
   * @param {GridCell[][]} grid
   * @returns {GridCell[][]}
   */
  solve(grid) {
    const parsedGrid = grid.map((row) =>
      row.map((cell) => this.toGameCell(cell))
    );

    return this.getSolvedGrid(parsedGrid);
  }
}
