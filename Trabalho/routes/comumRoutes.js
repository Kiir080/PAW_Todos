const express = require('express');
const router = express.Router();

const comumControler= require('../controller/comumControler.js');


router.post('/addAcao', function (req, res) {
    comumControler.criaAcao(req, function (err) {
        if (err) res.status(300).send('Ocorreu um ERRO tente Novamente mais tarde!!!');
        else {
            res.status(200).redirect('/'+ req.user.departamento);
        }

    });
});

router.post('/terminarProcesso',function(req,res){
    comumControler.terminarProcesso(req,function(err){
        if (err) res.status(300).send(err.message);
        else {
            res.status(200).send("Processo terminado");
        }
    })     
 });


router.post('/getProcessos',function(req,res){
    if(req.user.departamento==='assistenteSocial'){
        comumControler.getProcessosTabela(function(err,result){
            if(err !== null){
                console.log(err.message);
                res.send(null);
            }else{
                res.send(result);
            }
        }, req.user.id);
    }else{
        comumControler.getProcessosTabela(function(err,result){
            if(err !== null){
                console.log(err.message);
                res.send(null);
            }else{
                res.send(result);
            }
        });
    }
    
});

router.post('/checkIfExistsNumAluno',function(req,res){
    comumControler.checkIfExistsNumeroAluno(req.sanitize(req.body.numeroAluno),function(err,result){
        if(err === null){
            res.send(result);
        }
    })
});

router.post('/countProcessos',function(req,res){
    comumControler.countTotalProcessos(function(count){
            res.send({num: count});
    })
});

router.post('/checkIfExistsAssSocial',function(req,res){
   comumControler.checkIfExistsAssSocial(req.sanitize(req.body.assistenteSocial),function(err,result){
        if(err === null){
            res.send(result);
        }
    })
});


router.post('/getEntidades',function(req,res){
    comumControler.getEntidades(function(err,result){
        if(err !== null){
            console.log(err.message);
            res.send(null);
        }else{
            res.send(result);
        }
    })
});

router.post('/getDossier',function(req,res){
    comumControler.getDossier(req.sanitize(req.body.numeroAluno),function(result){
         res.send(result);
    });
});
 
router.post('/getProcesso',function(req,res){
     comumControler.getProcesso(req.sanitize(req.body.numeroInterno),function(result){
          res.send(result);
     });
});


module.exports = router;