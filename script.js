Calc = new Calculator;
numpad = document.querySelector('.calc_numpad');

numpad.addEventListener('click',Calc.calculate)




function Calculator() {
    
    this.methods = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b
    };

    this.calculate = function(e) {
        console.log(e.srcElement.textContent)

    }
}