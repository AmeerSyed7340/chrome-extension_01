let latestHighlight = null; // Store the latest highlighted text
const highlightBytab = new Map(); // map ds to store each tab by id

//listen for messages
chrome.runtime.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
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
  //LISTEN FROM POPUP
  if (request.action === "getHighlight") {
    (async ()=>{
      const [activeTab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });

      //get the tabId
      const tabID = activeTab.id;
      const tabHighlight = highlightBytab.get(tabID) || "Nothing highlighted yet";
      sendResponse({text: tabHighlight});
    })();
    

    // try {
    //   // Fetch the active tab's ID
    //   const activeTab = await chrome.tabs.query({
    //     active: true,
    //     lastFocusedWindow: true,
    //   });

    //   console.log("Active Tab:", activeTab);

    //   if (activeTab) {
    //     const tabId = activeTab.id; // Extract the tabId
    //     const uniqueHighlight = highlightBytab.get(tabId) || "No highlight yet";

    //     console.log("Before sendResponse");
    //     // Send latest highlight back to popup as response
    //     sendResponse({ text: 'helo' });

    //     console.log("After sendResponse");

    //   } else {
    //     console.error("No active tab found");
    //     sendResponse({ text: "Unable to determine active tab" });
    //   }
    // } catch (error) {
    //   console.error("Error fetching active tab:", error);
    //   sendResponse({ text: "An error occurred while fetching the highlight." });
    // }
  }
  return true; // Ensure async responses are allowed
});

//listen for when a tab is closed
chrome.tabs.onRemoved.addListener((tabId, {})=>{
  if(highlightBytab.has(tabId)){
    highlightBytab.delete(tabId);
  }  
});