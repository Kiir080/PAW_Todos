const express = require('express');
const router = express.Router();

const adminController = require('../controller/administracaoController');
const subDomain = 'administracao';


router.post('/' + subDomain + '/criaAcao', function (req, res) {
    adminController.criaAcao(req.body, function (err) {
        if (err) res.status(300).send(err.message);
        else {
            res.status(200).send("Ação Criada");
        }

    });
});

module.exports = router;