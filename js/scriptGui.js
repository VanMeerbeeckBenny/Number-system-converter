"use strict"

window.addEventListener("load",init)
var select;
var arrow;
var btnCollapse

function init(){
    select = document.getElementById("idSelectOption");
    btnCollapse= document.getElementById("idShowCalculationBtn");
        
    select.addEventListener("change",ActivateOption);
    btnCollapse.addEventListener("click",ToggleExpande)
   
}

function ActivateOption(){
    let priem = document.getElementById("idPriemWrapper");
    let convert = document.getElementById("idConvert");

    priem.classList.remove("hide");
    convert.classList.remove("hide");

    if(select.value == "priemgetal"){        
        convert.classList.add("hide");
    }else{        
        priem.classList.add("hide");
    }
}

function ToggleExpande(){
    let berekening = document.querySelector(".berekening");
    arrow = document.getElementById("arrow");

    berekening.classList.toggle("large");
    setTimeout(toggleArrowAndContentBtn,2000);          
}

function toggleArrowAndContentBtn(){    
        
    if (arrow.className == "bi bi-caret-right-fill"){
        arrow.classList.remove("bi-caret-right-fill");
        arrow.classList.add("bi-caret-left-fill");
        btnCollapse.innerHTML = "Verberg berekening";
    }else{
        arrow.classList.remove("bi-caret-left-fill");
        arrow.classList.add("bi-caret-right-fill");
        btnCollapse.innerHTML = "Toon berekening";
    }
}