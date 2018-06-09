const express = require('express');
const router = express.Router();

var path = require('path');

const sessionController = require('../controller/sessionsControler.js');

var session =  require('express-session') ;

router.post('/signUp', function (req, res) {
    sessionController.signUp(req.body, (string) => {
        console.log(string);
        resp.status(200).send(string);
    });
});


router.post('/signIn', function (req, res) {
    sessionController.signIn(req.body, function (userExists, passwordOK) {
        if (userExists === true && passwordOK ===true ) {
            req.session.logedIn = true;
            res.status(200).sendFile(path.resolve(__dirname + '/../views/Receção.html'));
        } else {
            res.redirect("/");
        }
    });
});

router.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../views/LoginTrabalho.html'));
});

module.exports = router;