"use strict"
var stack = [];
var flag = 0;
var flag2 = 0;
var decimalFlag = 0;
var decimalCount = 0;
var clear = 0;
var error = 0;
window.onload = function () {
    var displayVal = "0";
    for (var i in $$('button')) {
        $$('button')[i].onclick = function () {
            var value = $(this).innerHTML;
            if(clear && !error){
                $('expression').innerHTML = "0";
                displayVal = "0";
                clear = 0;
            } 
            $('result').innerHTML = displayVal;
            if(value=="AC") {
                displayVal = "0";
                error = 0;
                stack = [];
                flag = 0;
                flag2 = 0;
                clear = 0;  
                decimalFlag = 0;
                decimalCount = 0;
                $('expression').innerHTML = "0";
            } else if(/^[0-9]+$/.test(value) && !error) {//숫자를 위함.
                flag = 0;
                if(decimalFlag){
                    decimalCount++;
                } 
                if(flag2){
                    stack.push("*");
                    flag2 = 0;
                } 
                if(displayVal.charAt(0) == "0") {
                    if(displayVal.charAt(1) != "."){
                        displayVal = value;
                    } else {
                        displayVal += value;
                    }
                } else {
                    displayVal += value;
                }
            } else if(value=="." && !error) {//데시말
                if(!(/.\.?./.test(displayVal))) {
                    displayVal += value;
                }
                decimalFlag = 1;
            } else if ((value == "(" || value == ")") && !error){  
                decimalFlag = 0;
                var displayExp;      
                if(displayVal != "0"){
                    displayExp = displayVal + value;
                } else {
                    displayExp = value;
                }
                if(value == "("){
                    if(flag2){
                        stack.push("*");
                        flag2 = 0;
                    } 
                    if(!flag){
                        if(displayVal != "0"){
                            stack.push(parseFloat(displayVal).toFixed(decimalCount));
                            decimalCount = 0;
                            stack.push("*");
                        }
                    }
                } else {
                    if(displayVal != "0") stack.push(parseFloat(displayVal).toFixed(decimalCount));
                    flag = 0;
                    flag2 = 1;
                }
                var expression = $('expression').innerHTML;
                if(expression =="0") {
                    $('expression').innerHTML = displayExp;                    
                } else {
                    $('expression').innerHTML += displayExp;    
                }
                displayVal = "0";
                stack.push(value);
            } else {
                if(!error){
                    decimalFlag = 0;
                    flag = 1;
                    flag2 = 0;
                    var displayExp;
                    if(displayVal == "0"){
                        displayExp = value;
                    } else {
                        stack.push(parseFloat(displayVal).toFixed(decimalCount));
                        decimalCount = 0;
                        displayExp = displayVal + value;                    
                    }
                    var expression = $('expression').innerHTML;
                    if(expression =="0") {    
                        $('expression').innerHTML = displayExp;    
                    } else {
                        $('expression').innerHTML += displayExp;    
                    }
                    
                    if(value=="="){
                        var temp = "";
                        for(var i = 0; i < stack.length; i++){
                            temp += "stack No." + i + " : " + stack[i] + "\n";
                        }
                        if(!isValidExpression(stack)){
                            error = 1;
                            displayVal = "Please Check your brackets!";
                        } else {
                            var tempStack;
                            tempStack = infixToPostfix(stack);
                            displayVal = postfixCalculate(tempStack);
                            if(displayVal == "NaN"){
                                displayVal = "ERROR! Check your equation!"
                                error = 1;
                            }
                        }
                        stack = [];
                        clear = 1;
                    } else {
                        stack.push(value);
                        displayVal = "0";
                    }
                }
            }
            $('result').innerHTML = displayVal;
        };
    }
}
function isValidExpression(s) {
    var openCount = 0;
    var closeCount = 0;
    for(var i = 0; i < s.length; i++){
        if(s[i] == "("){
            openCount++;
        } else if(s[i] == ")"){
            closeCount++;
        }
    }

    var result;
    if (openCount == closeCount) {
        result = 1;
    } else {
        result = 0;
    }
    return result;
}
function infixToPostfix(s) {
    var priority = {
        "+":0,
        "-":0,
        "*":1,
        "/":1
    };
    var tmpStack = [];
    var result = [];
    for(var i =0; i<stack.length ; i++) {
        if(/^[0-9\.]+$/.test(s[i])){
            result.push(s[i]);
        } else {
            if(tmpStack.length === 0){
                tmpStack.push(s[i]);
            } else {
                if(s[i] === ")"){
                    while (true) {
                        if(tmpStack.last() === "("){
                            tmpStack.pop();
                            break;
                        } else {
                            result.push(tmpStack.pop());
                        }
                    }
                    continue;
                }
                if(s[i] ==="(" || tmpStack.last() === "("){
                    tmpStack.push(s[i]);
                } else {
                    while(priority[tmpStack.last()] >= priority[s[i]]){
                        result.push(tmpStack.pop());
                    }
                    tmpStack.push(s[i]);
                }
            }
        }
    }
    for(var i = tmpStack.length; i > 0; i--){
        result.push(tmpStack.pop());
    }
    return result;
}
function postfixCalculate(stack) {
    var tmpStack = [];
    var result;
    for(var i =0; i<stack.length ; i++) {
        if(/^[0-9\.]+$/.test(stack[i])){
            tmpStack.push(stack[i]);
        } else {
            var priori = 2;
            if(stack.length < priori){
                alert("ERROR : (Error) The user has not input sufficient values in the expression!");
            } else {
                var operrand2 = parseFloat(tmpStack.pop());
                var operrand1 = parseFloat(tmpStack.pop());
                var operator = stack[i];
                var tempResult = 0.0;
                if(operator == "+"){
                    tempResult = operrand1 + operrand2;
                } else if(operator == "*"){
                    tempResult = operrand1 * operrand2;
                } else if(operator == "/"){
                    tempResult = operrand1 / operrand2;
                } else if(operator == "-"){
                    tempResult = operrand1 - operrand2;
                }
                tmpStack.push(tempResult);
            }
        }
    }    
    result = String(tmpStack.pop());
    return result;
}
