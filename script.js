let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let mustResetScreen = false;

const numpad = document.querySelector(".calc_numpad");
const display_last = document.querySelector(".calc_op_last");
const display_current = document.querySelector(".calc_op_current");
const numButtons = document.querySelectorAll(".num-btn");
const opButtons = document.querySelectorAll(".operator-btn");
const clearButton = document.querySelector(".clear-btn");
const delButton = document.querySelector(".del-btn");
const calcButton = document.querySelector(".calculate-btn");
const pointButton = document.querySelector(".point-btn");

// numpad.addEventListener("click", (e) => Calc.calculate(e))
clearButton.addEventListener("click", clearScreen);
delButton.addEventListener("click", delNumber);
calcButton.addEventListener("click", calculate);
pointButton.addEventListener("click", addPoint);
window.addEventListener('keydown', keyBoardSupport);

numButtons.forEach((button) =>
    button.addEventListener("click", () => addNum(button.textContent))
);
opButtons.forEach((button) =>
    button.addEventListener("click", () => operate(button.textContent))
);

function addNum(number) {
    if (display_current.textContent === "0" || mustResetScreen) resetScreen();
    display_current.textContent += number;
}

function addPoint() {
    if (mustResetScreen) resetScreen();
    if (display_current.textContent === "") display_current.textContent = "0";
    if (display_current.textContent.includes(".")) return;
    display_current.textContent += ".";
}

function resetScreen() {
    display_current.textContent = "";
    mustResetScreen = false;
}

function clearScreen() {
    firstOperand = "";
    secondOperand = "";
    currentOperation = null;
    display_current.textContent = 0;
    display_last.textContent = "";
}

function delNumber() {
    display_current.textContent = display_current.textContent.slice(0, -1);
}

function operate(operator) {
    if (currentOperation !== null) calculate();
    firstOperand = display_current.textContent;
    currentOperation = operator;
    display_last.textContent = `${firstOperand} ${currentOperation}`;
    mustResetScreen = true;
}

function calculate() {
    if (currentOperation === null || mustResetScreen) return;
    if (currentOperation == "÷" && firstOperand === "0") {
        display_current.textContent = "Error";
        return;
    }
    secondOperand = display_current.textContent;
    display_current.textContent = evaluate(
        convertOperator(currentOperation),
        firstOperand,
        secondOperand
    );
    display_last.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
    currentOperation = null;
}
function convertOperator(operator) {
    if (operator == "÷") return "/";
    return operator;
}
function evaluate(operator, firstOperand, secondOperand) {
    a = Number(firstOperand);
    b = Number(secondOperand);
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            if (b === 0) return null;
            else return (a / b).toFixed(3);

        default:
            return null;
    }
}

function keyBoardSupport(e) {
    numButtons.forEach((button) => { if (button.textContent == e.key) addNum(e.key) })
    opButtons.forEach((button) => { if (button.textContent == e.key) operate(e.key) })
    if (e.key == 'Backspace' || e.key == 'Delete') delNumber()
    if (e.key == 'Enter' || e.key == '=') calculate()
    if (e.key == 'Escape') clearScreen()
}
