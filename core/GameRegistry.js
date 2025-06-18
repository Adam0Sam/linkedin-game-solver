import { Singleton } from "../utils/Singleton.js";

export class GameRegistry extends Singleton {
  constructor() {
    super();

    /**
     * @type {Map<string, AbstractGameParser>}
     */
    this.parsers = new Map();

    /**
     * @type {Map<string, AbstractGameSolver>}
     */
    this.solvers = new Map();
  }

  /**
   * @param {string} gameType
   * @param {AbstractGameParser} parser
   */
  registerParser(gameType, parser) {
    this.parsers.set(gameType, parser);
  }

  /**
   * @param {string} gameType
   * @param {AbstractGameSolver} solver
   */
  registerSolver(gameType, solver) {
    this.solvers.set(gameType, solver);
  }

  /**
   * @param {string} gameType
   * @returns {AbstractGameParser}
   */
  getParser(gameType) {
    const parser = this.parsers.get(gameType);
    if (!parser) {
      throw new Error(`No parser registered for game type: ${gameType}`);
    }
    return parser;
  }

  /**
   * @param {string} gameType
   * @returns {AbstractGameSolver}
   */
  getSolver(gameType) {
    const solver = this.solvers.get(gameType);
    if (!solver) {
      throw new Error(`No solver registered for game type: ${gameType}`);
    }
    return solver;
  }

  /**
   * @param {string} gameType
   * @returns {boolean}
   */
  hasParser(gameType) {
    return this.parsers.has(gameType);
  }

  /**
   * @param {string} gameType
   * @returns {boolean}
   */
  hasSolver(gameType) {
    return this.solvers.has(gameType);
  }

  /**
   * @param {string} gameType
   * @returns {Promise<void>}
   */
  async _loadGamePlugin(gameType) {
    let gameModule;

    try {
      const gameModulePath = `games/${gameType}.js`;
      const gameModuleUrl = chrome.runtime.getURL(gameModulePath);
      gameModule = await import(gameModuleUrl);
    } catch (error) {
      console.error(`Failed to load game module for ${gameType}:`, error);
      throw error;
    }

    const { parser, solver } = gameModule;

    if (!parser) {
      throw new Error(`Game module for ${gameType} is missing a parser export`);
    }

    if (!solver) {
      throw new Error(`Game module for ${gameType} is missing a solver export`);
    }

    this.registerParser(gameType, parser);
    this.registerSolver(gameType, solver);
  }
}
