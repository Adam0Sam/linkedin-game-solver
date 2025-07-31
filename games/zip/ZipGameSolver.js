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

  getPathCells() {
    return [this.startCell, ...this.interCells, this.endCell];
  }

  clone() {
    const clonedPath = new Path(this.startCell, this.endCell);
    clonedPath.interCells = [...this.interCells];
    return clonedPath;
  }

  getLength() {
    return this.getPathCells().length;
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

  /**
   * @param {ZipGridCell} currentCell
   * @private
   */
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

      if (
        newRow >= 0 &&
        newRow < this.grid.length &&
        newCol >= 0 &&
        newCol < this.grid[0].length
      ) {
        const nextCell = this.grid[newRow][newCol];
        if (nextCell && nextCell.isTraversable()) {
          traversableCells.push(nextCell);
        }
      }
    }

    console.log(
      `Current Cell: ${currentCell}, Traversable Cells: ${traversableCells
        .map((cell) => cell.toString())
        .join(", ")}`
    );
    return traversableCells;
  }

  /**
   * @private
   */
  #findAllPaths() {
    /**
     * @type {Array<Path>}
     */
    const allPaths = [];

    /**
     * @type {Set<string>}
     */
    const visited = new Set();

    /**
     * @param {ZipGridCell} currentCell
     * @param {Path} currentPath
     */
    const dfs = (currentCell, currentPath) => {
      const nextCells = this.#findNextTraversableCells(currentCell);

      for (const nextCell of nextCells) {
        const cellId = nextCell.toString();

        if (visited.has(cellId)) {
          continue;
        }

        visited.add(cellId);

        if (nextCell.isNeighborOf(this.endCell)) {
          currentPath.appendInterCell(nextCell);
          allPaths.push(currentPath.clone());
        } else {
          currentPath.appendInterCell(nextCell);
          dfs(nextCell, currentPath);
          currentPath.popInterCell();
        }

        visited.delete(cellId);
      }
    };

    visited.add(this.startCell.toString());
    const initialPath = new Path(this.startCell, this.endCell);
    dfs(this.startCell, initialPath);

    return allPaths;
  }

  getAllPaths() {
    if (!this.paths) {
      this.paths = this.#findAllPaths();
    }
    return this.paths;
  }
}

export class ZipGameSolver extends AbstractGameSolver {
  constructor() {
    super(ZipGridCell);
  }

  /**
   * @type {{number: ZipGridCell}}
   */
  #numberedCellDict = {};

  /**
   * @type {number}
   */
  #highestCellContentNumber = 0;

  /**
   * @param {number} cellContentNumber
   * @param {ZipGridCell[][]} gridSnapshot
   * @private
   */
  #explorePaths(cellContentNumber, gridSnapshot) {
    if (Object.keys(this.#numberedCellDict).length === 0) {
      throw new Error("Numbered cell dictionary is empty.");
    }

    if (this.#highestCellContentNumber < cellContentNumber) {
      return gridSnapshot;
    }

    const startCell = this.#numberedCellDict[cellContentNumber];

    if (!startCell) {
    }
  }

  /**
   * @param {ZipGridCell[][]} grid
   */
  getSolvedGrid(grid) {
    /**
     * @type {{string: PathCollection}}
     */
    const pathCollectionDict = {};

    for (const row of grid) {
      for (const cell of row) {
        if (typeof cell.cellContent === "number") {
          this.#numberedCellDict[cell.cellContent] = cell;
          this.#highestCellContentNumber = Math.max(
            this.#highestCellContentNumber,
            cell.cellContent
          );
        }
      }
    }
  }
}
