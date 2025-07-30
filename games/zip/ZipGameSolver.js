import { AbstractGameSolver } from "../common/abstract-helpers/AbstractGameSolver.js";
import { ZipGridCell } from "./ZipGridCell.js";

class Path {
  /**
   * @param {ZipGridCell} startCell
   * @param {ZipGridCell} endCell
   */
  constructor(startCell, endCell) {
    /**
     * @type {ZipGridCell}
     */
    this.startCell = startCell;

    /**
     * @type {ZipGridCell}
     */
    this.endCell = endCell;

    /**
     * @type {Array<ZipGridCell>}
     */
    this.interCells = [];
  }

  /**
   * @param {ZipGridCell} cell
   */
  appendInterCell(cell) {
    this.interCells.push(cell);
  }

  popInterCell() {
    return this.interCells.pop();
  }

  /**
   * @returns {Array<ZipGridCell>}
   */
  getPathCells() {
    return [this.startCell, ...this.interCells, this.endCell];
  }

  getPathId() {
    return this.getPathCells()
      .map((cell) => cell.toString())
      .join("-");
  }
}

class PathCollection {
  /**
   * @param {ZipGridCell} startCell
   * @param {ZipGridCell} endCell
   * @param {ZipGridCell[][]} grid
   */
  constructor(startCell, endCell, grid) {
    /**
     * @type {ZipGridCell}
     */
    this.startCell = startCell;
    /**
     * @type {ZipGridCell}
     */
    this.endCell = endCell;

    /**
     * @type {ZipGridCell[][]}
     */
    this.grid = grid;

    /**
     * @type {Array<Path> | null}
     */
    this.paths = null;
  }

  #findNextTraversableCells(currentCell) {
    /**
     * @type {Array<ZipGridCell>}
     */
    const traversableCells = [];
    const directions = [
      { row: -1, col: 0 }, // Up
      { row: 1, col: 0 }, // Down
      { row: 0, col: -1 }, // Left
      { row: 0, col: 1 }, // Right
    ];
    for (const { row, col } of directions) {
      const newRow = currentCell.row + row;
      const newCol = currentCell.col + col;
      const nextCell = this.grid[newRow]?.[newCol];
      if (nextCell && nextCell.isTraversable()) {
        traversableCells.push(nextCell);
      }
    }
    return traversableCells;
  }

  /**
   * @returns {Array<Path>}
   * @private
   */
  #findAllPaths() {
    const cellStack = [this.startCell];

    let currentPath = new Path(this.startCell, this.endCell);
    let visitedCellIds = new Set([this.startCell.toString()]);
    // const path

    while (cellStack.length > 0) {
      const currentCell = cellStack.pop();
    }
  }

  getAllPaths() {
    if (!this.paths) {
      this.paths = this.#findAllPaths();
    }
    return this.paths;
  }
}

export class ZipGameSolver extends AbstractGameSolver {
  constructor(grid) {
    super(grid);
  }

  getSolvedGrid() {}
}
