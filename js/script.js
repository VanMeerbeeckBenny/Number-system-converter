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
    let counter = Math.round(number / 2);
    let isPrime = true;
    let feedback = document.getElementById("IdFeedback");

    const feedbackIsPrime = `Het getal ${number} is een priemgetal`;
    const feedbackIsNotPrime = `Het getal ${number} is geen priemgetal`;

    for(let i = 2;i <= counter;i++){
        if(number%i == 0){
            isPrime = false;
        }
    } 
    
    if (isPrime == true){        
        inputpriem.style.outlineColor = "green";
        inputpriem.style.color = "green";
        inputpriem.focus();
        feedback.innerHTML = feedbackIsPrime;
    }else{    
        inputpriem.style.outlineColor = "red";
        inputpriem.style.color = "red";
        inputpriem.focus();   
        feedback.innerHTML = feedbackIsNotPrime;
    }

}

function Convert(){
    
}


