//Popup trigger to remove duplicate clicks
let popupTriggered = false;

//function that handles the highlighted word alert.
function foo() {
  const selObj = window.getSelection().toString().trim();
  if (selObj) {
    console.log("Highlighted text:", selObj);

    //message passing api - single message
    (async () => {
      const response = await chrome.runtime.sendMessage({ action: "highlight", text: selObj });

      // do something with "response" here, not outside the function
      console.log(response);
    })();
   
  }
}

//simply call the function after a certain time
document.addEventListener("mouseup", () => {
  if (!popupTriggered) {
    popupTriggered = true;
    setTimeout(() => {
      foo();
      setTimeout(() => {
        popupTriggered = false;
      }, 100);
    }, 500);
  }
});
