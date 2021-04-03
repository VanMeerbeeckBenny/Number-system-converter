"use strict"

window.addEventListener("load",init)
var inputpriem;
var inputconvert;
var base;
var feedback;
var characteristicDiv;

var btnCheckPriem;
var btnConvert;

function init(){
   inputpriem = document.getElementById("inputPriem");
   inputconvert = document.getElementById("inputConvert");
   base = document.getElementById("idBaseNr");
   feedback = document.getElementById("IdFeedback");
   characteristicDiv = document.getElementById("characteristic");
   

   btnCheckPriem = document.getElementById("checkPriemBtn");
   btnConvert = document.getElementById("idConvertBtn");  
   
   btnCheckPriem.addEventListener("click",CheckPriem);
   btnConvert.addEventListener("click",Convert);
}

// js for primenumber

function CheckPriem(){
    let number = inputpriem.value;
    const feedbackNegativeNumber = "geen geldig nummer , vull een positief geheel nummer in";
    
    if(IsValideNumber(number)  && IsNotDecimal(number)){
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

function IsNotDecimal(number){    
    let isNotDecimal = true;

    if(number.match(/[.,]/) ){         
        isNotDecimal = false;      
    }
    return isNotDecimal;
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

//js for converting to other number system

function Convert(){
    let characteristic;
    let mantissa;
    let number = inputconvert.value;

    const feedbackNegativeNumber = "geen geldig nummer , vul een positief nummer in";

    if(IsValideNumber(number)){

        [characteristic,mantissa] = setMantissaAndCharacteristic();
        characteristic = ConvertCharacteristic(characteristic);
        mantissa = ConvertMantissa(mantissa);

        if(mantissa == 0){
            feedback.innerHTML = characteristic;
        }else{
            feedback.innerHTML = `${characteristic}.${mantissa}`;
        }
    }else{
        feedback.innerHTML = feedbackNegativeNumber;
        inputconvert.classList.add("false");
    }
    
    
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
        
        ShowCalculationCharacteristic(result,baseNr);
        resultBeforeComma.unshift(result%baseNr);
        result = (result - (result%baseNr)) / baseNr
        }   

    resultBeforeComma = resultBeforeComma.length == 0?[0]:resultBeforeComma;
    resultBeforeComma = ReplaceNumberToHexChars(resultBeforeComma);
    return resultBeforeComma
}

function ShowCalculationCharacteristic(result,baseNr){

    let row = document.createElement("div");
    let caclulation = document.createElement("div");
    let leftover = document.createElement("div"); 
    let feedback = `${result}/${baseNr}=${(result - (result%baseNr)) / baseNr}`;       

    row.setAttribute("class","myrow");
    caclulation.setAttribute("class","calculationFeedback")
    leftover.setAttribute("class","leftover");
    
    caclulation.innerHTML = feedback;
    leftover.innerHTML= result%baseNr;

    row.appendChild(caclulation);
    row.appendChild(leftover);
    characteristicDiv.appendChild(row);
}

function ConvertMantissa(mantissa){
    let resultAfterComma = [];
    let result =`0.${mantissa}` ;
    let baseNr = base.value;

    while (result != 0){
        if(result * baseNr >= 1){
            resultAfterComma.push(Math.floor(result * baseNr));
            result =(result * baseNr)- Math.floor(result * baseNr);
        }else{
         resultAfterComma.push("0");
         result =(result * baseNr)
        }       
     
    }

    resultAfterComma = resultAfterComma.length == 0?"0":resultAfterComma.join("");
    resultAfterComma = resultAfterComma;
    return resultAfterComma;
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

