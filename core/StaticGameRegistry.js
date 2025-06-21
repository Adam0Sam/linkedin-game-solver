import QueensSolutionExecutor from "../executors/QueensSolutionExecutor.js";
import QueensGridParser from "../parsers/QueensGridParser.js";
import QueensGameSolver from "../solvers/QueensGameSolver.js";

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
    };
    this.#solverMap = {
      queens: new QueensGameSolver(),
    };
    this.#executorMap = {
      queens: new QueensSolutionExecutor(),
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
