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
    const rowCount = currRow.filter(
      (c) => c.cellState === cell.cellState
    ).length;

    let columnCount = 1;
    for (let i = 0; i < this.rowIndex; i++) {
      const colCell = this.gameGrid[i][cell.col];
      if (colCell.cellState === cell.cellState) {
        columnCount++;
      }
    }

    return rowCount < 3 && columnCount <= 3;
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
    const gridLength = this.gameGrid[0].length;

    /**
     *
     * @param {number} currColIndex
     * @param {TangoGridCell[]} currRow
     * @returns
     */
    const dfs = (currColIndex, currRow) => {
      if (currColIndex >= gridLength) {
        allValidRows.push([...currRow]);
        return;
      }

      const existingCell = this.gameGrid[this.rowIndex][currColIndex];

      if (existingCell.isLocked) {
        if (this.#followsConstraints(existingCell, currRow)) {
          currRow.push(existingCell);
          dfs(currColIndex + 1, currRow);
          currRow.pop();
        }
        return;
      }

      for (let state of TangoGridCell.getFilledStates()) {
        const newCell = new TangoGridCell(
          currColIndex,
          this.rowIndex,
          state,
          false
        );
        if (this.#followsConstraints(newCell, currRow)) {
          currRow.push(newCell);
          dfs(currColIndex + 1, currRow);
          currRow.pop();
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
