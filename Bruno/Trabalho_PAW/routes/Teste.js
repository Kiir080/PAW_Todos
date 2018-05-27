const express = require('express');
const router = express.Router();

const {
    mongoManager
} = require('../Modulo_Mongoose/mongoManager');

let mongoMan = new mongoManager('hospital', 'doentes');

const doenteSchema = require('../Modulo_Mongoose/schemas/doente.js');

router.get('/teste',function(req,res){
    const Doente = mongoMan.connect(doenteSchema);
    Doente.find().exec((err,result)=>{
        if (err) throw err;
        else {
           res.render("teste");
        }
      });
      
});

router.get('/json',function(req,res){
    const Doente = mongoMan.connect(doenteSchema);
    Doente.find().exec((err,result)=>{
        if (err) throw err;
        else {
            res.send(result);
        }
      });
});

module.exports = router;
