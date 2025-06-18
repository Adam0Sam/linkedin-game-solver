import { GameRegistry } from "./GameRegistry.js";
import { GameEventBus } from "./GameEventBus.js";

export class GameManager {
  constructor() {
    /**
     * @type {GameRegistry}
     */
    this.registry = GameRegistry.getInstance();

    /**
     * @type {GameEventBus}
     */
    this.eventBus = GameEventBus();
  }

  /**
   * @param {string} gameType - Type of game to process
   * @param {string} htmlContent - HTML content of the game page
   * @returns {Promise<object>} Parsed game data
   */
  async processGame(gameType, htmlContent) {
    try {
      if (
        !this.registry.hasParser(gameType) ||
        !this.registry.hasSolver(gameType)
      ) {
        await this._loadGamePlugin(gameType);
      }

      // Get parser and parse HTML
      const parser = this.registry.getParser(gameType);
      const gameData = await parser.parseHtml(htmlContent);

      // Publish event with parsed game data
      this.eventBus.publish("game:parsed", {
        type: gameType,
        data: gameData,
      });

      return gameData;
    } catch (error) {
      console.error(`Error processing game ${gameType}:`, error);
      this.eventBus.publish("game:error", {
        type: gameType,
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * Solves a game using the appropriate solver
   * @param {string} gameType - Type of game to solve
   * @param {object} gameData - Parsed game data
   * @returns {Promise<object>} Solution instructions
   */
  async solveGame(gameType, gameData) {
    try {
      // Check if we have a solver for this game type
      if (!this.registry.hasSolver(gameType)) {
        await this._loadGamePlugin(gameType);
      }

      // Get solver and solve game
      const solver = this.registry.getSolver(gameType);
      const solution = await solver.solve(gameData);

      // Publish event with solution
      this.eventBus.publish("game:solved", {
        type: gameType,
        solution: solution,
      });

      return solution;
    } catch (error) {
      console.error(`Error solving game ${gameType}:`, error);
      this.eventBus.publish("game:error", {
        type: gameType,
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * @private
   * @param {string} gameType - Game type to load
   * @returns {Promise<void>} - Loads the game plugin dynamically
   */
  async _loadGamePlugin(gameType) {
    try {
      const pluginPath = `plugins/${gameType}-plugin.js`;
      const pluginUrl = chrome.runtime.getURL(pluginPath);
      const { default: initPlugin } = await import(pluginUrl);
      initPlugin();
    } catch (error) {
      throw new Error(`Unsupported game type: ${gameType}`);
    }
  }
}

/**
 * Factory function to create a GameManager instance
 * @returns {GameManager} A new GameManager instance
 */
export function createGameManager() {
  return new GameManager();
}
