const express = require('express');
const router = express.Router();

const assistenteSocialControler = require('../controller/assistenteSocialControler.js');
const subDomain = 'assistenteSocial';

router.post('/' + subDomain + '/criarDossier', function (req, res) {
    assistenteSocialControler.criarDossier(req.body, function (err) {
        if (!err) {
            res.status(200).send("Dossier criado");
        } else {
            res.status(300).send(err.message);
        }
    })
});

router.get('/' + subDomain, function (req, res) {
    res.render('criarProcesso');
})

router.post('/' + subDomain + '/addFicha', function (req, res) {
    assistenteSocialControler.addProcesso(req.body, function (err) {
        if (!err) {
            res.status(200).send("Processo adicionado");
        } else {
            res.status(300).send(err.message);
        }
    })
});

router.post('/' + subDomain + '/atualizarProblema', function (req, res) {
    assistenteSocialControler.atualizarProblema(req.body, function (err) {
        if (!err) {
            res.status(200).send("Problema atualizado");
        } else {
            res.status(300).send(err.message);
        }
    });
});

module.exports = router;