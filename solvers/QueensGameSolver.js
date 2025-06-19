import { AbstractGameSolver } from "./AbstractGameSolver.js";
import { QueensGridCell } from "../utils/grid/QueensGridCell.js";

class ColorGroup {
  constructor(color) {
    /**
     * @type {number}
     */
    this.color = color;
    /**
     * @type {QueensGridCell[]}
     */
    this.cells = [];
  }

  /**
   * @param {QueensGridCell} cell
   */
  appendCell(cell) {
    this.cells.push(cell);
  }

  /**
   * @returns {number}
   */
  getSize() {
    return this.cells.length;
  }

  /**
   * @param {boolean} isEmpty
   * @param {Set<string>} visitedSet
   * @returns {QueensGridCell|null}
   */
  getFirstCell(isEmpty, visitedSet) {
    for (const cell of this.cells) {
      let meetsConditions = true;
      if (isEmpty && cell.cellState !== "empty") meetsConditions = false;
      if (visitedSet.has(cell.toString())) meetsConditions = false;
      if (meetsConditions) return cell;
    }
    return null;
  }

  #containsCell(targetCell) {
    return this.cells.some((cell) => cell.toString() === targetCell.toString());
  }

  /**
   * @param {QueensGridCell} cell
   */
  placeQueen(cell) {
    if (!this.#containsCell(cell)) {
      throw new Error(
        `Cell ${cell.toString()} is not part of this color group.`
      );
    }
    cell.cellState = "queen";
  }

  /**
   * @param {QueensGridCell} cell
   */
  removeQueen(cell) {
    if (!this.#containsCell(cell)) {
      throw new Error(
        `Cell ${cell.toString()} is not part of this color group.`
      );
    }
    cell.cellState = "empty";
  }

  /**
   * @param {Set<string>} visitedSet
   * @returns {boolean}
   */
  containsUnvisitedCells(visitedSet) {
    return this.cells.some(
      (cell) => cell.cellState === "empty" && !visitedSet.has(cell.toString())
    );
  }

  /**
   * @returns {boolean}
   */
  containsEmptyCells() {
    return this.cells.some((cell) => cell.cellState === "empty");
  }

  /**
   * @returns {boolean}
   */
  containsQueen() {
    return this.cells.some((cell) => cell.cellState === "queen");
  }
}

export default class QueensGameSolver extends AbstractGameSolver {
  constructor() {
    super();
    /**
     * @type {ColorGroup[]}
     */
    this.sortedColorGroups = [];
  }

  /**
   * @param {QueensGridCell} cell
   * @returns {boolean}
   */
  isInstanceOfGameSpecificCell(cell) {
    return cell instanceof QueensGridCell;
  }

  /**
   * @param {QueensGridCell[][]} grid
   * @returns {ColorGroup[]}
   */
  #getSortedColorGroups(grid) {
    /**
     * @type {Map<number, ColorGroup>}
     */
    const colorGroupMap = new Map();

    for (const row of grid) {
      for (const cell of row) {
        if (!colorGroupMap.has(cell.color)) {
          colorGroupMap.set(cell.color, new ColorGroup(cell.color));
        }
        colorGroupMap.get(cell.color).appendCell(cell);
      }
    }

    return Array.from(colorGroupMap.values()).sort(
      (a, b) => b.getSize() - a.getSize()
    );
  }

  /**
   * @private
   * @param {QueensGridCell} cell
   * @param {QueensGridCell[][]} gridSnapshot
   * @returns {QueensGridCell[][]}
   */
  #getCrossedOutSnapshot(cell, gridSnapshot) {
    const newSnapshot = structuredClone(gridSnapshot);
    const maxRow = gridSnapshot.length;
    const maxCol = gridSnapshot[0].length;
    const maxDistance = Math.max(maxRow, maxCol);

    // Mark entire row and column
    for (let i = 0; i < maxRow; i++) {
      if (i !== cell.row) markCell(i, cell.col);
    }
    for (let j = 0; j < maxCol; j++) {
      if (j !== cell.col) markCell(cell.row, j);
    }

    // Mark full diagonals
    for (let step = 1; step <= maxDistance; step++) {
      // Top-left to bottom-right
      markCell(cell.row - step, cell.col - step);
      markCell(cell.row + step, cell.col + step);

      // Top-right to bottom-left
      markCell(cell.row - step, cell.col + step);
      markCell(cell.row + step, cell.col - step);
    }

    function markCell(row, col) {
      if (
        row >= 0 &&
        row < newSnapshot.length &&
        col >= 0 &&
        col < newSnapshot[0].length
      ) {
        newSnapshot[row][col].cellState = "cross";
      }
    }

    return newSnapshot;
  }

  /**
   * @private
   * @returns {boolean}
   */
  #hasFoundSolution() {
    return this.sortedColorGroups.every((group) => group.containsQueen());
  }

  /**
   * @param {number} colourGroupIndex
   * @param {QueensGridCell[][]} gridSnapshot
   * @returns {QueensGridCell[][]|null}
   */
  visitColorGroup(colourGroupIndex, gridSnapshot) {
    const colorGroup = this.sortedColorGroups[colourGroupIndex];
    const visitedCells = new Set();

    if (!colorGroup.containsEmptyCells()) {
      return null;
    }

    while (colorGroup.containsUnvisitedCells(visitedCells)) {
      const cell = colorGroup.getFirstCell(true, visitedCells);
      if (!cell) break;

      visitedCells.add(cell.toString());
      colorGroup.placeQueen(cell);
      const newGridSnapshot = this.#getCrossedOutSnapshot(cell, gridSnapshot);

      if (colourGroupIndex >= this.sortedColorGroups.length - 1) {
        if (this.#hasFoundSolution()) {
          return newGridSnapshot;
        }
      } else {
        const solutionSnapshot = this.visitColorGroup(
          colourGroupIndex + 1,
          newGridSnapshot
        );
        if (solutionSnapshot) {
          return solutionSnapshot;
        }
      }

      colorGroup.removeQueen(cell);
    }

    return null;
  }

  /**
   * @param {QueensGridCell[][]} gameGrid
   * @returns {QueensGridCell[][]}
   */
  getSolvedGrid(grid) {
    this.sortedColorGroups = this.#getSortedColorGroups(grid);
    return this.visitColorGroup(0, grid);
  }
}
