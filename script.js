const butNums = document.querySelectorAll("#main-buttons #butNum");
const butOps = document.querySelectorAll("#main-buttons #butOp");
const screenNum = document.querySelector("#screen-number");
const screenOp = document.querySelector("#screen-operand");
const clearButton = document.querySelector("#clear-button");
clearButton.addEventListener("click", () => {
  screenNum.textContent = "";
  screenOp.textContent = "";
});
let operandFlag = false; //allows clearing number-screen after inserting operand
let numberFlag = false; //prevents of inserting operand if there is no number inserted

butNums.forEach((button) =>
  button.addEventListener("click", () => insertNum(button.textContent))
);
butOps.forEach((button) =>
  button.addEventListener("click", () => insertOp(button.textContent))
);

function insertNum(str) {
  if (operandFlag === true) screenNum.textContent = "";
  screenNum.textContent += str;
  operandFlag = false;
  numberFlag = true;
}

function insertOp(str) {
  if (numberFlag === true) {
    screenOp.textContent = str;
    operandFlag = true;
    numberFlag = false;
  }
}

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b !== 0) {
    return a / b;
  } else {
    return "error";
  }
}
