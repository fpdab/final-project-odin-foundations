//get selectors
const butNums = document.querySelectorAll("#main-buttons #butNum");
const butOps = document.querySelectorAll("#main-buttons #butOp");
const screenNum = document.querySelector("#screen-number");
const screenOp = document.querySelector("#screen-operand");
const evaluateButton = document.querySelector("#eval-button");
const clearButton = document.querySelector("#clear-button");
const allButtons = document.querySelectorAll(
  "#clear-button, #butNum, #butOp, #eval-button"
);

//variables
let operandFlag = false; //allows clearing number-screen after inserting operand
let numberFlag = false; //prevents of inserting operand if there is no number inserted
let mainQueue = [];
let currentNumber = "";
let currentOp = "";
let finalQueue = [];

//eventlisteners
allButtons.forEach((button) => {
  button.addEventListener(
    "mousedown",
    () => (button.style.border = "1px solid")
  );
  button.addEventListener("mouseup", () => (button.style.borderStyle = null));
});

clearButton.addEventListener("click", clearAll);

evaluateButton.addEventListener("click", evaluateQueue);

butNums.forEach((button) => {
  button.addEventListener("click", () => insertNum(button.textContent));
});

butOps.forEach((button) => {
  button.addEventListener("click", () => insertOp(button.textContent));
});

//calc functions
function calcAdd(a, b) {
  return Number(a) + Number(b);
}
function calcSubtract(a, b) {
  return Number(a) - Number(b);
}
function calcMultiply(a, b) {
  return Number(a) * Number(b);
}
function calcDivide(a, b) {
  if (Number(b) !== 0) {
    return Number(a) / Number(b);
  } else {
    return "error";
  }
}

//program logic functions
function clearAll() {
  currentNumber = "";
  mainQueue = [];
  screenNum.textContent = "";
  screenOp.textContent = "";
}

function insertNum(str) {
  if (operandFlag === true) screenNum.textContent = "";
  screenNum.textContent += str;
  operandFlag = false;
  numberFlag = true;
}

function insertOp(str) {
  if (numberFlag === true) {
    numberFlag = false;
    currentOp = str;
    screenOp.textContent = currentOp;
    addToQueue();
    mainQueue.push(currentOp);
    operandFlag = true;
  }
}

function getNumFromScreen() {
  currentNumber = screenNum.textContent;
  return currentNumber;
}

function addToQueue() {
  if (operandFlag === false) {
    mainQueue.push(getNumFromScreen());
  } else {
    mainQueue.pop();
  }
}

function getFinalQueue() {
  finalQueue = mainQueue;
  clearAll();
}

function evaluateQueue() {
  addToQueue();
  getFinalQueue();
  let res = finalQueue[0];
  while (finalQueue.length > 1) {
    switch (finalQueue[1]) {
      case "+":
        res = calcAdd(res, finalQueue[2]);
        break;
      case "-":
        res = calcSubtract(res, finalQueue[2]);
        break;
      case "*":
        res =
          Math.round(calcMultiply(res, finalQueue[2]) * 10000000000) /
          10000000000;
        break;
      case "/":
        res =
          Math.round(calcDivide(res, finalQueue[2]) * 10000000000) /
          10000000000;
        break;
    }
    finalQueue.splice(0, 2);
  }
  screenNum.textContent = res;
  operandFlag = true;
}
