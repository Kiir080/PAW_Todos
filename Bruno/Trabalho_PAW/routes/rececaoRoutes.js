const express = require('express');
const router = express.Router();

const {
    mongoManager
} = require('../Modulo_Mongoose/mongoManager');



const doenteSchema = require('../Modulo_Mongoose/schemas/doente.js');



router.post('/addFicha',function(req,res){
    const doente = mongoManager.connect(doenteSchema,'doentes');
    doente.find({
        Numero_Utente : `${req.body.Numero_Utente}`
    }).exec((err,result)=>{
        if (err) throw err;
        else if (result.length === 1) {
            result.Ficha_Urgencia.push()
        mongoMan.disconnect();
        } else {
       
      }
    })
});


router.post('/addDoente',function(req,res){
    const doente = mongoManager.connect(doenteSchema,'doentes');
    Doente.find({
        Numero_Utente : `${req.body.Numero_Utente}`
    }).exec((err,result)=>{
        if (err) throw err;
        else if (result.length === 1) {
            res.status(200).send("Numero de Utente ja existe");
        mongoMan.disconnect();
        } else {
            var temp = new Doente(req.body);
            temp.save((err) => {
                if (err) throw err;
                res.status(200).send("Doente adicionado");
                
            });
      }
    })
});
module.exports = router;



// function findByNumUtente(req,res){
//     const doente = mongoMan.connect(doenteSchema);
//     doente.find({
//         Numero_Utente : `${res.body.Numero_Utente}`
//     }).exec((err,result)=>{
//         if (err) throw err;
//         if (result.length === 1) {
//             result.Ficha_Urgencia.push()
//         mongoMan.disconnect();
//         } else {
       
//       }
//     })
// }