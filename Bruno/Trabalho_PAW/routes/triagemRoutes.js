const express = require('express');
const router = express.Router();
//const socket= require('../app.js')


const subDomain = 'Triagem';

const triagemControler = require('../controller/triagemControler.js');

router.get('/' + subDomain, function (req, res) {
    res.render('triagemFrontPage');

});

router.post('/' + subDomain + '/ajax', function (req, res) {
    triagemControler.getDoentesTriagem(function (result) {
        res.send(result);
    });
});

router.get('/' + subDomain + '/id=*', function (req, res) {
    var id = req.params[0];
    triagemControler.getDoente(id, function (result, err) {
        if (err) {
            console.log(err);
        } else {
            res.render("triagemDoente", {
                Numero_Utente: result.Numero_Utente,
                Nome: result.Nome,
                Idade: result.Idade,
                Genero: result.Genero
            });
        }
    })
})

module.exports = router;