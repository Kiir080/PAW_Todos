const express = require('express');
const router = express.Router();

const adminControler = require('../controller/administracaoControler');
const comumControler= require('../controller/comumControler.js');
const subDomain = 'administracao';


/* router.use('/' + subDomain + '*', (req, res, next) => {
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
    res.render('administracaoFrontPage');
});

router.post('/'+subDomain+'/countEntidades',function(req,res){
   comumControler.countEntidades(function(result){
       res.send({num: result});
   })     
});

router.post('/' + subDomain + '/criarEntidade', function (req, res) {
    adminControler.criarEntidade(req, function (err) {
        if (!err) {
            res.status(200).redirect('/' + subDomain);
        } else {
            res.status(300).send(err.message);
        }
    })
});

router.post('/' + subDomain + '/editarEntidade', function (req, res) {
    adminControler.editarEntidade(req, function (err) {
        if (!err) {
            res.status(200).redirect('/' + subDomain);
        } else {
            res.status(300).send(err.message);
        }
    })
});


router.post('/' + subDomain + '/addAcao', function (req, res) {
    comumControler.criaAcao(req, function (err) {
        if (err) res.status(300).send('Ocorreu um ERRO tente Novamente mais tarde!!!');
        else {
            res.status(200).redirect('/'+subDomain);
        }

    });
});

router.post('/' + subDomain + '/eliminaAcao', function (req, res) {
    adminControler.eliminaAcao(req, function (err) {
        if (err) res.status(300).send(err.message);
        else {
            res.status(200).send("Ação Eliminada");
        }

    });
});

router.post('/' + subDomain + '/editaAcao', function (req, res) {
    adminControler.editaAcao(req, function (err) {
        if (err) res.status(300).send(err.message);
        else {
            res.status(200).send("Ação Editada");
        }

    });
});

router.post('/'+subDomain+'/getAcoes',function(req,res){
    adminControler.getAcao(req.sanitize(req.body),function(result){
            res.status(200).send(result);
    });
});

router.post('/'+subDomain+'/getProcessosAssSocial',function(req,res){
    adminControler.getProcessosAssSocial(req.sanitize(req.body.assistenteSocial),function(err,result){
        if(err !== null){
            console.log(err.message);
            res.send(null);
        }else{
            res.send(result);
        }
    });
});


router.post('/'+subDomain+'/getProcessosEmEsperaMaxima',function(req,res){
    adminControler.getProcessosEmEsperaMaxima(req.sanitize(req.body.targetDays),function(result){
        res.status(200).send(result);
    })
});

router.post('/'+subDomain+'/getTempo',function(req,res){
    adminControler.getTempo(function(result){
        res.status(200).send(result);
    })
});

router.post('/'+subDomain+'/saveTempo',function(req,res){
    adminControler.saveTempo(req,function(err){
        if(err){
            console.log(err);
            res.send(false);
        }else{
            res.send(true);
        }
    })
});

module.exports = router;