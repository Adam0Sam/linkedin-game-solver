chrome.runtime.onMessage.addListener((request) => {
  if (request.action !== "solveGame") return;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const gameType = new URL(tabs[0].url).pathname.split("/")[2];

    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "getGameGrid", gameType: gameType },
      (response) => {
        console.log("Game grid received:", response);
      }
    );
  });
});
