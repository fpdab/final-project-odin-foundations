let butNums = document.querySelectorAll("#main-buttons #butNum");
let butOps = document.querySelectorAll("#main-buttons #butOp");
let screenNum = document.querySelector("#screen-number");
let screenOp = document.querySelector("#screen-operand");
let operandFlag = false;

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
}

function insertOp(str) {
  operandFlag = true;
  screenOp.textContent = str;
}
