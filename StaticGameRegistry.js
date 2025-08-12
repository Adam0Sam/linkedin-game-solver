import {
  QueensGameSolver,
  QueensGridParser,
  QueensSolutionExecutor,
} from "./games/queens/index.js";

import {
  ZipGameSolver,
  ZipGridParser,
  ZipSolutionExecutor,
} from "./games/zip/index.js";

import {
  TangoGameSolver,
  TangoGridParser,
  TangoSolutionExecutor,
} from "./games/tango/index.js";

export class StaticGameRegistry {
  /**
   * @type {{string, AbstractGameParser}}
   * @private
   */
  #parserMap;
  /**
   * @type {{string, AbstractGameSolver}}
   * @private
   */
  #solverMap;
  /**
   * @type {{string, AbstractGameExecutor}}
   * @private
   */
  #executorMap;
  constructor() {
    this.#parserMap = {
      queens: new QueensGridParser(),
      zip: new ZipGridParser(),
      tango: new TangoGridParser(),
    };
    this.#solverMap = {
      queens: new QueensGameSolver(),
      zip: new ZipGameSolver(),
      // WIP
      tango: new TangoGameSolver(),
    };
    this.#executorMap = {
      queens: new QueensSolutionExecutor(),
      zip: new ZipSolutionExecutor(),
      // WIP
      tango: new TangoSolutionExecutor(),
    };
  }

  /**
   * @param {string} gameType
   * @param {AbstractGameParser} parser
   */
  getSolver(gameType) {
    return this.#solverMap[gameType];
  }
  /**
   * @param {string} gameType
   * @param {AbstractGameParser} parser
   */
  getParser(gameType) {
    return this.#parserMap[gameType];
  }

  /**
   * @param {string} gameType
   * @param {AbstractGameExecutor} executor
   */
  getExecutor(gameType) {
    return this.#executorMap[gameType];
  }
  /**
   * @param {string} gameType
   * @returns {boolean}
   */
  hasSolver(gameType) {
    return this.#solverMap.hasOwnProperty(gameType);
  }
  /**
   * @param {string} gameType
   * @returns {boolean}
   */
  hasParser(gameType) {
    return this.#parserMap.hasOwnProperty(gameType);
  }
  /**
   * @param {string} gameType
   * @returns {boolean}
   */
  hasExecutor(gameType) {
    return this.#executorMap.hasOwnProperty(gameType);
  }
}
