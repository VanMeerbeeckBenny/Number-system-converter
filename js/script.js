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
    let baseNr = base.value;

    while (result > 0){
        resultBeforeComma.unshift(result%baseNr);
        result = (result - (result%baseNr)) / baseNr
        }   

    resultBeforeComma = resultBeforeComma.length == 0?[0]:resultBeforeComma;
    resultBeforeComma = ReplaceNumberToHexChars(resultBeforeComma);
    return resultBeforeComma
}

function ReplaceNumberToHexChars(converResult){
    let hexaChar = [["10","A"],["11","B"],["12","C"],["13","D"],["14","E"],["15","F"]];
    let decimal = [];
    
    converResult.forEach(nr=>{
        if(nr > 9){
        for (let i = 0; i < hexaChar.length;i++){
            if(nr == hexaChar[i][0]){
                let char = hexaChar[i][1];
                decimal.push(char);    
                break;          
            }                
            
        }
        }else{
        decimal.push(nr)
        }
    }) 
    return decimal.join("");
}

