//global flag to ensure popup doesnt trigger more than once each iteration
let popupTriggered = false;

//function that handles the highlighted word alert.
function foo() {
  const selObj = window.getSelection().toString().trim();
  if (selObj != "") {
    alert(selObj);
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
