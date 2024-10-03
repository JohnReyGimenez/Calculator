class Calculator {
    constructor() {
        this.currentValue = '';
        this.operator = null;
        this.numbers = [];
        this.operators = [];
    }

    // Handles number input and updates the display
    handleNumber(num) {
        this.currentValue += num;
        this.updateDisplay();
    }
    
    // Handles operator input and stores values/operators
    handleOperator(op) {
        if (this.currentValue === '' && this.numbers.length === 0) return;
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

    // Perform calculations on the array of numbers and operators
    calculate() {
        if (this.currentValue !== '') {
            this.numbers.push(this.currentValue);
        }
        if (this.numbers.length === 0) return;

        let result = parseFloat(this.numbers[0]);

        for (let i = 0; i < this.operators.length; i++) {
            const operator = this.operators[i];
            const nextNumber = parseFloat(this.numbers[i + 1]);
            const previousResult = result;

            result = this.operate(operator, result, nextNumber);  // Replaced with the operate method
            console.log(`${previousResult} ${operator} ${nextNumber} = ${result}`);
             
        }

        this.currentValue = result.toString();
        this.numbers = [];
        this.operators = [];
        this.updateDisplay();
    }

    add(number1, number2) {
        return parseFloat(number1) + parseFloat(number2);
    }

    subtract(number1, number2) {
        return parseFloat(number1) - parseFloat(number2);
    }   

    multiply(number1, number2) {
        return parseFloat(number1) * parseFloat(number2);
    }

    divide(number1, number2) {
        if (number2 === 0) return 'Error';
        return parseFloat(number1) / parseFloat(number2);
    }


    operate(operator, number1, number2) {
        switch (operator) {
            case '*':
                return this.multiply(number1, number2);
            case '/':
                return this.divide(number1, number2);
            case '+':
                return this.add(number1, number2);
            case '-':
                return this.subtract(number1, number2);
            default:
                return number1;  // Return the first number if no operator matches
            
        }
    }

    // Update the display on the calculator
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

// Event listeners for number, operator, and equals buttons
document.addEventListener("DOMContentLoaded", function() {
    const calculator = new Calculator();

    let numbers = document.querySelectorAll(".number");
    numbers.forEach((number) => number.addEventListener("click", function(e) {
        calculator.handleNumber(e.target.textContent);
    }));

    let operators = document.querySelectorAll(".operator");
    operators.forEach((operator) => operator.addEventListener("click", function(e) {
        calculator.handleOperator(e.target.textContent);
    }));

    document.querySelector(".equals").addEventListener("click", function() {
        calculator.calculate();
    });
});
