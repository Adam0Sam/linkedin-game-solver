import { Path } from "./Path.js";
import { ZipGridCell } from "../ZipGridCell.js";

export class PathCollection {
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
        if (nextCell && ZipGridCell.isTraversable(nextCell)) {
          traversableCells.push(nextCell);
        }
      }
    }

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

        if (ZipGridCell.areNeighbours(nextCell, this.endCell)) {
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
