const express = require('express');
const router = express.Router();

const assistenteSocialControler = require('../controller/assistenteSocialControler.js');
const comumControler= require('../controller/comumControler.js');

const subDomain = 'assistenteSocial';

/*  router.use('/' + subDomain + '*', (req, res, next) => {
    if (req.user) {
        if (req.user._doc.departamento !== subDomain) {
            res.status(403).send('FORBIDDEN!!');
        }else{
            next();
        }
    } else {
        res.redirect('/');
    }
    
}); */


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


router.post('/' + subDomain + '/addAcao', function (req, res) {
    comumControler.criaAcao(req, function (err) {
        if (err) res.status(300).send('Ocorreu um ERRO tente Novamente mais tarde!!!');
        else {
            res.status(200).redirect('/'+subDomain);
        }

    });
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
    comumControler.getProcessosTabela(function(err,result){
        if(err !== null){
            console.log(err.message);
            res.send(null);
        }else{
            res.send(result);
        }
    });
});


router.post('/'+subDomain+'/checkIfExistsNumAluno',function(req,res){
    comumControler.checkIfExistsNumeroAluno(req.sanitize(req.body.numeroAluno),function(err,result){
        if(err === null){
            res.send(result);
        }
    })
});

router.post('/'+subDomain+'/countProcessos',function(req,res){
    comumControler.countTotalProcessos(function(count){
            res.send({num: count});
    })
});

router.post('/'+subDomain+'/checkIfExistsAssSocial',function(req,res){
   comumControler.checkIfExistsAssSocial(req.sanitize(req.body.assistenteSocial),function(err,result){
        if(err === null){
            res.send(result);
        }
    })
});


router.post('/'+subDomain+'/getEntidades',function(req,res){
    comumControler.getEntidades(function(err,result){
        if(err !== null){
            console.log(err.message);
            res.send(null);
        }else{
            res.send(result);
        }
    })
});

router.post('/'+subDomain+'/getDossier',function(req,res){
   comumControler.getDossier(req.sanitize(req.body.numeroAluno),function(result){
        res.send(result);
   });
});

router.post('/'+subDomain+'/getProcesso',function(req,res){
    comumControler.getProcesso(req.sanitize(req.body.numeroInterno),function(result){
         res.send(result);
    });
 });

module.exports = router;