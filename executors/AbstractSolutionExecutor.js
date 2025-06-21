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
   * @param {Document} doc
   * @param {GridCell[][]} solutionGrid
   * @throws {Error}
   */
  execute(doc, solutionGrid) {
    const gridElements = this.#gridParser.parseToDomElements(doc);
    const clickSequence = this.getSolutionClickSequence(solutionGrid);
    for (const [rowIndex, colIndex] of clickSequence) {
      const cell = gridElements[rowIndex][colIndex];
      if (cell) {
        console.log(`Clicking cell at (${rowIndex}, ${colIndex})`, cell);
        cell.click();
      } else {
        throw new Error(`Cell at (${rowIndex}, ${colIndex}) does not exist.`);
      }
    }
  }
}
