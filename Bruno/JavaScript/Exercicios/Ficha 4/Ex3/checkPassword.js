"use strict";
let password = [];
(function getpassword() {
    password = document.getElementsByClassName("password");
    for (let i = 0; i < password.length; i++) {
        checkpassword(password[i]);
        password[i].addEventListener("blur", function (event) {
            checkStrings();
        });
    }

})()

function checkpassword(e) {
    e.addEventListener("input", function (event) {
        if (e.value.length < 6 || !/\d/.test(e.value)) {
            e.setCustomValidity("A password tem de ter pelo menos 6 carateres com pelo menos um numero");
        } else {
            e.setCustomValidity("");
        }
    })
};


function checkStrings() {

    if (password[0].value !== password[1].value) {
        password[1].setCustomValidity(password[1].getAttribute("name") + " Não corresponde");

    } else {
        password[1].setCustomValidity("");
    }


};