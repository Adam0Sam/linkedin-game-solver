import { ZipGridCell } from "../ZipGridCell.js";

export class Path {
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

  clone() {
    const clonedPath = new Path(this.startCell, this.endCell);
    clonedPath.interCells = [...this.interCells];
    return clonedPath;
  }

  getLength() {
    return this.getPathCells().length;
  }
}
