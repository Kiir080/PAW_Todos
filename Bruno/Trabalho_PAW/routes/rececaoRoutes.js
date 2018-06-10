const express = require('express');
const router = express.Router();

const rececaoController = require('../controller/rececaoControler.js');
const subDomain = 'Rececao';

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


router.get('/' + subDomain, function (req, res) {
    //res.render('rececao');
    res.render('rececaoT');
});

router.post('/' + subDomain + '/pesquisaU', function (req, res) {
    rececaoController.pesquisaUtente(req.body, function (result) {
        if (result) {

            res.send(result);
        }
    })
});


router.post('/' + subDomain + '/addFicha', function (req, res) {
    rececaoController.addFichaUrgencia(req.body, function (err) {
        if (!err) {
            res.status(200).send("Ficha adicionada");
        } else {
            res.status(300).send(err.message);
        }
    })
});


router.post('/' + subDomain + '/addDoente', function (req, res) {
    rececaoController.addDoente(req.body, function (err) {
        if (!err) {
            res.status(200).send("Doente adicionado");
        } else {
            res.status(300).send(err.message);
        }
    })
});
module.exports = router;