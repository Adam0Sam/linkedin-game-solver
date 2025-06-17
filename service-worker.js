import { GameSolver } from "./game-solver.js";

chrome.runtime.onMessage.addListener((request) => {
  if (request.action !== "solveGame") return;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const gameType = new URL(tabs[0].url).pathname.split("/")[2];

    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "getGameData", gameType: gameType },
      (response) => {
        try {
          console.log("Game data received:", response.gameData);
          const gameSolver = new GameSolver(gameType);
          gameSolver.solve(response.gameData);
        } catch (error) {
          console.error("Error solving game:", error);
        }
      }
    );
  });
});
