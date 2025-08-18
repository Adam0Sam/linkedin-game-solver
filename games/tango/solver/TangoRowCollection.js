import { TangoGridCell } from "../TangoGridCell.js";
import { EdgeModifierGrid } from "../../common/EdgeModifierGrid.js";

export class TangoRowCollection {
  /**
   * @param {number} rowIndex
   * @param {TangoGridCell[][]} gameGrid
   * @param {EdgeModifierGrid} edgeModifierGrid
   */
  constructor(rowIndex, gameGrid, edgeModifierGrid) {
    /**
     * @type {number}
     */
    this.rowIndex = rowIndex;
    /**
     * @type {TangoGridCell[][]|null}
     */
    this.rows = null;
    /**
     * @type {TangoGridCell[][]}
     */
    this.gameGrid = gameGrid;
    /**
     * @type {EdgeModifierGrid}
     */
    this.edgeModifierGrid = edgeModifierGrid;
  }

  /**
   * @param {TangoGridCell} cell
   * @param {TangoGridCell[]} currRow
   */
  #followsSequenceConstraints(cell, currRow) {
    if (
      cell.row > 1 &&
      this.gameGrid[cell.row - 1][cell.col].cellState === cell.cellState &&
      this.gameGrid[cell.row - 2][cell.col].cellState === cell.cellState
    ) {
      return false;
    }

    if (
      currRow.length >= 2 &&
      currRow[currRow.length - 1].cellState === cell.cellState &&
      currRow[currRow.length - 2].cellState === cell.cellState
    ) {
      return false;
    }

    return true;
  }

  #followsCountConstraints(cell, currRow) {
    const count = currRow.filter((c) => c.cellState === cell.cellState).length;
    return count <= 3;
  }

  /**
   * @param {TangoGridCell} cell1
   * @param {TangoGridCell} cell2
   * @param {"equal"|"cross"} modifierContent
   */
  #followsEdgeModifierConstraints(cell1, cell2, modifierContent) {
    if (modifierContent === "cross") return cell1.cellState !== cell2.cellState;
    if (modifierContent === "equal") return cell1.cellState === cell2.cellState;
  }

  /**
   * @param {TangoGridCell} cell
   * @param {TangoGridCell[]} currRow
   */
  #followsConstraints(cell, currRow) {
    const leftNeighbour = this.gameGrid[cell.row][cell.col - 1];
    const topNeighbour = this.gameGrid[cell.row - 1]?.[cell.col];

    for (let neighbour of [leftNeighbour, topNeighbour]) {
      if (!neighbour) continue;
      const modifierContent =
        this.edgeModifierGrid.getModifierContent(neighbour);
      if (!modifierContent) continue;
      if (
        !this.#followsEdgeModifierConstraints(cell, neighbour, modifierContent)
      ) {
        return false;
      }
    }

    return (
      this.#followsSequenceConstraints(cell, currRow) &&
      this.#followsCountConstraints(cell, currRow)
    );
  }

  /**
   * @private
   */
  #findAllValidRows() {
    /**
     * @type {TangoGridCell[][]}
     */
    const allValidRows = [];
    const maxCol = this.gameGrid[0].length;

    /**
     *
     * @param {number} currColIndex
     * @param {TangoGridCell[]} currRow
     * @returns
     */
    const dfs = (currColIndex, currRow) => {
      if (currColIndex >= maxCol) {
        allValidRows.push(currRow);
        return;
      }

      for (let col = currColIndex; col < maxCol; col++) {
        for (let state of TangoGridCell.getFilledStates()) {
          const existingCell = this.gameGrid[this.rowIndex][col];

          if (existingCell.isLocked) {
            dfs(col + 1, [...currRow, existingCell]);
            continue;
          }

          const newCell = new TangoGridCell(col, this.rowIndex, state, false);
          if (this.#followsConstraints(newCell, currRow)) {
            dfs(col + 1, [...currRow, newCell]);
          }
        }
      }
    };

    dfs(0, []);

    return allValidRows;
  }

  getAllValidRows() {
    if (!this.rows) {
      this.rows = this.#findAllValidRows();
    }

    return this.rows;
  }
}
