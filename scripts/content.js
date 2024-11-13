function foo() {
  const selObj = window.getSelection().toString().trim();
  if (selObj != "") {
    alert(selObj);
  }
}

document.addEventListener("mouseup", () => {
  setTimeout(() => {
    foo();
  }, 1000);
});
