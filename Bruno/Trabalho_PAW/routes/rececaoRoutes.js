const express = require('express');
const router = express.Router();

const {
    mongoManager
} = require('../Modulo_Mongoose/mongoManager');

let mongoM = new mongoManager('hospital', 'doentes');

const doenteSchema = require('../Modulo_Mongoose/schemas/doente');



router.post('/addFicha',function(req,res){
    const doente = mongoMan.connect(doenteSchema);
    doente.find({
        Numero_Utente : `${req.body.nUtente}`
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
    const Doente = mongoMan.connect(doenteSchema);
    Doente.find({
        Numero_Utente : `${req.body.nUtente}`
    }).exec((err,result)=>{
        if (err) throw err;
        else if (result.length === 1) {
            res.status(200).send("Numero de Utente ja existe");
        mongoMan.disconnect();
        } else {
            var temp = new Doente(req.body);
            temp.save((err) => {
                if (err) throw err;
            });
      }
    })
});

// function findByNumUtente(req,res){
//     const doente = mongoMan.connect(doenteSchema);
//     doente.find({
//         Numero_Utente : `${res.body.nUtente}`
//     }).exec((err,result)=>{
//         if (err) throw err;
//         if (result.length === 1) {
//             result.Ficha_Urgencia.push()
//         mongoMan.disconnect();
//         } else {
       
//       }
//     })
// }