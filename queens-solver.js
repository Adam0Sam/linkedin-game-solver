export class QueensSolver {
  constructor(gameData) {
    // this.size = size;
    // this.solutions = [];
  }

  solve() {
    // this._placeQueens(0, []);
    console.log(`Solving Queens problem...`);
    // return this.solutions;
  }

  _placeQueens(row, queens) {
    if (row === this.size) {
      this.solutions.push([...queens]);
      return;
    }

    for (let col = 0; col < this.size; col++) {
      if (this._isSafe(row, col, queens)) {
        queens.push(col);
        this._placeQueens(row + 1, queens);
        queens.pop();
      }
    }
  }

  _isSafe(row, col, queens) {
    for (let r = 0; r < row; r++) {
      const c = queens[r];
      if (c === col || Math.abs(c - col) === Math.abs(r - row)) {
        return false;
      }
    }
    return true;
  }
}
