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
        document.querySelector("#display").value = this.currentValue
    }

    handleOperator(op) {
        if (this.currentValue === '' && this.numbers.length === 0) {
            return;
        }

        if (this.operators.length > 0 && this.currentValue === '') {
            this.operators[this.operators.length - 1] = op;
            return;
        }
        
        this.numbers.push(this.currentValue);
        this.operators.push(op);
        this.currentValue = '';

        document.querySelector("#display").value = this.numbers.join('') + this.operators.join(' ');
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
}

document.addEventListener("DOMContentLoaded", function() {
    const calculator =  new Calculator();

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

