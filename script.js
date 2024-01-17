let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let mustResetScreen = false

const numpad = document.querySelector(".calc_numpad")
const display_last = document.querySelector(".calc_op_last")
const display_current = document.querySelector(".calc_op_current")
const numButtons = document.querySelectorAll(".num-btn")
const opButtons = document.querySelectorAll(".operator-btn")
const clearButton = document.querySelector(".clear-btn")
const delButton = document.querySelector(".del-btn")

// numpad.addEventListener("click", (e) => Calc.calculate(e))
clearButton.addEventListener('click', clearScreen)
delButton.addEventListener('click', delNumber)

numButtons.forEach((button) => button.addEventListener('click',() => addNum(button.textContent)))
opButtons.forEach((button) => button.addEventListener('click', () => operate(button.textContent)))

function addNum(number) {
    if (display_current.textContent === "0" || mustResetScreen) resetScreen()
    display_current.textContent += number
}

function resetScreen () {
    display_current.textContent = ''
    mustResetScreen = false

}

function clearScreen () {
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
    display_current.textContent = 0
    display_last.textContent = ''
}

function delNumber () {
    display_current.textContent = display_current.textContent.slice(0, -1)
}

function operate(operator) {
    if (currentOperation !== null) evaluate() 
}
