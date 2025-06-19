function init() {
  const readBtn = document.getElementById("readBtn");

  readBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "solveGame" }, (response) => {
      console.log("Response from service worker:", response);
    });
  });
}

document.addEventListener("DOMContentLoaded", init);
