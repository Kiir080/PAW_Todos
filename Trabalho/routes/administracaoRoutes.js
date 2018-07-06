const express = require('express');
const router = express.Router();

const adminControler = require('../controller/administracaoControler');
const subDomain = 'administracao';
const assistenteSocialControler = require('../controller/assistenteSocialControler.js');

router.get('/'+subDomain,function(req,res){
    res.render('criarEntidade');
});

router.get('/'+subDomain+'/verAcoes',function(req,res){
    res.render('acoes');
});

router.post('/' + subDomain + '/criarEntidade', function (req, res) {
    adminControlerControler.criarEntidade(req.body, function (err) {
        if (!err) {
            res.status(200).send("Entidade criada");
        } else {
            res.status(300).send(err.message);
        }
    })
});

router.post('/' + subDomain + '/editarEntidade', function (req, res) {
    adminControlerControler.editarEntidade(req.body, function (err) {
        if (!err) {
            res.status(200).send("Entidade editada");
        } else {
            res.status(300).send(err.message);
        }
    })
});


router.post('/' + subDomain + '/atualizarEntidade', function (req, res) {
    adminControlerControler.editarEntidade(req.body, function (err) {
        if (!err) {
            res.status(200).send("Entidade atualizada");
        } else {
            res.status(300).send(err.message);
        }
    })
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