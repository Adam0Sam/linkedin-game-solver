import { Path } from "./Path.js";
import { ZipGridCell } from "../ZipGridCell.js";
import { AbstractGridCell } from "../../common/abstract-helpers/AbstractGridCell.js";
import { EdgeModifierGrid } from "../../common/EdgeModifierGrid.js";

export class PathCollection {
  /**
   * @param {ZipGridCell} startCell
   * @param {ZipGridCell} endCell
   * @param {ZipGridCell[][]} gameGrid
   * @param {EdgeModifierGrid} edgeModifierGrid
   */
  constructor(startCell, endCell, gameGrid, edgeModifierGrid) {
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
    this.gameGrid = gameGrid;

    /**
     * @type {Array<Path> | null}
     */
    this.paths = null;

    /**
     * @type {EdgeModifierGrid}
     */
    this.edgeModifierGrid = edgeModifierGrid;
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
        newRow < this.gameGrid.length &&
        newCol >= 0 &&
        newCol < this.gameGrid[0].length
      ) {
        const nextCell = this.gameGrid[newRow][newCol];
        if (
          nextCell &&
          ZipGridCell.isTraversable(nextCell) &&
          !this.edgeModifierGrid.areCellsConnectedByModifier(
            currentCell,
            nextCell
          )
        ) {
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
        const cellId = AbstractGridCell.toString(nextCell);

        if (visited.has(cellId)) {
          continue;
        }

        visited.add(cellId);

        currentPath.appendInterCell(nextCell);

        if (ZipGridCell.areNeighbours(nextCell, this.endCell)) {
          allPaths.push(currentPath.clone());
        }

        dfs(nextCell, currentPath);

        currentPath.popInterCell();

        visited.delete(cellId);
      }
    };

    if (ZipGridCell.areNeighbours(this.startCell, this.endCell)) {
      const directPath = new Path(this.startCell, this.endCell);
      allPaths.push(directPath);
    }

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
