/**
 * AbstractGameSolver serves as a template for all game solvers.
 * This class defines the common interface and provides shared functionality
 * that all game solvers should implement.
 *
 * @abstract
 */
export class AbstractGameSolver {
  /**
   * Constructor for the AbstractGameSolver
   * @param {string} gameType - Type identifier for the game
   */
  constructor(gameType) {
    if (this.constructor === AbstractGameSolver) {
      throw new Error("AbstractGameSolver cannot be instantiated directly");
    }
    this.gameType = gameType;
  }

  /**
   * Solves the game based on provided game data
   * @abstract
   * @param {object} gameData - Game data extracted from the HTML
   * @returns {Promise<object>} - Solution instructions
   */
  async solve(gameData) {
    throw new Error("Method 'solve' must be implemented by derived classes");
  }

  /**
   * Validates that the game data is sufficient for solving
   * @abstract
   * @param {object} gameData - Game data extracted from the HTML
   * @returns {boolean} - True if the game data is valid
   */
  validateGameData(gameData) {
    throw new Error(
      "Method 'validateGameData' must be implemented by derived classes"
    );
  }

  /**
   * Prepares the game data for solving
   * @abstract
   * @param {object} gameData - Raw game data
   * @returns {object} - Processed game data ready for solving
   */
  prepareGameData(gameData) {
    throw new Error(
      "Method 'prepareGameData' must be implemented by derived classes"
    );
  }

  /**
   * Formats the solution into instructions
   * @abstract
   * @param {object} solution - Raw solution data
   * @returns {object} - Formatted solution instructions
   */
  formatSolution(solution) {
    throw new Error(
      "Method 'formatSolution' must be implemented by derived classes"
    );
  }
}
