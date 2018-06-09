const express = require('express');
const router = express.Router();

const rececaoController = require('../controller/rececaoControler.js');



router.get('/rececao',function(req,res){
   if(req.session.passport){
    res.render('rececao');
   }else{
       res.redirect('/');
   }
   
    }
);

router.post('/rececao',function(req,res){
    res.send(req.session);
    }
);

router.post('/addFicha',function(req,res){
    rececaoController.addFichaUrgencia(req.body,function(err){
        if(!err){
            res.status(200).send("Ficha adicionada"); 
        }else{
            res.status(300).send(err.message);
        }
    })
});


router.post('/addDoente',function(req,res){
    rececaoController.addDoente(req.body,function(err){
        if(!err){
            res.status(200).send("Doente adicionado"); 
        }else{
            res.status(300).send(err.message);
        }
    })
});
module.exports = router;

