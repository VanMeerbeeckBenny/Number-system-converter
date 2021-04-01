"use strict"

window.addEventListener("load",init)
var inputpriem;
var inputconvert;
var base;

var btnCheckPriem;
var btnConvert;

function init(){
   inputpriem = document.getElementById("inputPriem");
   inputconvert = document.getElementById("inputConvert");
   base = document.getElementById("idBaseNr");

   btnCheckPriem = document.getElementById("checkPriemBtn");
   btnConvert = document.getElementById("idConvertBtn");  
   
   btnCheckPriem.addEventListener("click",CheckPriem);
   btnConvert.addEventListener("click",Convert);
}

function CheckPriem(){
    let number = inputpriem.value;
    let divisionNumber = Math.round(number / 2);
    let isPrime = true;    

    for(let i = 2;i <= divisionNumber;i++){
        if(number % i == 0){
            isPrime = false;
        }
    } 

    SetFeedback(isPrime,number);   
}

function SetFeedback(isPrime,number){
    let feedback = document.getElementById("IdFeedback");

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
    
}


