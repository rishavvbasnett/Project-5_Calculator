function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
    if (num2===0) {
        return "Can't divide by zero!"
    } else {
        return Number(num1/num2)
    }
    
}

function percent(num1, num2) {
    return num1/100*num2
}

function exponent(num1, num2) {
    return Math.pow(num1, num2)
}


function operate(num1, operator, num2){
    switch (operator) {
        case "+":
            return add(num1, num2)
        case "-":
            return subtract(num1,num2)            
        case "×":
            return multiply(num1, num2)           
        case "÷":
            return divide(num1, num2)
        case "%":
            return percent(num1, num2)
        case "^":
            return exponent(num1, num2)
    }
}


let display = document.querySelector("#Display")
const allButtons = document.querySelectorAll("#mainContainer button")

let num1= ""
let num2= ""
let fullExpression = ""
let count = 0
let operator = ""
let answer = 0
let operatorCount = 0
let decimalCount = 0
let justCalculated = false

allButtons.forEach(button => button.addEventListener("click", e => {
    let buttonClicked = e.target.textContent
    
    if (justCalculated === true && "0123456789.".includes(buttonClicked)) {
        fullExpression = ""
        justCalculated = false
    }
    if (justCalculated === true && "+-×÷%^".includes(buttonClicked)) {
        justCalculated = false
    }

    if ("+-×÷%^".includes(buttonClicked)) {
        if (fullExpression === "") {

        } else {
            operatorCount++
        }    
    } 
    
    if ("."===buttonClicked) {
        decimalCount++
    }

    if (operatorCount === 2) {

        if (fullExpression[0]==="-") {
            fullExpression = fullExpression.substring(1)
            let parts = fullExpression.split(operator)
            if ("×÷%^".includes(operator) && parts[1]==="") {
                num1 = 0 - Number(parts[0])
                num2 = 1
            } else if ("%".includes(operator) && parts[1]==="") {
                num1 = 0 - Number(parts[0])
                num2 = 100
            }
            else {
                num1 = 0 - Number(parts[0])
                num2 = Number(parts[1])
            }
        } 
        else {
            let parts = fullExpression.split(operator)
            console.log(operator)
            console.log(parts)
            if ("×÷^".includes(operator) && parts[1]==="") {
                num1 = Number(parts[0])
                num2 = 1
            } else if ("%".includes(operator) && parts[1]==="") {
                num1 = Number(parts[0])
                num2 = 100
            }
            else {
                num1 = Number(parts[0])
                num2 = Number(parts[1])
            }
        }
        console.log(num1, num2, operator)
        answer = operate(num1, operator, num2)
        fullExpression = +(answer.toFixed(10))
        operatorCount--
    }

    if (buttonClicked === "AC") {
        fullExpression = ""
        operatorCount=0
        operator = ""
        decimalCount = 0
    }
    else if (buttonClicked === "=") {
        if ("+-×÷%^".includes(fullExpression[fullExpression.length-1])) {

        } else if (!(fullExpression.includes("+") || fullExpression.includes("-") || fullExpression.includes("×") || 
            fullExpression.includes("÷") || fullExpression.includes("%") || fullExpression.includes("^"))) {

        } else {
            if (fullExpression[0]==="-") {
                fullExpression = fullExpression.substring(1)
                let parts = fullExpression.split(operator)
                num1 = 0 - Number(parts[0])
                num2 = Number(parts[1])
            } else {
                let parts = fullExpression.split(operator)
                num1 = Number(parts[0])
                num2 = Number(parts[1])
            }
            operatorCount--
            answer = operate(num1, operator, num2)
            if (answer === "Can't divide by zero!") {
                fullExpression = answer
                operator = ""
                operatorCount = 0
                decimalCount = 0
                justCalculated = true
            } else {
                fullExpression = +(answer.toFixed(10))
                justCalculated = true
        }}
    }
    else if (buttonClicked === "Del") {
        if ("+-×÷%^".includes(fullExpression[fullExpression.length - 1])) {
            operator=""
            operatorCount--
        }
        if (fullExpression[fullExpression.length-1]===".") {
            decimalCount = 0
        }
        fullExpression = fullExpression.substring(0,(fullExpression.length-1))
    } 
    else {
        if (buttonClicked==="." && decimalCount>1) {
            decimalCount--
        }
        else {
            fullExpression += buttonClicked 
        }  
    }

    if (buttonClicked === "+") {
        operator = buttonClicked
        decimalCount = 0
    } else if (buttonClicked === "-") {
        operator = buttonClicked
        decimalCount = 0
    } else if (buttonClicked === "×") {
        operator = buttonClicked
        decimalCount = 0
    } else if (buttonClicked === "÷") {
        operator = buttonClicked
        decimalCount = 0
    } else if (buttonClicked === "%") {
        operator = buttonClicked
        decimalCount = 0
    } else if (buttonClicked === "^") {
        operator = buttonClicked
        decimalCount = 0
    }

    display.textContent = fullExpression
}))
