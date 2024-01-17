Calc = new Calculator();

const numpad = document.querySelector(".calc_numpad");
const display_last = document.querySelector(".calc_op_last");
const display_current = document.querySelector(".calc_op_current");

numpad.addEventListener("click", (e) => Calc.calculate(e));

function Calculator() {
    const op = ["+", "-", "*", "÷"];
    let a = "0";
    let b = "";
    let result = 0;
    let stored_op = "";

    this.methods = {
        "+": (a, b) => a + b,
        "-": (a, b) => b - a,
        "*": (a, b) => a * b,
        "÷": (a, b) => b / a,
    };

    this.calculate = function (e) {
        let btn_input = e.srcElement.textContent;

        if (btn_input == "Delete") {
            a = a.slice(0, -1);
            display_current.textContent = a;
        }

        if (btn_input.includes("Clear")) {
            a = "0";
            b = "";
            display_last.textContent = "";
            display_current.textContent = "0";
        }

        if (
            !op.includes(btn_input) &&
            btn_input != "Clear" &&
            btn_input != "Delete" && btn_input != '='
        ) {
            // if (a == "0" && btn_input != ".") a = '';
            a += btn_input;
            display_current.textContent = a;
        }

        if (btn_input == "=" && a != "" && b != "" && stored_op != "=") {
            display_last.textContent = b + stored_op + a + btn_input;
            b = this.methods[stored_op](+a, +b);
            display_current.textContent = b;
            stored_op = "=";
            a = b;
        }

        if (op.includes(btn_input)) {
            if (b == '' || stored_op == "=") {
                stored_op = btn_input;
                b = a;
                a = "";
                display_current.textContent = b;
                display_last.textContent = b + stored_op;
            }

            if (btn_input != "=" && (b != "") & (a != "")) {
                b = this.methods[stored_op](+a, +b);
                a = "";
                display_last.textContent = b + btn_input;
                display_current.textContent = b;
                stored_op = btn_input;
            }
        }
    };
}
