const express = require('express');
const router = express.Router();

const dossierController = require('../controller/entidadeControler.js');
const subDomain = 'Entidade';


router.get('/'+subDomain,function(req,res){
    res.render('criarEntidade');
})

router.post('/' + subDomain + '/criarEntidade', function (req, res) {
    dossierController.criarEntidade(req.body, function (err) {
        if (!err) {
            res.status(200).send("Entidade criada");
        } else {
            res.status(300).send(err.message);
        }
    })
});

router.post('/' + subDomain + '/editarEntidade', function (req, res) {
    dossierController.editarEntidade(req.body, function (err) {
        if (!err) {
            res.status(200).send("Entidade editada");
        } else {
            res.status(300).send(err.message);
        }
    })
});


router.post('/' + subDomain + '/atualizarEntidade', function (req, res) {
    dossierController.editarEntidade(req.body, function (err) {
        if (!err) {
            res.status(200).send("Entidade atualizada");
        } else {
            res.status(300).send(err.message);
        }
    })
});


module.exports = router;
