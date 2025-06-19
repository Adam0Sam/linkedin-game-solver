let gameRegistry;

(async () => {
  try {
    console.log;
    const registryModule = await import(
      chrome.runtime.getURL("core/GameRegistry.js")
    );
    gameRegistry = registryModule.GameRegistry.getInstance();
  } catch (error) {
    console.error("Failed to initialize LinkedIn Game Solver:", error);
  }
})();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action !== "getGameGrid") return false;

  if (!gameRegistry) {
    sendResponse({ error: "GameRegistry not initialized" });
    return false;
  }

  (async () => {
    try {
      const gameParser = await gameRegistry.getParser(request.gameType);
      console.log("gameParser", gameParser);
      const gameGrid = await gameParser.extractGameGridFromHtml(
        document.documentElement.outerHTML
      );

      sendResponse(gameGrid);
    } catch (error) {
      console.error("Error processing game data:", error);
      sendResponse({ error: error.message });
    }
  })();

  return true;
});
