const express = require('express');
const router = express.Router();

const assistenteSocialControler = require('../controller/assistenteSocialControler.js');
const comumControler= require('../controller/comumControler.js');

const subDomain = 'assistenteSocial';

  router.use('/' + subDomain + '*', (req, res, next) => {
    if (req.user) {
        if (req.user._doc.departamento !== subDomain) {
            res.status(403).send('FORBIDDEN!!');
        }else{
            next();
        }
    } else {
        res.redirect('/');
    }
    
}); 


router.get('/'+subDomain,function(req,res){
    res.render('./assistenteSocialFrontPage',
    {id:req.user.id,
    departamento: req.user.departamento
    });
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


module.exports = router;