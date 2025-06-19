import { GameRegistry } from "./core/GameRegistry.js";

// Initialize GameRegistry once at service worker startup
const gameRegistry = GameRegistry.getInstance();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action !== "solveGame") {
    return false;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const gameType = new URL(tabs[0].url).pathname.split("/")[2];

    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "getGameGrid", gameType: gameType },
      (response) => {
        if (!response || response.error) {
          console.error(
            "Error getting game grid:",
            response?.error || "No response"
          );
          sendResponse({ error: response?.error || "Failed to get game grid" });
          return;
        }

        // Process the solution in the service worker context
        (async () => {
          try {
            // Use the singleton instance we created at startup
            const solver = await gameRegistry.getSolver(gameType);
            const solutionGrid = await solver.solve(response.grid);

            // Send the solution back to the page to execute moves
            chrome.tabs.sendMessage(tabs[0].id, {
              action: "executeSolution",
              solution: solutionGrid,
            });

            // Also respond to the popup
            sendResponse({ success: true });
          } catch (error) {
            console.error("Error solving game:", error);
            sendResponse({ error: error.message });
          }
        })();
      }
    );
  });

  // Keep the messaging channel open for the async response
  return true;
});
