const textDiv = document.getElementById("popup-id");
const summarizeBtn = document.getElementById("btn-id");

summarizeBtn.addEventListener("click", () => {
  console.log("Clicked");
});

//Forward the message to popup.js
(async () => {
  try {
    const response = await chrome.runtime.sendMessage({
      action: "getHighlight",
    });
    //print out the returned response in service worker
    console.log(`Response in popup: ${response}`);

    if (response && response.text) {
      textDiv.textContent = response.text;
    } else {
      console.warn("No valid response received:", response);
      textDiv.textContent = "No highlight yet.";
    }
  } catch (error) {
    console.error("Error communicating with background script:", error);
    textDiv.textContent = "Error retrieving highlight.";
  }
})();
