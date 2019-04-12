//EXPLANATIONS:

//We will set x as a first argument of array of arguments that must be checked for meeting conditions of function's properties #1-4. 
// If first element of this array
//    != 0 (property #1);
//    != 1 (property #2);
//    != 2 (property #3); 
//    or is not odd prime (property #4)
// , then this element probably will be property #5 and function checkArgument(arrayOfArg) will find a, b values
// and append them to the array of arguments that must be checked for meeting conditions of function's properties #1-4.
//If a or b will not meet conditions of function's properties #1-4, 
//than new a and b will be found for previous a or b and will be appended to the array.
//Cycle will be repeated until all elements of the array will meet one of function's properties #1-4.
//After that the result will be found and presented on the screen. 


//PROPERTIES

var x; //function's argument
var fnX; // Value of the function
var arrayOfArguments = []; //Array of arguments that must be checked to find F(x) value
var reg = new RegExp('^-?[0-9]+$'); //Create a regular expresion where value of x can only contain numbers 0-9 and sign;

//MAIN TASK

document.querySelector(".btn-find").addEventListener("click", calcFnX)

//FUNCTIONS

//Function output the value of F(x) for given the given input integer x
function calcFnX() {
    fnX = 0; //Reset F(x)
    x = document.getElementById("inputX").value;

    if (!reg.test(x)) { //Check if x isn't an integer value
        document.getElementById("functionValue").setAttribute("class", "functionValueError");
        document.getElementById("functionValue").innerHTML = "Error! <br> x must be integer";
        console.log("Error! X must be > 0 and < 100001."); //Print error to the console
    }
    else {
        x = parseInt(x);

        if (x > 0 && x < 100001) {
            arrayOfArguments.push(x); //Set x as a first argument of array
            console.log(x);
        
            //Loop until elements exist in the array
            while (arrayOfArguments[0]) {
                checkArgument(arrayOfArguments);  
            }
            
            document.getElementById("functionValue").setAttribute("class", "functionValue");
            document.getElementById("functionValue").textContent = "F(x) = " + fnX;
            console.log("F(x) = " + fnX); //Print result F(x) to the console
        }
        else {
            document.getElementById("functionValue").setAttribute("class", "functionValueError");
            document.getElementById("functionValue").innerHTML = "Error! <br> x must be > 0 and < 100001";
            console.log("Error! X must be > 0 and < 100001."); //Print error to the console
        }
    }

}

//Function that check first argument of array for meeting function's properties #1-5
function checkArgument(arrayOfArg) {
    var arg = arrayOfArg[0];
    
    //Check function property #1: F(x)=0 at x=0. Property #1 x = 0 conflicts with conditions under Property #5 x > 0.
    if (arg === 0) {
        fnX += 0; //Update f(X) value
        arrayOfArg.shift(); //Delete first element that was checked from the array of arguments that must be checked.
    }

    //Check function property #2: F(x)=1 at x=1
    else if (arg === 1) {
        fnX += 1; //Update f(X) value
        arrayOfArg.shift(); //Delete first element that was checked from the array of arguments that must be checked.
    }
    
    //Check function property #3: F(x)=2 at x=2
    else if (arg === 2 ) {
        fnX += 2; //Update f(X) value
        arrayOfArg.shift(); //Delete first element that was checked from the array of arguments that must be checked.
    }

    //Check function property #4: F(x)=0 if x is odd prime
    else if (isOddPrime(arg)) {
        fnX += 0; //Update f(X) value
        arrayOfArg.shift(); //Delete first element that was checked from the array of arguments that must be checked.
    }

    //Check function property #5: F(a*b)=F(a)+F(b),where a,b are two positive integers and sum of a and b is the minimum
    else {
        //Create an array with ab objects, that will be consist all possible a and b values meeting the condition a * b = x 
        var abArr = [];
        
        //Fill array with all possible a and b values meeting the condition a * b = x, where a and are two positive integers 
        for (var b = 1; b <= arg; b++) {
            var a = arg / b; // a = x / b
            //Check if 'a' has an integer value
            if (a % 1 === 0) {
                var abObject = new ab(a, b);
                abArr.push(abObject);
            }
        }

        //Print to console all possible a and b values meeting the condition a * b = x, where a and are two positive integers
        console.log("Array with all possible a and b values:");
        console.log(abArr);

        arrayOfArg.shift(); //Delete first element that was checked from the array of arguments that must be checked.
    
        //Find the minimum sum of a abd b. We will often find 2 minimum sum, because a + b = b + a. So we can pick up first one. Result will be same.
        minABObject = getMin(abArr); //Function return the ab object where a + b is the minimum
        var minA = minABObject.a;
        var minB = minABObject.b;
        arrayOfArg.push(minA, minB); //append to the array of arguments a and b where a, b are two positive integers and sum of a and b is the minimum 
        
        console.log("A and B with the minimum sum: " + minA, minB);
        console.log("Updated array of arguments:");
        console.log(arrayOfArg);
    } 
}


//Function checks if argument value is odd prime
function isOddPrime (number) {
    //Check if odd number
    if (number % 2 !== 0) {
       //Check if prime number
       for (var i = 3; i < number; i++) {
           if (number % i === 0) {
            return false; //Number is odd, but not prime
           }
       }
       //If not return false before, number is odd and prime
       return true;
    }
    else {
        //Number is even
        return false;
    }
}

//Function return ab object with minimum aPlusB property 
function getMin(array) {
    return array.reduce((min, p) => p.aPlusB < min.aPlusB ? p : min, array[0]);
}

//OBJECTS

//Object constructor for ab object
function ab(a, b) {
    this.a = a;
    this.b = b;
    this.aPlusB = a + b;
}

