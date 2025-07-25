import { AbstractSolutionExecutor } from "../common/abstract-helpers/AbstractSolutionExecutor.js";
import QueensGridParser from "./QueensGridParser.js";

export class QueensSolutionExecutor extends AbstractSolutionExecutor {
  constructor() {
    super(new QueensGridParser());
  }

  /**
   * @param {QueensGridCell[][]} solutionGrid
   * @returns {number[][]}
   */
  getSolutionClickSequence(solutionGrid) {
    const clickSequence = [];
    for (let rowIndex = 0; rowIndex < solutionGrid.length; rowIndex++) {
      for (
        let colIndex = 0;
        colIndex < solutionGrid[rowIndex].length;
        colIndex++
      ) {
        const cell = solutionGrid[rowIndex][colIndex];
        if (cell.cellState === "queen") {
          clickSequence.push([rowIndex, colIndex]);
        }
      }
    }

    return clickSequence;
  }
}
