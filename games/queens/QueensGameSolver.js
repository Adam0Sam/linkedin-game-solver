import { AbstractGameSolver } from "../common/abstract-helpers/AbstractGameSolver.js";
import { QueensGridCell } from "./QueensGridCell.js";

class ColorGroup {
  constructor(color) {
    /**
     * @type {number}
     */
    this.color = color;

    /**
     * @type {Set<string>}
     */
    this.cellIds = new Set();
  }

  /**
   * @param {QueensGridCell} cell
   */
  appendCell(cell) {
    if (!(cell instanceof QueensGridCell)) {
      cell = new QueensGridCell(cell.col, cell.row, this.color, cell.cellState);
    }
    this.cellIds.add(cell.toString());
  }

  /**
   * @returns {number}
   */
  getSize() {
    return this.cellIds.size;
  }
}

class GridSnapshot {
  /**
   * @param {QueensGridCell[][]} grid
   */
  constructor(grid) {
    /**
     * @type {QueensGridCell[][]}
     */
    this.grid = grid;

    /**
     * @type {Map<number, ColorGroup>}
     */
    this.colorGroupMap = this.#buildColorGroupMap(grid);

    /**
     * @type {number}
     */
    this.gridSize = grid.length;
  }

  /**
   * @private
   * @param {QueensGridCell[][]} grid
   * @returns {Map<number, ColorGroup>}
   */
  #buildColorGroupMap(grid) {
    const map = new Map();
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const cell = grid[row][col];
        if (!map.has(cell.color)) {
          map.set(cell.color, new ColorGroup(cell.color));
        }
        map.get(cell.color).appendCell(cell);
      }
    }
    return map;
  }

  /**
   * @param {string} cellId
   * @returns {QueensGridCell}
   * @throws {Error} If cellId is invalid
   */
  #getCellById(cellId) {
    const [row, col] = cellId.split(",").map(Number);
    if (row < 0 || row >= this.gridSize || col < 0 || col >= this.gridSize) {
      throw new Error(`Invalid cellId: ${cellId}`);
    }
    return this.grid[row][col];
  }

  /**
   * @returns {GridSnapshot}
   */
  clone() {
    return new GridSnapshot(structuredClone(this.grid));
  }

  /**
   * @param {QueensGridCell} cell
   * @param {"queen"|"empty"|"cross"} state
   */
  setCellState(cell, state) {
    this.grid[cell.row][cell.col].cellState = state;
  }

  /**
   * @returns {boolean}
   */
  hasSolution() {
    for (const colorGroup of this.colorGroupMap.values()) {
      let hasQueen = false;
      for (const cellId of colorGroup.cellIds) {
        const cell = this.#getCellById(cellId);
        if (cell.cellState === "queen") {
          hasQueen = true;
          break;
        }
      }
      if (!hasQueen) return false;
    }
    return true;
  }

  /**
   * @param {QueensGridCell} cell
   * @returns {GridSnapshot}
   */
  placeQueen(cell) {
    const newSnapshot = this.clone();
    newSnapshot.setCellState(cell, "queen");

    const crossOutCell = (row, col) => {
      if (row === cell.row && col === cell.col) return;

      if (
        row >= 0 &&
        row < newSnapshot.gridSize &&
        col >= 0 &&
        col < newSnapshot.gridSize
      ) {
        const targetCell = newSnapshot.grid[row][col];
        if (targetCell.cellState === "empty") {
          newSnapshot.setCellState(targetCell, "cross");
        }
      }
    };

    for (let i = 0; i < newSnapshot.gridSize; i++) {
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
   * @param {ColorGroup} colorGroup
   * @returns {QueensGridCell[]}
   */
  getEmptyCellsInGroup(colorGroup) {
    const emptyCells = [];
    for (const cellId of colorGroup.cellIds) {
      const cell = this.#getCellById(cellId);
      if (cell.cellState === "empty") {
        emptyCells.push(cell);
      }
    }
    return emptyCells;
  }
}

export class QueensGameSolver extends AbstractGameSolver {
  /**
   * @private
   * @type {string[]}
   */
  #sortedColors;

  /**
   * @param {object} cell
   * @returns {QueensGridCell}
   * @throws {Error}
   */
  toGameCell(cell) {
    if (
      !cell ||
      typeof cell.col !== "number" ||
      typeof cell.row !== "number" ||
      typeof cell.color !== "number" ||
      typeof cell.cellState !== "string"
    ) {
      throw new Error("Invalid cell object provided.");
    }
    return new QueensGridCell(
      cell.col,
      cell.row,
      cell.color,
      cell.cellState || "empty"
    );
  }

  /**
   * @private
   * @param {GridSnapshot} currentSnapshot
   * @param {number} colorIndex
   * @returns {GridSnapshot|null}
   */
  visitColorGroup(currentSnapshot, colorIndex) {
    if (colorIndex >= this.#sortedColors.length) {
      if (currentSnapshot.hasSolution()) {
        return currentSnapshot;
      }
      return null;
    }

    const color = this.#sortedColors[colorIndex];
    const colorGroup = currentSnapshot.colorGroupMap.get(color);
    const emptyCells = currentSnapshot.getEmptyCellsInGroup(colorGroup);

    for (const cell of emptyCells) {
      const nextSnapshot = currentSnapshot.placeQueen(cell);

      const solutionSnapshot = this.visitColorGroup(
        nextSnapshot,
        colorIndex + 1
      );
      if (solutionSnapshot) {
        return solutionSnapshot;
      }
    }

    return null;
  }

  /**
   * @param {QueensGridCell[][]} grid
   * @returns {QueensGridCell[][]}
   */
  getSolvedGrid(grid) {
    const initialSnapshot = new GridSnapshot(grid);
    this.#sortedColors = Array.from(initialSnapshot.colorGroupMap.values())
      .sort((a, b) => a.getSize() - b.getSize())
      .map((group) => group.color);

    const solutionSnapshot = this.visitColorGroup(initialSnapshot, 0);
    return solutionSnapshot ? solutionSnapshot.grid : null;
  }
}
