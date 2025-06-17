function init() {
  const readBtn = document.getElementById("readBtn");
  const htmlOutput = document.getElementById("htmlOutput");

  readBtn.addEventListener("click", () => {
    console.log("Read button clicked");
    chrome.runtime.sendMessage({ action: "solveGame" }, (response) => {
      console.log("Response received:", response);
    });
  });
}

document.addEventListener("DOMContentLoaded", init);
