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
        if (this.currentValue !== '') {
            this.numbers.push(this.currentValue);
        }
    
        if (this.numbers.length === 0) return;
    
        // First, handle multiplication and division (higher precedence)
        for (let i = 0; i < this.operators.length; i++) {
            if (this.operators[i] === '*' || this.operators[i] === '/') {
                const result = this.operate(this.operators[i], parseFloat(this.numbers[i]), parseFloat(this.numbers[i + 1]));
                this.numbers.splice(i, 2, result); // Replace the two numbers with the result
                this.operators.splice(i, 1); // Remove the operator
                i--; // Adjust the index to account for the removed operator
            }
        }
    
        // Then handle addition and subtraction
        let result = parseFloat(this.numbers[0]); // Start with the first number
        for (let i = 0; i < this.operators.length; i++) {
            result = this.operate(this.operators[i], result, parseFloat(this.numbers[i + 1]));
        }
    
        this.currentValue = result.toString();
        this.numbers = [];
        this.operators = [];
        this.updateDisplay();
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
