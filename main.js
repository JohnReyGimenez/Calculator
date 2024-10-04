class Calculator {
    constructor() {
        this.currentValue = '';
        this.operator = null;
        this.numbers = [];
        this.operators = [];
    }

    handleNumber(num) {
        this.currentValue += num;
        this.updateDisplay();
    }

    handleOperator(op) {
        if (this.currentValue === '' && this.numbers.length === 0) return;
        if (this.operators.length > 0 && this.currentValue === '') {
            this.operators[this.operators.length - 1] = this.convertOperator(op);
            this.updateDisplay();
            return;
        }
        
        this.numbers.push(this.currentValue);
        this.operators.push(this.convertOperator(op));
        this.currentValue = '';
        this.updateDisplay();
    }
    
    // convert x and ÷ for calculation
    convertOperator(op) {
        if (op === 'x') return '*';
        if (op === '÷') return '/';
        return op;
    }

    calculate() {
        if (this.currentValue !== '') {
            this.numbers.push(this.currentValue);
        }
        if (this.numbers.length === 0) return;
    
        // First pass: Handle '*' and '/'
        for (let i = 0; i < this.operators.length; i++) {
            const operator = this.operators[i];
            if (operator === '*' || operator === '/') {
                const result = this.operate(operator, parseFloat(this.numbers[i]), parseFloat(this.numbers[i + 1]));
                this.numbers[i] = result;
                this.numbers.splice(i + 1, 1);
                this.operators.splice(i, 1);
                i--;  
            }
        }
    
        // Second pass: Handle '+' and '-'
        let result = parseFloat(this.numbers[0]);
        for (let i = 0; i < this.operators.length; i++) {
            const operator = this.operators[i];
            result = this.operate(operator, result, parseFloat(this.numbers[i + 1]));
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
        if (number2 === 0) return NaN;
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
                return number1;
        }
    }

    updateDisplay() {
        let displayValue = '';

        for (let i = 0; i < this.numbers.length; i++) {
            displayValue += this.numbers[i];
            if (this.operators[i]) {
                displayValue += this.convertForDisplay(this.operators[i]);
            }
        }

        if (this.currentValue !== '') {
            displayValue += this.currentValue;
        }

        document.querySelector("#display").value = displayValue;
    }

    // convert * & / back
    convertForDisplay(op) {
        if (op === '*') return 'x';
        if (op === '/') return '÷';
        return op;
    }

    clear() {
        this.currentValue = '';
        this.numbers = [];
        this.operators = [];
        document.querySelector("#display").value = '';
    }

    back() {
        if (this.currentValue.length > 0) {
            this.currentValue = this.currentValue.splice(0, -1);
            this.updateDisplay();
        }
    }
}

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

    document.querySelector(".clear").addEventListener("click", function() {
        calculator.clear(); 
    });

    document.querySelector(".back").addEventListener("click", function {
        calculator.back
    })
});

