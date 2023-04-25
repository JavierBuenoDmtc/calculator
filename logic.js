
function Calculadora() {
    this.basicOperationShape = new RegExp("(([1-9][0-9]*|[0.])(.[0-9]*[1-9])?[\-\+\*\/])(([1-9][0-9]*|[0.])(.[0-9]*[1-9])?)");
    this.memoryRegister = 0;
}

Calculadora.prototype.showInDisplay = function (data) {
    var legacy = document.getElementById("displayBox").value;
    if (data == ".") {
        legacy += data;
    } else {
        legacy = legacy == "0" ? data : legacy += data;
    }
    document.getElementById("displayBox").value = legacy;
}

Calculadora.prototype.writeOperatorToDisplay = function (operator) {
    var legacy = document.getElementById("displayBox").value;
    if (this.basicOperationShape.test(legacy)) {
        this.solveOperation();
    }
    this.showInDisplay(operator);
}

function CalculadoraCientifica() {
    this.inputList = new Array();
    this.operationString = "";
    this.justSolved = false;
    this.operationMap = {
        "sin(": "Math.sin(",
        "cos(": "Math.cos(",
        "tan(": "Math.tan(",
        "log(": "Math.log10(",
        "ln(": "Math.log(",
        "sqrt(": "Math.sqrt(",
        "PI": "Math.PI",
        "e": "Math.E"
    };
}

CalculadoraCientifica.prototype = Object.create(Calculadora.prototype);



CalculadoraCientifica.prototype.writeToDisplay = function (data) {
    if (document.getElementById("displayBox").value == "Syntax Error") {
        this.clearDisplay();
    }
    this.showInDisplay(data);
    if (!this.operationMap.hasOwnProperty(data)) {
        this.operationString += data;
    }
    this.inputList.push(data);
}

CalculadoraCientifica.prototype.writeOperatorToDisplay = function (operator) {
    if (document.getElementById("displayBox").value == "Syntax Error") {
        this.clearDisplay();
    }
    this.operationString += operator;
    this.showInDisplay(operator);
    this.inputList.push(operator);
}

CalculadoraCientifica.prototype.solveOperation = function () {
    try {
        result = eval(this.operationString == "" || this.operationString == "Syntax Error" ? 0 : this.operationString);
    } catch (err) {
        result = "Syntax Error";
    }
    document.getElementById("displayBox").value = result;
    this.operationString = "";
    this.operationString += result;
    this.justSolved = true;
    return result;
}

CalculadoraCientifica.prototype.clearDisplay = function () {
    document.getElementById("displayBox").value = "0";
    this.operationString = "";
}

CalculadoraCientifica.prototype.toggleSign = function () {
    var displayBox = document.getElementById("displayBox");
    var displayContents = displayBox.value;
    if (displayContents == "Syntax Error") {
        this.clearDisplay();
    }
    if (displayContents == "0") {
        displayBox.value = "-";
        this.operationString += "-";
    } else {
        displayBox.value = "-" + displayBox.value;
        this.operationString = "-" + this.operationString;
    }
}

CalculadoraCientifica.prototype.eraseLastInput = function () {
    this.inputList.pop();
    var recreatedOperation = "";

    for (var i = 0; i < this.inputList.length; i++) {
        recreatedOperation += this.inputList[i];
    }

    document.getElementById("displayBox").value = recreatedOperation;

    for (var i = 0; i < this.operationMap.length; i++) {
        recreatedOperation = recreatedOperation.replace(each, this.operationMap[i]);
    }

    this.operationString = recreatedOperation;
}

CalculadoraCientifica.prototype.writeMathFunction = function (data) {
    if (document.getElementById("displayBox").value == "Syntax Error") {
        this.clearDisplay();
    }
    var abc = this.operationMap[data];
    this.writeToDisplay(data);
    this.operationString += abc;
    this.inputList.push(data);
}

CalculadoraCientifica.prototype.calculateFactorial = function () {
    var number = parseInt(this.operationString.split(new RegExp("[^0-9]")));
    var result = 0;
    try {
        result = this.calculateRecursiveFactorial(number);
    } catch (err) {
        document.getElementById("displayBox").value = "That number is too big";
    }
    this.clearDisplay();
    document.getElementById("displayBox").value = result;
}

CalculadoraCientifica.prototype.calculateRecursiveFactorial = function (number) {
    if (number == 1 || number == 0) {
        return 1;
    }
    return number * this.calculateRecursiveFactorial(number - 1);
}

CalculadoraCientifica.prototype.nthTenPower = function () {
    var number = parseInt(this.operationString.split(new RegExp("[^0-9]")));
    this.clearDisplay();
    document.getElementById("displayBox").value = Math.pow(10, parseInt(number));
}

CalculadoraCientifica.prototype.square = function () {
    var number = parseInt(this.operationString.split(new RegExp("[^0-9]")));
    this.clearDisplay();
    document.getElementById("displayBox").value = Math.pow(parseInt(number), 2);
}

CalculadoraCientifica.prototype.cube = function () {
    var number = parseInt(this.operationString.split(new RegExp("[^0-9]")));
    this.clearDisplay();
    document.getElementById("displayBox").value = Math.pow(parseInt(number), 3);
}

CalculadoraCientifica.prototype.inverseNumber = function () {
    var number = parseInt(this.operationString.split(new RegExp("[^0-9]")));
    this.clearDisplay();
    document.getElementById("displayBox").value = Math.pow(parseInt(number), -1);
}

var calculadora = new CalculadoraCientifica();

