export class calculator {
    constructor() {
        this.currentValue = '';
        this.previousValue = '';
        this.operator = null;
        this.numbers = [];
        this.operators = [];
    }

    handleNumber(num) {
        this.currentValue += num;
    }

    handleOperator(op) {
        this.numbers.push(this.currentValue);
        this.numbers.push(op);
        this.currentValue = '';
    }

    calculate() {

    }
}

document.addEventListener("DOMContentLoaded", function() {
    const calculator =  new calculator();

    let numbers = document.querySelectorAll(".number");
    let operator = document.querySelectorAll(".operator");

    let display = document.querySelector(".display");

    numbers.forEach((number) => number.addEventListener("click", function(e) {
        calculator.handleNumber(e.target.textContent);
        document.querySelector("#display").textContent = calculator.currentValue;
        })
    );

    numbers.forEach((operator => operator.addEventListener("click", function(e) {
        calculator.handleOperator(e.target.textContent)
    })))
})
