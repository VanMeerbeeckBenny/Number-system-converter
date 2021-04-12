"use strict"

window.addEventListener("load",init)
var inputpriem;
var inputconvert;
var base;
var feedback;
var characteristicDiv;
var mantissaDiv;
var maxLengthMantissa;
var maxNrAfterComma;
var finalResult;
var feedbackPrime = "";
var feedbackConvert= "";

var btnCheckPriem;
var btnConvert;

function init(){

   inputpriem = document.getElementById("inputPriem");
   maxNrAfterComma = document.getElementById("inputMaxNrAfterComma");
   inputconvert = document.getElementById("inputConvert");
   base = document.getElementById("idBaseNr");
   feedback = document.getElementById("IdFeedback");
   characteristicDiv = document.getElementById("characteristic");
   mantissaDiv = document.getElementById("mantissa");
   
   

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
        feedbackPrime = feedbackNegativeNumber;
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
        feedbackPrime = feedbackIsPrime;          
    }else if (isPrime == false){    
        inputpriem.classList.add("false"); 
        feedbackPrime = feedbackIsNotPrime;        
    }else{
        inputpriem.classList.remove("correct","false");        
    }

    feedback.innerHTML = feedbackPrime;
}

//js for converting to other number system

function Convert(){    
    let characteristic;
    let mantissa;
    let number = inputconvert.value.replace(",",".");

    const feedbackNegativeNumber = "geen geldig nummer , vul een positief decimaal nummer in";

    if(IsValideNumber(number) && HasMaximumOneDecimalSeperator(number)){
        ClearShowedConvertion();
        inputconvert.classList.remove("false");
        [characteristic,mantissa] = setMantissaAndCharacteristic();
        characteristic = ConvertCharacteristic(characteristic);
        mantissa = ConvertMantissa(mantissa);

        if(mantissa == 0){
            feedbackConvert = characteristic;            
            finalResult = characteristic;
        }else{
            feedbackConvert = `${characteristic}.${mantissa}`;            
            finalResult = `${characteristic}.${mantissa}`;
        }
    }else{
        feedbackConvert = feedbackNegativeNumber;        
        inputconvert.classList.add("false");        
    }

    if(isOpen == true){
        AnimateResult();
    }

    feedback.innerHTML = feedbackConvert;
    
    
}

function HasMaximumOneDecimalSeperator(number){
    return number.match(/^\d{1,}[.]{0,1}\d{1,}$/);
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
    maxLengthMantissa = mantissa.length;
    let result =`0.${mantissa}` ;
    let baseNr = base.value;
    let counter = 0;
    const maxIteration = IsValideNumber(maxNrAfterComma.value)?maxNrAfterComma.value:20;    
    
    while (result != 0 && counter < maxIteration){
        ShowCalculationMantissa(result,baseNr);
        if(result * baseNr >= 1){
            resultAfterComma.push(Math.floor(result * baseNr));
            result =(result * baseNr)- Math.floor(result * baseNr);
        }else{
         resultAfterComma.push("0");
         result =(result * baseNr)
        }   
        
        counter++;     
    }
    if(counter == maxIteration){
        let mantissaDiv = document.getElementById("mantissa");
        let row = document.createElement("div");
        let caclulation = document.createElement("div");

        row.setAttribute("class","myrow");
        caclulation.setAttribute("class","calculationFeedback");       
        caclulation.innerHTML = "......";

        row.appendChild(caclulation);
        mantissaDiv.appendChild(row);
    }

    resultAfterComma = resultAfterComma.length == 0?"0":resultAfterComma;
    resultAfterComma = resultAfterComma != 0?ReplaceNumberToHexChars(resultAfterComma):0;
    return resultAfterComma;
}

function ShowCalculationMantissa(result,baseNr){

    let row = document.createElement("div");
    let caclulation = document.createElement("div");
    let leftover = document.createElement("div"); 
    
    let feedback = `${parseFloat(result).toFixed(maxLengthMantissa)} * ${baseNr} = ${parseFloat(result * baseNr).toFixed(maxLengthMantissa)}`;       
    
    row.setAttribute("class","myrow");
    caclulation.setAttribute("class","calculationFeedback")
    leftover.setAttribute("class","leftover");
    
    caclulation.innerHTML = feedback;
    leftover.innerHTML= Math.floor(result * baseNr);

    row.appendChild(caclulation);
    row.appendChild(leftover);
    mantissaDiv.appendChild(row);
}

function ClearShowedConvertion(){
    while(mantissaDiv.firstChild){
        mantissaDiv.removeChild(mantissaDiv.firstChild);
    }

    while(characteristicDiv.firstChild){
        characteristicDiv.removeChild(characteristicDiv.firstChild);
    }
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

function AnimateResult(){
    let charactericresult = document.getElementById("characteristic").getElementsByClassName("leftover");
    let  mantissaResult = document.getElementById("mantissa").getElementsByClassName("leftover");
    let finalResultdiv = document.getElementById("idFinalResult");
    let counter = charactericresult.length-1;
    let counterOutput = 0;
    let done = false;

    finalResultdiv.innerHTML = "";

    let outputFinalResult = [...finalResult];
    
    let interval = setInterval(HighlightCharacteristic,250);
    let interval2 = setInterval(ResetCharacteristic,500);    
    btnConvert.setAttribute("disabled","true");
    btnCollapse.setAttribute("disabled","true");

    function HighlightCharacteristic(){ 
        if(counter < 0){
            clearInterval(interval);
            }else{
                charactericresult[counter].style.fontSize = "1.5em" ;
                charactericresult[counter].style.color="red" ;                
            }           
            
        }

    function ResetCharacteristic(){   
        if(counter < 0){            
            clearInterval(interval2);
            done =true;  
            counter = 0;
            counterOutput ++;            
        }else{
            charactericresult[counter].style.fontSize = "1em" ; 
            charactericresult[counter].style.color="black" ;             
            finalResultdiv.innerHTML += outputFinalResult[counterOutput];
            counter--; 
            counterOutput++; 
        }  
        
        if(done && typeof outputFinalResult[counterOutput]  != "undefined"){
            interval = setInterval(HighlightMantissa,250);
            interval2 = setInterval(ResetMantissa,500);
            finalResultdiv.innerHTML += ".";       
            
            function HighlightMantissa(){ 
                if(counter >= mantissaResult.length){
                    clearInterval(interval);
                    } else{
                        mantissaResult[counter].style.fontSize = "1.5em" ;
                        mantissaResult[counter].style.color="red" ;  
                    }              
                }
        
            function ResetMantissa(){   
                if(counter >= mantissaResult.length){                    
                    clearInterval(interval2);
                    btnConvert.removeAttribute("disabled");
                    btnCollapse.removeAttribute("disabled");
                    }else{                        
                        mantissaResult[counter].style.fontSize = "1em" ; 
                        mantissaResult[counter].style.color="black" ; 
                        finalResultdiv.innerHTML += outputFinalResult[counterOutput];                
                        counter++; 
                        counterOutput ++;                
                        done =false;                        
                    }              
            }
        }else{
            btnConvert.removeAttribute("disabled");
            btnCollapse.removeAttribute("disabled");
        }       
    }  
}

