import { AbstractSolutionExecutor } from "../common/abstract-helpers/AbstractSolutionExecutor.js";
import { Path } from "./solver/Path.js";
import { ZipGridParser } from "./ZipGridParser.js";

export class ZipSolutionExecutor extends AbstractSolutionExecutor {
  constructor() {
    super(new ZipGridParser());
  }

  /**
   *
   * @param {Path[]} paths
   */
  getSolutionClickSequence(paths) {
    console.log();
    const clickSequence = [];
    for (const path of paths) {
      const pathCells = [path.startCell, ...path.interCells, path.endCell];
      for (const cell of pathCells) {
        clickSequence.push([cell.row, cell.col]);
      }
    }
    return clickSequence;
  }
}
