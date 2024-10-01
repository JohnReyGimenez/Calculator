class Calculator {
    constructor() {
        this.currentValue = '';
        this.previousValue = '';
        this.operator = null;
        this.numbers = []; 
        this.operators = []; 
    }

    handleNumber(num) {
        this.currentValue += num; // appends the clicked number to the currentValue string
        this.updateDisplay(); 
    }
     
    handleOperator(op) {
        // prevent operator input if no number has been entered
        if (this.currentValue === '' && this.numbers.length === 0) {
            return;
        }

        // changes operator if an operator is pressed with no number
        if (this.operators.length > 0 && this.currentValue === '') {
            this.operators[this.operators.length - 1] = op; // Replace the last operator
            this.updateDisplay();
            return;
        }
        
        // add the current value to the numbers array and the operator to the operators array
        this.numbers.push(this.currentValue);
        this.operators.push(op);
        this.currentValue = ''; // resets currentValue for the next number input
        this.updateDisplay(); 
    }

    calculate() {
        // push the last entered number into the numbers array
        if (this.currentValue !== '') {
            this.numbers.push(this.currentValue);
        }

        if (this.numbers.length === 0) return;

        // first number becomes the starting point for calculation
        let result = parseFloat(this.numbers[0]);

        // iterate over operators array for calculation
        for (let i = 0; i < this.operators.length; i++) {
            const operator = this.operators[i]; // gets  current operator
            const nextNumber = parseFloat(this.numbers[i + 1]); // gets next number

            switch(operator) {
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
        }

        this.currentValue = result.toString();
        this.numbers = [];
        this.operators = [];
    }

    updateDisplay() {
        let displayValue = '';

        for (let i = 0; i < this.numbers.length; i++) {
            displayValue += this.numbers[i]; 
            if (this.operators[i]) { // if an operator exists, add it
                displayValue += this.operators[i];
            }
        }

        // add the currentValue (latest input) if it's not empty
        if (this.currentValue != '') {
            displayValue += this.currentValue;
        }

        document.querySelector("#display").value = displayValue;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const calculator = new Calculator();

    let numbers = document.querySelectorAll(".number");
    numbers.forEach((number) => number.addEventListener("click", function(e) {
        calculator.handleNumber(e.target.textContent); 
        console.log("Button clicked:", e.target.textContent); 
    }));

    let operator = document.querySelectorAll(".operator");
    operator.forEach((operator) => operator.addEventListener("click", function(e) {
        calculator.handleOperator(e.target.textContent); 
        console.log("Button clicked:", e.target.textContent); 
    }));

    document.querySelector(".equals").addEventListener("click", function(e) {
        console.log("Button clicked:", e.target.textContent); 
        console.log("result", calculator.calculate())
        calculator.calculate();
    });
});
