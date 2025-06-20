/**
 * Currently unusable because service workers are forbidden from dynamically importing modules
 */
export class DynamicGameRegistry {
  /**
   * @type {Map<string, AbstractGameParser>}
   * @private
   */
  #parsers;
  /**
   * @type {Map<string, AbstractGameSolver>}
   * @private
   */
  #solvers;

  /**
   * @type {DynamicGameRegistry|null}
   * @private
   */
  static #instance = null;

  constructor() {
    if (DynamicGameRegistry.#instance) {
      throw new Error("Attempted to invoke singletong constructor directly.");
    }
    this.#parsers = new Map();
    this.#solvers = new Map();
    DynamicGameRegistry.#instance = this;
  }

  static getInstance() {
    if (!DynamicGameRegistry.#instance) {
      DynamicGameRegistry.#instance = new DynamicGameRegistry();
    }
    return DynamicGameRegistry.#instance;
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
