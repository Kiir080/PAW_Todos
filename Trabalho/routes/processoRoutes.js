const express = require('express');
const router = express.Router();

const processoController = require('../controller/processoControler.js');
const subDomain = 'Dossier';


router.post('/' + subDomain + '/addFicha', function (req, res) {
    processoController.addProcesso(req.body, function (err) {
        if (!err) {
            res.status(200).send("Processo adicionado");
        } else {
            res.status(300).send(err.message);
        }
    })
});

module.exports = router;