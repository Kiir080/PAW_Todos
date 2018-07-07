const express = require('express');
const router = express.Router();

const assistenteSocialControler = require('../controller/assistenteSocialControler.js');
const getEntidades=require('../controller/administracaoControler').getEntidades;
const subDomain = 'assistenteSocial';

router.get('/'+subDomain,function(req,res){
    res.render('./assistenteSocialFrontPage');
})

router.post('/' + subDomain + '/criarDossier', function (req, res) {
    assistenteSocialControler.criarDossier(req, function (err) {
        if (!err) {
            res.status(200).redirect('/'+subDomain);
        } else {
            res.status(300).send(err.message);
        }
    })
});

router.get('/' + subDomain+'/criarDossierLanding', function (req, res) {
    res.render('criarDossier');
});


//A assistente social tb pode ver ações!! mas irá para uma pagina diferente aonde nao as possa Eliminar
router.get('/'+subDomain+'/verAcoes',function(req,res){
    res.render('acoes');
});

router.get('/' + subDomain+'/criarProcessoLanding', function (req, res) {
    res.render('criarProcesso');
});

router.post('/' + subDomain + '/addProcesso', function (req, res) {
    assistenteSocialControler.addProcesso(req, function (err) {
        if (!err) {
            res.status(200).redirect('/'+subDomain);
        } else {
            res.status(300).send(err.message);
        }
    })
});

router.post('/' + subDomain + '/atualizarProblema', function (req, res) {
    assistenteSocialControler.atualizarProblema(req, function (err) {
        if (!err) {
            res.status(200).send("Problema atualizado");
        } else {
            res.status(300).send(err.message);
        }
    });
});

router.post('/'+subDomain+'/getProcessos',function(req,res){
    assistenteSocialControler.getProcessos(function(err,result){
        if(err !== null){
            console.log(err.message);
            res.send(null);
        }else{
            res.send(result);
        }
    })
});


router.post('/'+subDomain+'/checkIfExistsNumAluno',function(req,res){
    assistenteSocialControler.checkIfExistsNumeroAluno(req.sanitize(req.body.numeroAluno),function(err,result){
        if(err === null){
            res.send(result);
        }
    })
});

router.post('/'+subDomain+'/checkIfExistsAssSocial',function(req,res){
    assistenteSocialControler.checkIfExistsAssSocial(req.sanitize(req.body.assistenteSocial),function(err,result){
        if(err === null){
            res.send(result);
        }
    })
});


router.post('/'+subDomain+'/getEntidades',function(req,res){
    getEntidades(function(err,result){
        if(err !== null){
            console.log(err.message);
            res.send(null);
        }else{
            res.send(result);
        }
    })
});

router.post('/'+subDomain+'/getDossier',function(req,res){
   assistenteSocialControler.getDossier(req.sanitize(req.body.data),function(result){
        res.send(result);
   });
});

router.post('/'+subDomain+'/getProcesso',function(req,res){
    assistenteSocialControler.getProcesso(req.sanitize(req.body.data),function(result){
         res.send(result);
    });
 });

module.exports = router;