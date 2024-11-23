let latestHighlight = null; // Store the latest highlighted text
const highlightBytab = new Map(); // map ds to store each tab by id

//listen for messages
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "highlight") {
    console.log({ text: request.text, tabId: sender.tab?.id });

    if (sender.tab) {
      //store the latest highlight
      latestHighlight = request.text;

      //store the latestHighlight to the map with the tabId
      highlightBytab.set(sender.tab.id, request.text);

      sendResponse({ status: "Messages stored in background service-worker" });

      //iterate through the map using for..of loop
      for (const [key, value] of highlightBytab) {
        console.log(`key: ${key}, Value: ${value}`);
      }
    } else {
      console.error("Message does not originate from a tab.");
      sendResponse({ status: "Error: No tab associated with sender." });
    }
  }

  //listen from popup
  if (request.action === "getHighlight") {
    (async () => {
      try {
        const [activeTab] = await chrome.tabs.query({
          active: true,
          lastFocusedWindow: true,
        });

        //if no active tab found due to edge case scenarios
        if (!activeTab) {
          throw new Error("No active tab found.");
        }
        //get the tabId
        const tabID = activeTab.id;
        const tabHighlight =
          highlightBytab.get(tabID) || "Nothing highlighted yet";

        sendResponse({ text: tabHighlight });
      } catch (error) {
        console.error("Error in getHighlight handler in background.js:", error);
        sendResponse({ text: "Error retrieving highlighted text." });
      }
    })();
  }
  return true; // Ensure async responses are allowed
});

//listen for when a tab is closed
chrome.tabs.onRemoved.addListener((tabId, {}) => {
  deleteTabFromMap(tabId);
});

//listen for when a tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "loading") {
    deleteTabFromMap(tabId);
  }
});

//helper function to delete tab
function deleteTabFromMap(tabId) {
  if (highlightBytab.has(tabId)) {
    highlightBytab.delete(tabId);
  }
}
