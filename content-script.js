let gameRegistry;

(async () => {
  try {
    const registryModule = await import(
      chrome.runtime.getURL("core/GameRegistry.js")
    );
    gameRegistry = new registryModule.GameRegistry();
    console.log("LinkedIn Game Solver initialized");
  } catch (error) {
    console.error("Failed to initialize LinkedIn Game Solver:", error);
  }
})();

function handleGetGameGrid(request, sendResponse) {
  if (!gameRegistry) {
    sendResponse({ error: "GameRegistry not initialized" });
    return false;
  }

  try {
    const gameParser = gameRegistry.getParser(request.gameType);
    const gameGrid = gameParser.parse(document.documentElement.outerHTML);

    sendResponse({ grid: gameGrid });
  } catch (error) {
    sendResponse({ error: error.message });
  }

  return true;
}

function handleExecuteSolution(request, sendResponse) {
  (async () => {
    try {
      console.log("Executing solution:", request.solution, request.gameType);
      // TODO: Implement code to make the moves on the page
      // This would involve clicking on cells based on the solution

      // For now, just acknowledge
      sendResponse({ success: true });
    } catch (error) {
      console.error("Error executing solution:", error);
      sendResponse({ error: error.message });
    }
  })();

  return true;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getGameGrid") {
    return handleGetGameGrid(request, sendResponse);
  }

  if (request.action === "executeSolution") {
    return handleExecuteSolution(request, sendResponse);
  }

  return false;
});
