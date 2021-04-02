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
    const feedbackNegativeNumber = "geen geldige nummer , vull een positief nummer in";
    
    if(IsValideNumber(number)){
        CheckNumberIsPrime(number);         
    }else{
        feedback.innerHTML = feedbackNegativeNumber;
        inputpriem.classList.add("false");       
    }      
}

function CheckNumberIsPrime(number){
    let isPrime = true; 
    let divisionNumber = Math.round(number / 2);

    for(let i = 2;i <= divisionNumber;i++){
        if(number % i == 0){
            isPrime = false;
        }
    }

    SetFeedback(isPrime,number);    
}
function IsValideNumber(number){    
    let isPositive = true;

    if(number <= 0 || number.trim() == "" ){         
        isPositive = false;      
    }
    return isPositive;
}

function SetFeedback(isPrime,number){    

    const feedbackIsPrime = `Het getal ${number} is een priemgetal`;
    const feedbackIsNotPrime = `Het getal ${number} is geen priemgetal`;

    inputpriem.classList.remove("correct","false");

    if (isPrime == true){        
        inputpriem.classList.add("correct");       
        feedback.innerHTML = feedbackIsPrime;
    }else if (isPrime == false){    
        inputpriem.classList.add("false"); 
        feedback.innerHTML = feedbackIsNotPrime;
    }else{
        inputpriem.classList.remove("correct","false");
        feedback.innerHTML = "";
    }
}

function Convert(){
    let characteristic;
    let mantissa;

    [characteristic,mantissa] = setMantissaAndCharacteristic();
    characteristic = ConvertCharacteristic(characteristic);

    console.log(characteristic,mantissa)
}

function setMantissaAndCharacteristic(){
    let number = [...inputconvert.value.replace(",",".")];
    let characteristic;
    let mantissa = 0; 

    if(number.find(x => x == ".")){
        characteristic = number.slice(0,number.indexOf(".")).join("");
        mantissa = number.slice(number.indexOf(".")+1).join("");
    }else{
        characteristic = number.join("");
    }  

    return [characteristic,mantissa];
}

function ConvertCharacteristic(characteristic){
    let resultBeforeComma = [];
    let result = characteristic;
    base = base.value;

    while (result > 0){
        resultBeforeComma.unshift(result%base);
        result = (result - (result%base)) / base
        }   

    resultBeforeComma = resultBeforeComma.length == 0?[0]:resultBeforeComma;
    return resultBeforeComma
}


