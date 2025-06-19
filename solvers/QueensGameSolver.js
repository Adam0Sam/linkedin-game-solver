import { QueensGridCell } from "../utils/grid/QueensGridCell";
import { AbstractGameSolver } from "./AbstractGameSolver";
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

  getFirstEmptyCell() {
    for (const cell of this.cells) {
      if (cell.cellState === "empty") {
        return cell;
      }
    }
    return null;
  }
}

export default class QueensGameSolver extends AbstractGameSolver {
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
  #getColorGroupMap(grid) {
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
   * @param {QueensGridCell[][]} gameGrid
   * @returns {GridCell[]}
   */
  getGridClicks(grid) {
    const colorGroupMap = this.#getColorGroupMap(grid);
    const sortedColorGroups = Array.from(colorGroupMap.values()).sort(
      (a, b) => b.getSize() - a.getSize()
    );
  }
}
