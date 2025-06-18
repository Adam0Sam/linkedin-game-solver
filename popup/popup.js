function init() {
  const readBtn = document.getElementById("readBtn");

  readBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "solveGame" });
  });
}

document.addEventListener("DOMContentLoaded", init);
