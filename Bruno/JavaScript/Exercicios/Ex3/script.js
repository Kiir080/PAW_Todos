"use strict";
let target = [];
(function getTarget() {
    target = document.getElementsByClassName("email");
    for (let i = 0; i < target.length; i++) {
        checkTarget(target[i]);
        target[i].addEventListener("blur", function (event) {
            checkStrings();
        });
    }

})()

function checkTarget(e) {
    e.addEventListener("input", function (event) {

        if (e.validity.typeMismatch) {
            e.setCustomValidity("gogogog");
        } else {
            e.setCustomValidity("");
        }
    })
};

function checkStrings() {

    if (target[0].value !== target[1].value) {
        target[1].setCustomValidity(target[1].getAttribute("name") + " Não corresponde");

    } else {
        target[1].setCustomValidity("");
    }


};