const express = require('express');
const router = express.Router();

const adminControler = require('../controller/administracaoController');
const entidadeControler = require('../controller/entidadeControler.js');
const subDomain = 'administracao';

router.get('/'+subDomain,function(req,res){
    res.render('criarEntidade');
})

router.post('/' + subDomain + '/criarEntidade', function (req, res) {
    entidadeControler.criarEntidade(req.body, function (err) {
        if (!err) {
            res.status(200).send("Entidade criada");
        } else {
            res.status(300).send(err.message);
        }
    })
});

router.post('/' + subDomain + '/editarEntidade', function (req, res) {
    entidadeControler.editarEntidade(req.body, function (err) {
        if (!err) {
            res.status(200).send("Entidade editada");
        } else {
            res.status(300).send(err.message);
        }
    })
});


router.post('/' + subDomain + '/atualizarEntidade', function (req, res) {
    entidadeControler.editarEntidade(req.body, function (err) {
        if (!err) {
            res.status(200).send("Entidade atualizada");
        } else {
            res.status(300).send(err.message);
        }
    })
});

router.get('/'+subDomain+'/verAcoes',function(req,res){
    res.render('acoes');
});

router.post('/' + subDomain + '/addAcao', function (req, res) {
    adminControler.criaAcao(req.body, function (err) {
        if (err) res.status(300).send(err.message);
        else {
            res.status(200).send("Ação Criada");
        }

    });
});

router.post('/' + subDomain + '/eliminaAcao', function (req, res) {
    adminControler.eliminaAcao(req.body, function (err) {
        if (err) res.status(300).send(err.message);
        else {
            res.status(200).send("Ação Eliminada");
        }

    });
});

router.post('/'+subDomain+'/getAcoes',function(req,res){
    adminControler.getAcao(req.body.data,function(result){
            res.status(200).send(result);
    });
});

module.exports = router;