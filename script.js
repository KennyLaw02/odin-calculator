// Whether the content in display is an expression result or not
let isResult = false;
// Toggles when another decimal point can be placed.
let isDecimaled = false;

// Toggles whether an operator has just been placed
// to disable letting another operator to be placed
// NOTE: It starts off as true to disable operators
// being allowed to be placed at the BEGINNING
let isOpPlaced = true;
// Buttons change colour when hovered over
function onNumClick(event) {
    let button = event.target;
    const display = document.querySelector(".textBox");
    // Check if content is a result. If so, clear display
    if (isResult) {
        display.textContent = ""
        isResult = false;
    }
    display.textContent += button.textContent;
    isOpPlaced = false;
}

function onOpClick(event) {
    let button = event.target;
    const display = document.querySelector(".textBox");
    if (!isOpPlaced) {
        display.textContent += " " + button.textContent + " ";
        isDecimaled = false;
        isOpPlaced = true;
    }
}

function onPeriodClick() {
    const display = document.querySelector(".textBox");
    if (!isDecimaled) {
        // Check if content is a result. If so, clear display
        if (isResult) {
            display.textContent = ""
            isResult = false;
        }
        display.textContent += ".";
        isDecimaled = true;
    }
}

const btns = document.querySelectorAll("button");
btns.forEach((button) => {
    // When mouse hovers over button
    // Invert text and bg colors
    button.addEventListener("mouseover", () => {
        button.style.backgroundColor = "#f9faf8";
        button.style.color = "#3882f6";
    });
    // When mouse hovers off button
    // Return to default button colors
    button.addEventListener("mouseout", () => {
        button.style.backgroundColor = "#3882f6";
        button.style.color = "#f9faf8";
    });
    let btnType = button.className;
    if (btnType === "number") {
        button.addEventListener("click", onNumClick);
    } else if (btnType === "operator") {
        button.addEventListener("click", onOpClick);
    } else if (btnType === "period") {
        button.addEventListener("click", onPeriodClick);
    }
});

// Clear button clears input display
const clrBtn = document.getElementById("clrBtn");
// Remove the general click behaviour and override it
// with appropriate clear behaviour
clrBtn.addEventListener("click", () => {
    const display = document.querySelector(".textBox");
    display.textContent = "";
});

// Equals button will evaluate the expression
const eqBtn = document.getElementById("eqBtn");
// Override general click behaviour with equal behaviour
eqBtn.addEventListener("click", () => {
    const display = document.querySelector(".textBox");
    display.textContent = evaluateExpr(display.textContent);
});

function performOp(a, operator, b) {
    a = parseFloat(a)
    b = parseFloat(b)
    switch (operator) {
        case '+':
            return a + b
            break;
        case '-':
            return a - b
            break;
        case '×':
            return a * b
            break;
        case '÷':
            if (b === 0) {
                return NaN;
            }
            return a / b
            break;
        default:
            break;
    }
}

function evaluateExpr(expressionStr) {
    // Tokenize string to its numbers and operators
    let expressionArr = expressionStr.split(" ");

    // If last token is an operator, split will make an
    // empty string as last element. Do nothing and warn
    // the user of syntax error
    const lastExpr = expressionArr[expressionArr.length - 1]
    if (lastExpr === '') {
        const errBox = document.querySelector('.errorBox')
        errBox.textContent = "ERROR: Incorrect syntax!"
        return expressionStr
    }
    // Since numPad logic guarantees correct expression
    // we'll work under that assumption
    let result = expressionArr.shift()
    // Do a 'reduce' taking in 2 elements at a time
    while(expressionArr.length !== 0) {
        const operator = expressionArr.shift()
        const b = expressionArr.shift()
        result = performOp(result, operator, b)
        console.log(`Got ${result}`)
        // If a division by zero occured, error.
        if (isNaN(result)) {
            result = 'ERR: division by zero!';
            break;
        }
    }
    // Reset all toggles to initial states
    isDecimaled = false;
    isOpPlaced = true;
    isResult = true;
    return result;
}
