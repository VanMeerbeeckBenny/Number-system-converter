"use strict"

window.addEventListener("load",init)
var select;

function init(){
    select = document.getElementById("idSelectOption");
    select.addEventListener("change",ActivateOption);
   
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