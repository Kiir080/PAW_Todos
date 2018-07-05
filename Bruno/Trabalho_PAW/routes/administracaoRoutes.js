const express = require('express');
const router = express.Router();

const adminController = require('../controller/administracaoController');
const subDomain = 'administracao';


router.post('/' + subDomain + '/criaAcao', function (req, res) {
    adminController.criaAcao(req.body,function(){
        res.send("Ação Criada");
});
});

module.exports = router;