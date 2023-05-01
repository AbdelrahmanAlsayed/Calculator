const body = document.querySelector("body");
const toggle = document.querySelector(".toggle");
const icon = document.querySelector(".icon");

let getMode = localStorage.getItem("mode");
if(getMode && getMode == "dark") {
    body.classList.add("dark");
    toggle.classList.add("active");
}

toggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) return localStorage.setItem("mode", "dark");
    else return localStorage.setItem("mode", "light");
});

toggle.addEventListener("click", () => toggle.classList.toggle("active"));


/*-------------------------------------------------------------------------------*/

const keys = document.querySelectorAll(".key");
const display_input = document.querySelector(".input");
const display_output = document.querySelector(".output");

let input = "";

keys.forEach(key => {
    key.addEventListener("click", () => {
        const value = key.getAttribute("data-key");
        if(value == "clearAll") {
            input = "";
            display_input.innerHTML = "";
            display_output.innerHTML = "";
        }
        else if (value == "backspace") {
            input = input.slice(0, -1);
            display_input.innerHTML = CleanInput(input);
        }
        else if (value == "=") {
            let result = eval(PrepareInput(input)); //   eval 
            display_output.innerHTML = cleanOutput(result);
            display_input.innerHTML = `${CleanInput(input)} ${value}`;
        }
        else if (value == "()") {
            if (
                input.indexOf("(") == -1 || 
                input.indexOf("(") != -1 &&
                input.indexOf(")") != -1 && 
                input.lastIndexOf("(") < input.lastIndexOf(")")) {
                    input += "(";
            }
            else if (
                input.indexOf("(") != -1 &&
                input.indexOf(")") == -1 ||
                input.indexOf("(") != -1 &&
                input.indexOf(")") != -1 &&
                input.lastIndexOf("(") > input.lastIndexOf(")")) {
                    input += ")";
            }
            display_input.innerHTML = CleanInput(input);
        }
        else {  
            if(ValidateInput(value)) {
                input += value;
                display_input.innerHTML = CleanInput(input);
            }
        }
    })
});


function CleanInput(input) {
    let inputArr = input.split("");

    for (let i = 0; i < inputArr.length; i++) {
        console.log(inputArr[i]);
        if (inputArr[i] == "*")  inputArr[i] = ` <span class="operator">x</span> `;
        else if (inputArr[i] == "/") inputArr[i] = ` <span class="operator">÷</span> `;
        else if (inputArr[i] == "+") inputArr[i] = ` <span class="operator">+</span> `;
        else if (inputArr[i] == "-") inputArr[i] = ` <span class="operator">-</span> `;
        else if (inputArr[i] == "(") inputArr[i] = `<span class="operator">(</span>`;
        else if (inputArr[i] == ")") inputArr[i] = `<span class="operator">)</span>`;
        else if (inputArr[i] == "%") inputArr[i] = ` <span class="operator">%</span> `;
    }
    
    return inputArr.join("");
}


//  1   => inserts a comma before each group of three digits.
function cleanOutput(output) {
    return output.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

 // 2   => inserts a comma before each group of three digits.
/*
function cleanOutput(output) {
    let outputStr = output.toString();
    let decimal = outputStr.split(".")[1];
    outputStr = outputStr.split(".")[0];
    let outputArr = outputStr.split("");


    if (outputArr.length > 3) {
        for (let i = outputArr.length - 3; i > 0; i -= 3) {
            outputArr.splice(i, 0, ",");
        }
    }
    if (decimal) {
        outputArr.push(".");
        outputArr.push(decimal);
    }

    return outputArr.join("");
}
*/


function ValidateInput (value) {
    let last_input = input.slice(-1);
    let operators = ["+", "-", "*", "/" ,".", "%"];
    
    if (operators.includes(value)) {
        if (operators.includes(last_input)) {
            return false;
        } else {
            return true;
        }
    }
    return true;
}


function PrepareInput (input) {
    let input_array = input.split("");

    for (let i = 0; i < input_array.length; i++) {
        if (input_array[i] == "%") {
            input_array[i] = "/100";
        }
    }

    return input_array.join("");
}