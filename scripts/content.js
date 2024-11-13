//global flag to ensure popup doesnt trigger more than once each iteration
let popupTriggered = false;

//function that handles the highlighted word alert.
function foo() {
  const selObj = window.getSelection().toString().trim();
  if (selObj != "") {
    createPopUp(selObj);
  }
}

//function to create the separate pop up
function createPopUp(textInput) {
  //check if popup already exists
  let existingPopup = document.getElementById("popup-div");

  if (!existingPopup) {
    //create a new div element
    const newDiv = document.createElement("div");

    //give it content
    const divContent = document.createTextNode(textInput);

    //add the text node to the new div
    newDiv.appendChild(divContent);

    //apply the css class to the div and the ID
    newDiv.className = "popup-style";
    newDiv.id = "popup-div";

    //Append to the html body
    document.body.appendChild(newDiv);
  }
  else{
    //If the popup already exists then update its content
    existingPopup.textContent = textInput;
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
