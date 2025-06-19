import { Singleton } from "../utils/Singleton.js";

export class GameRegistry extends Singleton {
  #parsers;
  #solvers;
  constructor() {
    super();

    /**
     * @type {Map<string, AbstractGameParser>}
     */
    this.#parsers = new Map();

    /**
     * @type {Map<string, AbstractGameSolver>}
     */
    this.#solvers = new Map();
  }

  /**
   * @param {string} gameType
   * @param {AbstractGameParser} parser
   */
  registerParser(gameType, parser) {
    this.#parsers.set(gameType, parser);
  }

  /**
   * @param {string} gameType
   * @param {AbstractGameSolver} solver
   */
  registerSolver(gameType, solver) {
    this.#solvers.set(gameType, solver);
  }

  /**
   * @param {string} gameType
   * @returns {AbstractGameParser}
   */
  async getParser(gameType) {
    const parser =
      this.#parsers.get(gameType) ??
      (await this.#loadGamePlugin(gameType).then(() =>
        this.#parsers.get(gameType)
      ));
    if (!parser) {
      throw new Error(`No parser registered for game type: ${gameType}`);
    }
    return parser;
  }

  /**
   * @param {string} gameType
   * @returns {AbstractGameSolver}
   */
  async getSolver(gameType) {
    const solver =
      this.#solvers.get(gameType) ??
      (await this.#loadGamePlugin(gameType).then(() =>
        this.#solvers.get(gameType)
      ));
    if (!solver) {
      throw new Error(`No solver registered for game type: ${gameType}`);
    }
    return solver;
  }

  /**
   * @param {string} gameType
   * @returns {string}
   * @private
   */
  #capitalizeGameType(gameType) {
    return gameType.charAt(0).toUpperCase() + gameType.slice(1).toLowerCase();
  }

  /**
   * @param {string} gameType
   * @returns {Promise<void>}
   */
  async #loadGamePlugin(gameType) {
    const capitalizedGameType = this.#capitalizeGameType(gameType);
    const parserModulePromise = import(
      chrome.runtime.getURL(`parsers/${capitalizedGameType}GameParser.js`)
    );
    const solverModulePromise = import(
      chrome.runtime.getURL(`solvers/${capitalizedGameType}GameSolver.js`)
    );

    const [parserModule, solverModule] = await Promise.all([
      parserModulePromise,
      solverModulePromise,
    ]);

    const parser = new parserModule.default();
    const solver = new solverModule.default();

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
