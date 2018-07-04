const express = require('express');
const router = express.Router();

const dossierController = require('../controller/entidadeControler.js');
const subDomain = 'Entidade';

router.post('/' + subDomain + '/criarEntidade', function (req, res) {
    dossierController.criarEntidade(req.body, function (err) {
        if (!err) {
            res.status(200).send("Entidade criada");
        } else {
            res.status(300).send(err.message);
        }
    })
});

module.exports = router;
