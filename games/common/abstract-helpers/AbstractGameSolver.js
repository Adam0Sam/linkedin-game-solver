import { EdgeModifierGrid } from "../EdgeModifierGrid.js";
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
   * @param {AbstractGridCell[][]} gameGrid
   * @param {EdgeModifierGrid|null} edgeModifierGrid
   * @returns {AbstractGridCell[][]}
   */
  getSolvedGrid(gameGrid, edgeModifierGrid) {
    throw new NotImplementedError("getSolvedGrid");
  }

  /**
   * @param {AbstractGridCell[][]} gameGrid
   * @param {object[][]|null} rawEdgeModifierGrid
   * @returns {AbstractGridCell[][]}
   */
  solve(gameGrid, rawEdgeModifierGrid) {
    const parsedGrid = gameGrid.map((row) =>
      row.map((cell) => this.cellClass.toValidCell(cell))
    );

    const parsedEdgeModifierGrid = rawEdgeModifierGrid
      ? new EdgeModifierGrid(rawEdgeModifierGrid)
      : null;

    return this.getSolvedGrid(parsedGrid, parsedEdgeModifierGrid);
  }
}
