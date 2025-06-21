let gameRegistry;

(async () => {
  try {
    const registryModule = await import(
      chrome.runtime.getURL("core/StaticGameRegistry.js")
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
    const doc = gameParser.toDoc(document.documentElement.outerHTML);
    const gameGrid = gameParser.parseToCells(doc);

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
      console.log("Executing solution for game type:", request.gameType);
      executor.execute(document.documentElement.outerHTML, request.solution);
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
    console.log("Received getGameGrid request:", request);
    return handleGetGameGrid(request, sendResponse);
  }

  if (request.action === "executeSolution") {
    console.log("Received executeSolution request:", request);
    return handleExecuteSolution(request, sendResponse);
  }

  return false;
});
