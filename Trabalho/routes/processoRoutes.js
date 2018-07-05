const express = require('express');
const router = express.Router();

const processoController = require('../controller/processoControler.js');
const subDomain = 'Dossier';


router.get('/'+subDomain,function(req,res){
    res.render('criarProcesso');
})

router.post('/' + subDomain + '/addFicha', function (req, res) {
    processoController.addProcesso(req.body, function (err) {
        if (!err) {
            res.status(200).send("Processo adicionado");
        } else {
            res.status(300).send(err.message);
        }
    })
});

router.post('/' + subDomain + '/atualizarProblema', function (req, res) {
    processoController.atualizarProblema(req.body, function (err) {
        if (!err) {
            res.status(200).send("Problema atualizado");
        } else {
            res.status(300).send(err.message);
        }
    })
});





module.exports = router;