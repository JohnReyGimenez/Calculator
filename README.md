# Calculator

A simple, Ubuntu-style calculator built with HTML, CSS, and JavaScript. It features keyboard support, history tracking, and percentage functionality.

## Features

- **Keyboard Support**: Perform calculations using your keyboard.
- **History Tracking**: Keeps a history of recent calculations.
- **Percentage Functionality**: Easily calculate percentages.
- **User-Friendly UI**: Inspired by Ubuntu's calculator design.

## Accessing the Calculator

To use the calculator, visit: [johnreygimenez.github.io/Calculator/](https://johnreygimenez.github.io/Calculator/)

## Known Issues

- **Operator Replacement Bug**: When entering an operator and replacing it without a number in between, the replacement is not always handled correctly.
- **History Overflow**: The history does not clear after 10 entries, causing UI overflow.
- **Backspace Behavior**: Pressing backspace after entering an operator sometimes removes the last number instead of the operator.
- **Decimal Input**: Multiple decimal points can be entered under certain conditions.
- **Division by Zero**: Results in `NaN` instead of a proper error message.

## Optimizations

- Improved UI alignment and responsiveness.
- Enhanced input validation to prevent invalid operations.
- Better handling of operator changes and calculation sequences.

## License

This project is open-source and available under the MIT License.
