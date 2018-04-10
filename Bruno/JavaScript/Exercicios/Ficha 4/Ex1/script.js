"use strict";
let imagens=[];

(function starUp(){
    let imgs = document.getElementsByClassName("boxImage");
    for(let i=0;i<imgs.length;i++){
        imagens[i]=imgs[i].firstElementChild;
        imagens[i].addEventListener('click',function(e){
            updateDisplayImage(e);

        });
    }
})()
function updateDisplayImage(e){
let dImg=document.getElementById("dImg");
dImg.firstElementChild.setAttribute("src",e.target.getAttribute("src"));
}
