Calc = new Calculator();

const numpad = document.querySelector(".calc_numpad");
const display_last = document.querySelector(".calc_op_last");
const display_current = document.querySelector(".calc_op_current");

numpad.addEventListener("click", (e) => Calc.calculate(e));

function Calculator() {
    const op = ["+", "-", "*", "/", "="];
    let a = "";
    let b = "";
    let result = 0;
    let stored_op;

    this.methods = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
    };

    this.calculate = function (e) {
        let btn_input = e.srcElement.textContent;

        if (btn_input == "Delete") {
            a = a.slice(0,-1);
            display_current.textContent = a;
        }

        if (
            !op.includes(btn_input) &&
            btn_input != "Clear" &&
            btn_input != "Delete"
        ) {
            a += btn_input;
            display_current.textContent = a;
        }

        if (op.includes(btn_input)) {
            if (b == "") {
                b = a;
                a = "";
                display_last.textContent = b + btn_input;
                display_current.textContent = b;
                stored_op = btn_input;
            } else if (btn_input == "+") {
                b = this.methods[btn_input](+a, +b);
                a = "";
                display_last.textContent = b + btn_input;
                display_current.textContent = b;
            } else if (btn_input == "-") {
                b = this.methods[btn_input](+a, +b);
                a = "";
                display_last.textContent = b + btn_input;
                display_current.textContent = b;
            } else if (btn_input == "*") {
                b = this.methods[btn_input](+a, +b);
                a = "";
                display_last.textContent = b + btn_input;
                display_current.textContent = b;
            } else if (btn_input == "/" || btn_input == "÷") {
                b = this.methods[btn_input](+a, +b);
                a = "";
                display_last.textContent = b + btn_input;
                display_current.textContent = b;
            } else if (btn_input == "=") {
                console.log(stored_op);
                display_last.textContent = b + stored_op + a + btn_input;
                b = this.methods[stored_op](+a, +b);
                a = "";
                display_current.textContent = b;
            }
        }

        if (btn_input.includes("Clear")) {
            a = "";
            b = "";
            display_last.textContent = "";
            display_current.textContent = "0";
        }
    };
};
