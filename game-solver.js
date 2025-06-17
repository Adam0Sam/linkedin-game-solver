import { QueensSolver } from "./queens-solver.js";

export class GameSolver {
  constructor(gameType) {
    this.gameType = gameType;
  }

  solve(gameData) {
    switch (this.gameType) {
      case "queens":
        return new QueensSolver(gameData).solve();
      default:
        throw new Error("Unknown game type");
    }
  }
}
