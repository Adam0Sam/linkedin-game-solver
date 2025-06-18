import { AbstractGameSolver } from "./AbstractGameSolver.js";

/**
 * Queens game solver
 */
export class QueensGameSolver extends AbstractGameSolver {
  constructor() {
    super("queens");
  }

  /**
   * Solves the Queens game
   * @param {object} gameData - Queens game data
   * @returns {Promise<object>} Solution instructions
   */
  async solve(gameData) {
    // Validate game data
    this.validateGameData(gameData);

    // Prepare game data for solving
    const preparedData = this.prepareGameData(gameData);

    // Solve using N-Queens algorithm
    const solution = this.solveQueens(preparedData);

    // Format solution
    return this.formatSolution(solution);
  }

  /**
   * Validates that the game data is sufficient for solving
   * @param {object} gameData - Queens game data
   * @returns {boolean} True if game data is valid
   */
  validateGameData(gameData) {
    if (!gameData || !gameData.columns || !gameData.rows) {
      throw new Error("Invalid game data: missing dimensions");
    }
    return true;
  }

  /**
   * Prepares the game data for solving
   * @param {object} gameData - Raw game data
   * @returns {object} Processed game data
   */
  prepareGameData(gameData) {
    const { columns, rows, gridCells } = gameData;

    // Create a 2D grid representation
    const grid = Array(rows)
      .fill()
      .map(() => Array(columns).fill(0));

    // Mark existing queens
    if (gridCells) {
      for (const cell of gridCells) {
        if (cell.isQueen) {
          grid[cell.row][cell.col] = 1;
        }
      }
    }

    return { grid, columns, rows };
  }

  /**
   * Solves the N-Queens problem
   * @private
   * @param {object} preparedData - Prepared game data
   * @returns {object} Raw solution
   */
  solveQueens(preparedData) {
    const { grid, columns, rows } = preparedData;

    // This is a simplified placeholder for the actual N-Queens algorithm
    // In a real implementation, this would use backtracking or another algorithm
    // to find a valid queen placement

    const solution = [];

    // For demonstration, we'll just place queens in a simple pattern
    // (This won't be a valid solution for the actual game)
    for (let i = 0; i < rows; i++) {
      solution.push({ row: i, col: i % columns });
    }

    return { queenPlacements: solution };
  }

  /**
   * Formats the solution into instructions
   * @param {object} solution - Raw solution
   * @returns {object} Formatted solution instructions
   */
  formatSolution(solution) {
    const { queenPlacements } = solution;

    // Format the solution as a sequence of moves
    const moves = queenPlacements.map((placement, index) => {
      return {
        step: index + 1,
        action: "placeQueen",
        position: {
          row: placement.row,
          col: placement.col,
        },
      };
    });

    return {
      type: this.gameType,
      instructions: moves,
    };
  }
}
