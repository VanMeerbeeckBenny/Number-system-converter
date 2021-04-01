"use strict"

window.addEventListener("load",init)
var inputpriem;
var inputconvert;
var base;

var btnCheckPriem;
var btnConvert;

function init(){
   inputpriem = document.getElementById("idPriem");
   inputconvert = document.getElementById("idConvert");
   base = document.getElementById("idBaseNr");

   btnCheckPriem = document.getElementById("checkPriemBtn");
   btnConvert = document.getElementById("idConvertBtn");  
   
   btnCheckPriem.addEventListener("click",CheckPriem);
   btnConvert.addEventListener("click",Convert);
}

function CheckPriem(){

}

function Convert(){
    
}


