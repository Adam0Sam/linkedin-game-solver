import { AbstractClass, NotImplementedError } from "../utils/AbstractClass.js";
import { AbstractGridParser } from "../parsers/AbstractGridParser.js";

export class AbstractSolutionExecutor extends AbstractClass {
  /**
   * @type {AbstractGridParser}
   * @private
   */
  #gridParser;

  /**
   * @param {AbstractGridParser} gridParser
   */
  constructor(gridParser) {
    super();
    this.#gridParser = gridParser;
  }

  /**
   * @param {GridCell[][]} solutionGrid
   * @returns {number[][]}
   */
  getSolutionClickSequence(solutionGrid) {
    throw new NotImplementedError("getGridClickIndices");
  }

  /**
   * @param {string} htmlContent
   * @param {GridCell[][]} solutionGrid
   * @throws {Error}
   */
  execute(htmlContent, solutionGrid) {
    const gridElement = this.#gridParser.parse(htmlContent, false);
    const clickSequence = this.getSolutionClickSequence(solutionGrid);
    for (const [rowIndex, colIndex] of clickSequence) {
      const cell = gridElement[rowIndex][colIndex];
      if (cell) {
      } else {
        throw new Error(`Cell at (${rowIndex}, ${colIndex}) does not exist.`);
      }
    }
  }
}
