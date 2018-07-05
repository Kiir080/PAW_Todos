const express = require('express');
const router = express.Router();

const dossierController = require('../controller/dossierControler.js');
const subDomain = 'Dossier';

router.post('/' + subDomain + '/criarDossier', function (req, res) {
    dossierController.criarDossier(req.body, function (err) {
        if (!err) {
            res.status(200).send("Dossier criado");
        } else {
            res.status(300).send(err.message);
        }
    })
});

module.exports = router;
