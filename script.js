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
window.addEventListener("keydown", keyBoardSupport);

numButtons.forEach((button) =>
    button.addEventListener("click", () => addNum(button.textContent))
);
opButtons.forEach((button) =>
    button.addEventListener("click", () => operate(button.textContent))
);

function addNum(number) {
    if (display_current.textContent === "0" || mustResetScreen) resetScreen();
    if (display_current.textContent.length >= 12) return;
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
    secondOperand = display_current.textContent;
    if (currentOperation === null || mustResetScreen) return;
    if (currentOperation == "÷" && secondOperand === "0") {
        display_current.textContent = "Error";
        return;
    }
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
    if (operator == "/") return "÷";
    if (operator == "x") return "*";
    if (operator == "*") return "x";
    return operator;
}
function evaluate(operator, firstOperand, secondOperand) {
    a = Number(firstOperand);
    b = Number(secondOperand);
    switch (operator) {
        case "+":
            return eNotation(a + b);
        case "-":
            return eNotation(a - b);
        case "*":
            return eNotation(a * b);
        case "/":
            if (b === 0) return null;
            else return eNotation(a / b);

        default:
            return null;
    }
}

function eNotation(num) {
    if (String(num).includes("e")) return num;
    let string = String(num);
    let beforePoint = "";
    let afterPoint = "";
    if (string.length > 12) {
        beforePoint = string.slice(0, 1);
        afterPoint = string.slice(1);
        if (afterPoint.includes(".")) {
            beforePoint += ".";
            a = beforePoint + afterPoint.replace(".", "");
            b = afterPoint.indexOf(".");
        } else {
            beforePoint += ".";
            a = beforePoint + afterPoint;
            b = afterPoint.length;
        }
        return `${Number(a)}e${b}`;
    }
    return num;
}

function keyBoardSupport(e) {
    numButtons.forEach((button) => {
        if (button.textContent == e.key) addNum(e.key);
    });
    opButtons.forEach((button) => {
        if (button.textContent == convertOperator(e.key))
            operate(convertOperator(e.key));
    });
    if (e.key == "Backspace" || e.key == "Delete") delNumber();
    if (e.key == "Enter" || e.key == "=") calculate();
    if (e.key == "Escape") clearScreen();
    if (e.key == ".") addPoint();
}
