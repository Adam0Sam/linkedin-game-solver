import { StaticGameRegistry } from "./StaticGameRegistry.js";

function handleSolveGame(sendResponse) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const gameType = new URL(tabs[0].url).pathname.split("/")[2];
    const gameRegistry = new StaticGameRegistry();
    const solver = gameRegistry.getSolver(gameType);

    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "getGameGrid", gameType: gameType },
      (response) => {
        if (!response || response.error) {
          sendResponse({ error: response?.error || "Failed to get game grid" });
          return;
        }

        console.log("Game grid received:", response.gameGrid);
        console.log("Edge modifier grid:", response.edgeModifierGrid);

        const solutionGrid = solver.solve(
          response.gameGrid,
          response.edgeModifierGrid
        );

        console.log("Solution grid:", solutionGrid);

        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            action: "executeSolution",
            solution: solutionGrid,
            gameType,
          },
          (response) => {
            sendResponse(response);
          }
        );
      }
    );
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "solveGame") {
    handleSolveGame(sendResponse);
    return true;
  }

  return false;
});
