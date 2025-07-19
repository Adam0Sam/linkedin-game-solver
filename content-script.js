let gameRegistry;

(async () => {
  try {
    const registryModule = await import(
      chrome.runtime.getURL("./StaticGameRegistry.js")
    );
    gameRegistry = new registryModule.StaticGameRegistry();
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
    const gameGrid = gameParser.parseToGameCellGrid(document);

    sendResponse({ grid: gameGrid });
  } catch (error) {
    sendResponse({ error: error.message });
  }

  return true;
}

function handleExecuteSolution(request, sendResponse) {
  (async () => {
    try {
      const executor = gameRegistry.getExecutor(request.gameType);
      executor.execute(document, request.solution);
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
