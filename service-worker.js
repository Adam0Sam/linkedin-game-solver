import { GameRegistry } from "./core/GameRegistry.js";

function handleSolveGame(sendResponse) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const gameType = new URL(tabs[0].url).pathname.split("/")[2];
    const gameRegistry = new GameRegistry();
    const solver = gameRegistry.getSolver(gameType);

    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "getGameGrid", gameType: gameType },
      (response) => {
        if (!response || response.error) {
          sendResponse({ error: response?.error || "Failed to get game grid" });
          return;
        }
        console.log("Game grid received:", response.grid);
        const solutionGrid = solver.solve(response.grid);

        chrome.tabs.sendMessage(tabs[0].id, {
          action: "executeSolution",
          solution: solutionGrid,
          gameType,
        });

        sendResponse({ success: true });
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
