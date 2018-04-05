"use strict";
let email = [];
(function getEmail() {
    email = document.getElementsByClassName("email");
    for (let i = 0; i < email.length; i++) {
        checkEmail(email[i]);
        email[i].addEventListener("blur", function (event) {
            checkStrings();
        });
    }

})()

function checkEmail(e) {
    e.addEventListener("input", function (event) {

        if (e.validity.typeMismatch) {
            e.setCustomValidity("gogogog");
        } else {
            e.setCustomValidity("");
        }
    })
};

function checkStrings() {

    if (email[0].value !== email[1].value) {
        email[1].setCustomValidity(email[1].getAttribute("name") + " Não corresponde");

    } else {
        email[1].setCustomValidity("");
    }


};