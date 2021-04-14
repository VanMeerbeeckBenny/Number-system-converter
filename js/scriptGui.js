"use strict"

window.addEventListener("load",init)
var select;
var arrow;
var btnCollapse;
var isOpen;
var priem;
var convert;
var berekening;



function init(){
    select = document.getElementById("idSelectOption");
    btnCollapse= document.getElementById("idShowCalculationBtn");
    priem = document.getElementById("idPriemWrapper");
    convert = document.getElementById("idConvert");
    berekening = document.querySelector(".calculation");    
        
    select.addEventListener("change",ActivateOption);
    btnCollapse.addEventListener("click",ToggleExpande)
   
}

function ActivateOption(){    

    priem.classList.remove("hide");
    convert.classList.remove("hide");

    if(select.value == "priemgetal"){        
        convert.classList.add("hide");
        feedback.innerHTML = feedbackPrime;
    }else{        
        priem.classList.add("hide");
        feedback.innerHTML = feedbackConvert;
    }
}

function ToggleExpande(){    
    arrow = document.getElementById("arrow");

    berekening.classList.toggle("large");
    setTimeout(ToggleAnimationOnExpand,2000);              
}

function ToggleAnimationOnExpand(){    
        
    if (arrow.className == "bi bi-caret-right-fill"){
        arrow.classList.remove("bi-caret-right-fill");
        arrow.classList.add("bi-caret-left-fill");
        btnCollapse.innerHTML = "Verberg berekening";
        isOpen = true;
        if(noErrors){
            AnimateResult();
        }        
    }else{
        arrow.classList.remove("bi-caret-left-fill");
        arrow.classList.add("bi-caret-right-fill");
        btnCollapse.innerHTML = "Toon berekening";
        isOpen = false;        
    }    
}