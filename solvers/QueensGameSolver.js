import { AbstractGameSolver } from "./AbstractGameSolver.js";
import { QueensGridCell } from "../utils/grid/QueensGridCell.js";
import { gridToAscii } from "../utils/grid-to-ascii.js";
const STATE_CHAR_MAP = {
  empty: "○",
  queen: "♛",
  cross: "×",
};

class ColorGroup {
  constructor(color) {
    /**
     * @type {number}
     */
    this.color = color;

    /**
     * @type {Map<string, QueensGridCell>}
     */
    this.cellIdMap = new Map();

    /**
     * @type {Set<string>}
     */
    this.cellIds = new Set();

    /**
     * @type {Set<string>}
     */
    this.visitedCellIds = new Set();
  }

  /**
   * @param {QueensGridCell} cell
   */
  appendCell(cell) {
    this.cellIds.add(cell.toString());
    this.cellIdMap.set(cell.toString(), cell);
  }

  /**
   * @returns {number}
   */
  getSize() {
    return this.cellIdMap.values().length;
  }

  /**
   * @param {boolean} isEmpty
   * @param {Set<string>} visitedSet
   * @returns {QueensGridCell|null}
   */
  getFirstCell(isEmpty, isUnvisited) {
    for (const cell of this.cellIdMap.values()) {
      let meetsConditions = true;
      if (isEmpty && cell.cellState !== "empty") meetsConditions = false;
      if (isUnvisited && this.visitedCellIds.has(cell.toString()))
        meetsConditions = false;
      if (meetsConditions) return cell;
    }
    return null;
  }

  /**
   * @param {QueensGridCell} cell
   * @throws {Error}
   * @private
   */
  #validateCell(cell) {
    const cellId = cell.toString();
    if (this.visitedCellIds.has(cellId)) {
      throw new Error(
        `Cell ${cellId} has already been visited in this color group.`
      );
    }
  }

  /**
   * @param {QueensGridCell} cell
   * @param {"queen"|"empty"|"cross"} state
   * @throws {Error}
   */
  setCellState(cell, state) {
    this.#validateCell(cell);
    const internalCell = this.cellIdMap.get(cell.toString());
    internalCell.cellState = state;
  }

  /**
   * @param {QueensGridCell} cell
   * @throws {Error}
   */
  markAsVisited(cell) {
    this.#validateCell(cell);
    this.visitedCellIds.add(cell.toString());
  }

  /**
   * @returns {boolean}
   */
  containsQueen() {
    return this.cellIdMap.values().some((cell) => cell.cellState === "queen");
  }
}

export default class QueensGameSolver extends AbstractGameSolver {
  /**
   * @type {Map<number, ColorGroup>}
   */
  #colorGroupMap;
  /**
   * @type {string[]}
   */
  #sortedColors;

  /**
   * @param {QueensGridCell} cell
   * @returns {boolean}
   */
  isInstanceOfGameSpecificCell(cell) {
    return cell instanceof QueensGridCell;
  }

  /**
   * @param {QueensGridCell[][]} grid
   * @returns {Map<number, ColorGroup>}
   */
  getColorGroupMap(grid) {
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

    return colorGroupMap;
  }

  /**
   * @private
   * @param {QueensGridCell} cell
   * @param {QueensGridCell[][]} gridSnapshot
   * @returns {QueensGridCell[][]}
   */
  #getGridWithQueen(cell, gridSnapshot) {
    const newSnapshot = structuredClone(gridSnapshot);
    newSnapshot[cell.row][cell.col].cellState = "queen";
    const gridSize = gridSnapshot.length;

    const crossOutCell = (row, col) => {
      if (row === cell.row && col === cell.col) return;

      if (
        row >= 0 &&
        row < newSnapshot.length &&
        col >= 0 &&
        col < newSnapshot[0].length
      ) {
        const snapshotCell = newSnapshot[row][col];
        snapshotCell.cellState = "cross";
        const snapshotCellColor = snapshotCell.color;
        const colorGroup = this.#colorGroupMap.get(snapshotCellColor);
        colorGroup.setCellState(snapshotCell, "cross");
      }
    };

    for (let i = 0; i < gridSize; i++) {
      crossOutCell(i, cell.col);
      crossOutCell(cell.row, i);
    }

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        crossOutCell(cell.row + i, cell.col + j);
      }
    }

    return newSnapshot;
  }

  /**
   * @private
   * @returns {boolean}
   */
  #hasFoundSolution() {
    return this.#colorGroupMap.values().every((group) => group.containsQueen());
  }

  /**
   * @param {number} colourGroupIndex
   * @param {QueensGridCell[][]} gridSnapshot
   * @returns {QueensGridCell[][]|null}
   */
  visitColorGroup(colourGroupIndex, gridSnapshot) {
    console.log(`Visiting color group: ${colourGroupIndex}`);
    const color = this.#sortedColors[colourGroupIndex];
    const colorGroup = this.#colorGroupMap.get(color);

    let cell = colorGroup.getFirstCell(true, true);
    while (cell) {
      console.log("Visiting Cell: ", cell.toString());
      colorGroup.setCellState(cell, "queen");
      colorGroup.markAsVisited(cell);
      const newGridSnapshot = this.#getGridWithQueen(cell, gridSnapshot);
      console.log(
        "Grid Snapshot: ",
        gridToAscii(newGridSnapshot, STATE_CHAR_MAP)
      );

      if (colourGroupIndex >= this.#sortedColors.length - 1) {
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

      colorGroup.setCellState(cell, "empty");
      cell = colorGroup.getFirstCell(true, true);
    }

    return null;
  }

  /**
   * @param {QueensGridCell[][]} gameGrid
   * @returns {QueensGridCell[][]}
   */
  getSolvedGrid(grid) {
    this.#colorGroupMap = this.getColorGroupMap(grid);
    this.#sortedColors = Array.from(this.colorGroupMap.values())
      .sort((a, b) => a.getSize() - b.getSize())
      .map((group) => group.color);

    return this.visitColorGroup(0, grid);
  }
}
