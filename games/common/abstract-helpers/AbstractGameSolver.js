import { AbstractClass, NotImplementedError } from "./AbstractClass.js";

export class AbstractGameSolver extends AbstractClass {
  /**
   * @param {Class} cellClass
   */
  constructor(cellClass) {
    super();
    this.cellClass = cellClass;
  }

  /**
   * @param {AbstractGridCell[][]} gameGrid
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
      return row.every((cell) => this.cellClass.isValidCell(cell));
    });
  }

  /**
   * @abstract
   * @param {AbstractGridCell[][]} grid
   * @returns {AbstractGridCell[][]}
   */
  getSolvedGrid(grid) {
    throw new NotImplementedError("getSolvedGrid");
  }

  /**
   * @param {AbstractGridCell[][]} grid
   * @returns {AbstractGridCell[][]}
   */
  solve(grid) {
    const parsedGrid = grid.map((row) =>
      row.map((cell) => this.cellClass.toValidCell(cell))
    );

    return this.getSolvedGrid(parsedGrid);
  }
}
