chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action !== "getGameData") return;
  console.log("Content script received request for game data");
  sendResponse({ gameData: document.documentElement.outerHTML });
});
