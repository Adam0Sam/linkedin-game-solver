import QueensGameParser from "../parsers/QueensGameParser";
import QueensGameSolver from "../solvers/QueensGameSolver";

export class GameRegistry {
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
  constructor() {
    this.#parserMap = {
      queens: new QueensGameParser(),
    };
    this.#solverMap = {
      queens: new QueensGameSolver(),
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
}
