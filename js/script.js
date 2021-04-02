"use strict"

window.addEventListener("load",init)
var inputpriem;
var inputconvert;
var base;
var feedback;

var btnCheckPriem;
var btnConvert;

function init(){
   inputpriem = document.getElementById("inputPriem");
   inputconvert = document.getElementById("inputConvert");
   base = document.getElementById("idBaseNr");
   feedback = document.getElementById("IdFeedback");

   btnCheckPriem = document.getElementById("checkPriemBtn");
   btnConvert = document.getElementById("idConvertBtn");  
   
   btnCheckPriem.addEventListener("click",CheckPriem);
   btnConvert.addEventListener("click",Convert);
}

function CheckPriem(){
    let number = inputpriem.value;
    let divisionNumber = Math.round(number / 2);
    let isPrime = true;  

    const feedbackNegativeNumber = `${number} is een negative getal, enkel positive getallen zijn toegelaten`;
    
    if(IsPositiveNumber(number)){
        for(let i = 2;i <= divisionNumber;i++){
            if(number % i == 0){
                isPrime = false;
            }
        } 
    
        SetFeedback(isPrime,number); 
    }else{
        feedback.innerHTML = feedbackNegativeNumber;
        inputpriem.classList.add("isNotPrime"); 
    }      
}

function IsPositiveNumber(number){    
    let isPositive = true;

    if(number < 0){         
        isPositive = false;      
    }
    return isPositive;
}

function SetFeedback(isPrime,number){    

    const feedbackIsPrime = `Het getal ${number} is een priemgetal`;
    const feedbackIsNotPrime = `Het getal ${number} is geen priemgetal`;

    inputpriem.classList.remove("isPrime","isNotPrime");

    if (isPrime == true){        
        inputpriem.classList.add("isPrime");       
        feedback.innerHTML = feedbackIsPrime;
    }else if (isPrime == false){    
        inputpriem.classList.add("isNotPrime"); 
        feedback.innerHTML = feedbackIsNotPrime;
    }else{
        inputpriem.classList.remove("isPrime","isNotPrime");
        feedback.innerHTML = "";
    }
}

function Convert(){
    let characteristic;
    let mantissa;

    [characteristic,mantissa] = setMantissaAndCharacteristic();
    console.log(characteristic,mantissa)
}

function setMantissaAndCharacteristic(){
    let number = [...inputconvert.value.replace(",",".")];
    let characteristic;
    let mantissa = 0.0; 

    if(number.find(x => x == ".")){
        characteristic = number.slice(0,number.indexOf(".")).join("");
        mantissa = number.slice(number.indexOf(".")+1).join("");
    }else{
        characteristic = number.join("");
    }  

    return [characteristic,mantissa];
}


