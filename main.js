class Calculator {
    constructor() {
        this.currentValue = '';
        this.previousValue = '';
        this.operator = null;
        this.numbers = [];
        this.operators = [];
    }

    handleNumber(num) {
        this.currentValue += num;
        this.updateDisplay();
    }

    handleOperator(op) {
        if (this.currentValue === '' && this.numbers.length === 0) {
            return;
        }

        if (this.operators.length > 0 && this.currentValue === '') {
            this.operators[this.operators.length - 1] = op;
            this.updateDisplay();
            return;
        }
        
        this.numbers.push(this.currentValue);
        this.operators.push(op);
        this.currentValue = '';
        this.updateDisplay();
    }

    calculate() {

    if (this.currentValue !== '') {
        this.numbers.push(this.currentValue);
    }

    if (this.numbers.length === 0) return;

    let result = parseFloat(this.numbers[0]);

    for (let i = 0; i < this.operators.length; i++) {
        const operators = this.operators[i];
        const nextNumber = parseFloat(this.numbers[i + 1]);

        switch(operators) {
            case '+':
                result += nextNumber;
                break;
            case '-':
                result -= nextNumber;
                break;
            case '*':
                result *= nextNumber;
                break;
            case '/':
                result /= nextNumber;
                break;
        }
        this.currentValue = result.toString();
        this.numbers = [];
        this.operators = [];
    }
    }

    updateDisplay() {
        let displayValue = '';

        for (let i = 0; i < this.numbers.length; i++) {
            displayValue += this.numbers[i];

            if (this.operators[i]) {
                displayValue += this.operators[i];
            }
        }

        if (this.currentValue != '') {
            displayValue += this.currentValue;
        }
        
        document.querySelector("#display").value = displayValue;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const calculator =  new Calculator();

    let numbers = document.querySelectorAll(".number");
    let operator = document.querySelectorAll(".operator");

    numbers.forEach((number) => number.addEventListener("click", function(e) {
        calculator.handleNumber(e.target.textContent);
        console.log("Button clicked:", e.target.textContent);
        })
    );

    operator.forEach((operator => operator.addEventListener("click", function(e) {
        calculator.handleOperator(e.target.textContent);
        console.log("Button clicked:", e.target.textContent);
    })))
    
})

