/**
 * GridCell class representing a cell in a grid-based game
 */
export class GridCell {
  /**
   * Create a grid cell
   * @param {number} col - Column index
   * @param {number} row - Row index
   * @param {string} color - Cell color
   * @param {boolean} isSpecial - Whether the cell has a special state
   */
  constructor(col, row, color = null, isSpecial = false) {
    this.col = col;
    this.row = row;
    this.color = color;
    this.isSpecial = isSpecial;
  }

  /**
   * Get cell coordinates as a string
   * @returns {string} Coordinates in format "col,row"
   */
  getCoordinates() {
    return `${this.col},${this.row}`;
  }

  /**
   * Check if this cell has the same position as another cell
   * @param {GridCell} otherCell - Another grid cell
   * @returns {boolean} True if positions match
   */
  samePositionAs(otherCell) {
    return this.col === otherCell.col && this.row === otherCell.row;
  }
}
