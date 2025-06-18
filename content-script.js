let gameRegistry;

(async () => {
  try {
    const registryModule = await import(
      chrome.runtime.getURL("core/GameRegistry.js")
    );
    gameRegistry = registryModule.GameRegistry.getInstance();
  } catch (error) {
    console.error("Failed to initialize LinkedIn Game Solver:", error);
  }
})();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action !== "getGameData") return false; // Not handling this action

  if (!gameRegistry) {
    sendResponse({ error: "GameRegistry not initialized" });
    return false;
  }

  (async () => {
    try {
      const gameParser = gameRegistry.getParser(request.gameType);

      const gameData = await gameParser.parseHtml(
        document.documentElement.outerHTML
      );

      sendResponse(gameData);
    } catch (error) {
      console.error("Error processing game data:", error);
      sendResponse({ error: error.message });
    }
  })();

  return true; // Keep the message channel open for the async response

  return true;
});
