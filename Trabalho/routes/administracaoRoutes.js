const express = require('express');
const router = express.Router();

const adminController = require('../controller/administracaoController');
const subDomain = 'administracao';


router.get('/verAcoes',function(req,res){
    res.render('acoes');
})

router.post('/' + subDomain + '/addAcao', function (req, res) {
    adminController.criaAcao(req.body, function (err) {
        if (err) res.status(300).send(err.message);
        else {
            res.status(200).send("Ação Criada");
        }

    });
});

router.post('/' + subDomain + '/eliminaAcao', function (req, res) {
    adminController.eliminaAcao(req.body, function (err) {
        if (err) res.status(300).send(err.message);
        else {
            res.status(200).send("Ação Eliminada");
        }

    });
});

router.post('/getAcoes',function(req,res){
    adminController.getAcao(req.body,function(result){
        if(result !== null){
            res.status(200).send(result);
        }else{
            res.status(200).send(null);
        }
        
    })
})

module.exports = router;