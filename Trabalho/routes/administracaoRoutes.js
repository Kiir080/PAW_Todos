const express = require('express');
const router = express.Router();

const adminController = require('../controller/administracaoController');
const subDomain = 'administracao';


router.post('/' + subDomain + '/addAcao', function (req, res) {
    adminController.criaAcao(req.body, function (err) {
        if (err) res.status(300).send(err.message);
        else {
            res.status(200).send("Ação Criada");
        }

    });
});

router.post('/' + subDomain + '/eliminaAcao', function (req, res) {
    adminController.eliminaAcao(req.body, function (err) {
        if (err) res.status(300).send(err.message);
        else {
            res.status(200).send("Ação Eliminada");
        }

    });
});

module.exports = router;