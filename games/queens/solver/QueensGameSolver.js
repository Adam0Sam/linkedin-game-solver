import { AbstractGameSolver } from "../../common/abstract-helpers/AbstractGameSolver.js";
import { QueensGridCell } from "../QueensGridCell.js";
import { QueensGridSnapshot } from "../QueensGridSnapshot.js";
import { ColorGroup } from "./ColorGroup.js";

export class QueensGameSolver extends AbstractGameSolver {
  constructor() {
    super(QueensGridCell);
  }

  /**
   * @private
   * @type {string[]}
   */
  #sortedColors;

  /**
   * @private
   * @type {Map<number, ColorGroup>}
   */
  #colorGroupMap;

  /**
   * @private
   * @param {QueensGridCell[][]} grid
   */
  #buildColorGroupMap(grid) {
    /**
     * @type {Map<number, ColorGroup>}
     */
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
   * @private
   * @param {QueensGridSnapshot} currentGridSnapshot
   * @param {number} colorIndex
   * @returns {QueensGridSnapshot|null}
   */
  visitColorGroup(currentGridSnapshot, colorIndex) {
    if (colorIndex >= this.#sortedColors.length) {
      return currentGridSnapshot.hasSolution(this.#colorGroupMap)
        ? currentGridSnapshot
        : null;
    }

    const color = this.#sortedColors[colorIndex];
    const colorGroup = this.#colorGroupMap.get(color);
    const emptyCells = currentGridSnapshot.getEmptyCellsInGroup(colorGroup);

    for (const cell of emptyCells) {
      const nextSnapshot = currentGridSnapshot.placeQueen(cell);

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
   */
  getSolvedGrid(grid) {
    const initialSnapshot = new QueensGridSnapshot(grid);

    this.#colorGroupMap = this.#buildColorGroupMap(grid);
    this.#sortedColors = Array.from(this.#colorGroupMap.values())
      .sort((a, b) => a.getSize() - b.getSize())
      .map((group) => group.color);

    const solutionSnapshot = this.visitColorGroup(initialSnapshot, 0);
    return solutionSnapshot ? solutionSnapshot.grid : null;
  }
}
