//Popup trigger to remove duplicate clicks
let popupTriggered = false;

//function that handles the highlighted word alert.
function foo() {
  const selObj = window.getSelection().toString().trim();
  if (selObj != "") {
    console.log(selObj);
    
  }
}

// //function to create the separate pop up
// function createPopUp(textInput) {

//   //check if popup already exists
//   let existingPopup = document.getElementById("popup-div");

//   if (!existingPopup) {
//     //create a new div element
//     const newDiv = document.createElement("div");

//     //create a button for testing atm
//     const newBtn = document.createElement("button");

//     //apply the css class to the div and the ID
//     newDiv.className = "popup-style";
//     newDiv.id = "popup-div";

//     //set text content of new div to the input param
//     newDiv.textContent = textInput;

//     //apply css class to button
//     newBtn.className = "btn-style";
//     //set the name of the button
//     newBtn.textContent = "Summarize";
//     //what happens when the button is clicked
//     newBtn.addEventListener("click", (event)=>{
//       event.preventDefault();

//       // //stop the button click to re-trigger the foo via mouseup event
//       // event.stopPropagation();
//       console.log("Btn Clicked");
//     })

//     //append button to newDiv
//     newDiv.appendChild(newBtn);

//     //Append to the html body
//     document.body.appendChild(newDiv);

//     //add an event listener to remove the popup if clicked outside
//     document.addEventListener("click", handleClickOutsidePopup);
//   } else {
//     //If the popup already exists then update its content
//     existingPopup.textContent = textInput;
//   }
// }

// //event handler for clicking outside the popup
// function handleClickOutsidePopup(event) {
//   const popup = document.getElementById("popup-div");
//   if (popup && !popup.contains(event.target)) {
//     // Click happened outside the popup, so remove it
//     popup.remove();

//     // Remove this event listener to avoid unnecessary calls
//     document.removeEventListener("click", handleClickOutsidePopup);
//   }
// }

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