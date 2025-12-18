const result = document.querySelector("#result");
const firstNumber = document.querySelector("#first-number");
const secondNumber = document.querySelector("#second-number");
const add = document.querySelector("#add");
const sub = document.querySelector("#sub");
const mul = document.querySelector("#mul");
const div = document.querySelector("#div");

function setMethod(element, func) {
  element.addEventListener("click", (e) => {
    result.innerText = func(parseInt(firstNumber.value), parseInt(secondNumber.value));
    e.preventDefault();
  });
}

setMethod(add, (a, b) => a + b);
setMethod(sub, (a, b) => a - b);
setMethod(mul, (a, b) => a * b);
setMethod(div, (a, b) => a / b);
