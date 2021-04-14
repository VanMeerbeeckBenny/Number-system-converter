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
var charactericresult;
var mantissaResult;
var finalResultdiv;
var feedbackPrime = "";
var feedbackConvert= "";
var noErrors = true;


var btnCheckPriem;
var btnConvert;

function init(){

   inputpriem = document.getElementById("inputPriem");
   maxNrAfterComma = document.getElementById("inputMaxNrAfterComma");
   inputconvert = document.getElementById("inputConvert");
   base = document.getElementById("idbaseNumber");
   feedback = document.getElementById("IdFeedback");
   characteristicDiv = document.getElementById("characteristic");
   mantissaDiv = document.getElementById("mantissa");
   charactericresult = document.getElementById("characteristic").getElementsByClassName("leftover");
   mantissaResult = document.getElementById("mantissa").getElementsByClassName("leftover");
   finalResultdiv = document.getElementById("idFinalResult");     

   btnCheckPriem = document.getElementById("checkPriemBtn");
   btnConvert = document.getElementById("idConvertBtn");  
   
   btnCheckPriem.addEventListener("click",CheckPriem);
   btnConvert.addEventListener("click",Convert);
}

// js for primenumber

function CheckPriem(){
    let number = inputpriem.value;
    const feedbackNegativeNumber = "geen geldig nummer , vull een positief geheel nummer in";
    
    if(NotNegativeNumberOrEmpty(number)  && IsNotDecimal(number)){
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
function NotNegativeNumberOrEmpty(number){    
   return number >= 0 && number.trim() != ""; 
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

    ClearShowedConvertion();

    if(NotNegativeNumberOrEmpty(number) && InputIsCorrectFormat(number)){
        
        noErrors = true;
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
        noErrors = false;
        feedbackConvert = feedbackNegativeNumber;        
        inputconvert.classList.add("false");        
    }
    
    if(isOpen && noErrors){
        AnimateResult();
    }

    feedback.innerHTML = feedbackConvert;
    
    
}

function InputIsCorrectFormat(number){
    return number.match(/^\d*[.]{0,1}\d*$/);
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
    let baseNumber = base.value;
    
    if(characteristic == 0){ // check for number below 1 (for example:0.1,0.5)
        ShowCalculationCharacteristic(result,baseNumber);
    }
    while (result > 0){
        
        ShowCalculationCharacteristic(result,baseNumber);
        resultBeforeComma.unshift(result%baseNumber);
        result = (result - (result%baseNumber)) / baseNumber
        }   

    resultBeforeComma = resultBeforeComma.length == 0?[0]:resultBeforeComma;
    resultBeforeComma = ReplaceNumberToHexChars(resultBeforeComma);
    return resultBeforeComma
}

function ShowCalculationCharacteristic(result,baseNumber){

    let row = document.createElement("div");
    let caclulation = document.createElement("div");
    let leftover = document.createElement("div"); 
    let feedback = `${result}/${baseNumber}=${(result - (result%baseNumber)) / baseNumber}`;       

    row.setAttribute("class","myrow");
    caclulation.setAttribute("class","calculationFeedback")
    leftover.setAttribute("class","leftover");
    
    caclulation.innerHTML = feedback;
    leftover.innerHTML= result%baseNumber;

    row.appendChild(caclulation);
    row.appendChild(leftover);
    characteristicDiv.appendChild(row);
}

function ConvertMantissa(mantissa){
    let resultAfterComma = [];
    maxLengthMantissa = mantissa.length;
    let result =`0.${mantissa}` ;
    let baseNumber = base.value;
    let counter = 0;
    const maxIteration = NotNegativeNumberOrEmpty(maxNrAfterComma.value)?maxNrAfterComma.value:20;    
    
    while (result != 0 && counter < maxIteration){
        ShowCalculationMantissa(result,baseNumber);
        if(result * baseNumber >= 1){
            resultAfterComma.push(Math.floor(result * baseNumber));
            result = `${result * baseNumber}`;
            result = [...result];
            result.find(x=> x ==".")?result.splice(0,result.indexOf("."),0):result = 0;
            result = result != 0 ?result.join(""):0;
            /*result =(result * baseNumber)- Math.floor(result * baseNumber); 
            this was original used but the used formula is more accurate */
        }else{
         resultAfterComma.push("0");
         result =(result * baseNumber)
        }   
        
        counter++;     
    }
    if(result != 0){
        
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

function ShowCalculationMantissa(result,baseNumber){

    let row = document.createElement("div");
    let caclulation = document.createElement("div");
    let leftover = document.createElement("div"); 
    
    let feedback = `${parseFloat(result).toFixed(maxLengthMantissa)} * ${baseNumber} = ${parseFloat(result * baseNumber).toFixed(maxLengthMantissa)}`;       
    
    row.setAttribute("class","myrow");
    caclulation.setAttribute("class","calculationFeedback")
    leftover.setAttribute("class","leftover");
    
    caclulation.innerHTML = feedback;
    leftover.innerHTML= Math.floor(result * baseNumber);

    row.appendChild(caclulation);
    row.appendChild(leftover);
    mantissaDiv.appendChild(row);
}

function ClearShowedConvertion(){
    finalResultdiv.innerHTML = "";

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
    let counter = charactericresult.length-1;
    let counterOutput = 0;
    let done = false;    

    if(typeof finalResult != "undefined"){

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

            //print seperator then ++ for getting first number after seperator ready to highlight
                finalResultdiv.innerHTML += outputFinalResult[counterOutput]; 
                counterOutput ++;        
                
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
            }else if (outputFinalResult.length == counterOutput){
                btnConvert.removeAttribute("disabled");
                btnCollapse.removeAttribute("disabled");
            }       
        }  
}
}

