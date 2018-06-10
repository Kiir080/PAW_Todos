const {
    mongoManager
  } = require('../Modulo_Mongoose/mongoManager');

const doenteSchema = require('../Modulo_Mongoose/schemas/doente.js');


function getDoentesTriagem(callback){
    const Doente = mongoManager.connect(doenteSchema, 'doentes');
    Doente.find().or([{Estado:'TriagemExame'},{Estado:'Triagem'}]).select({ Numero_Utente: 1, Nome: 1, Data_Entrada: 1, Estado:1}).exec(function(err,result){
        if (err) callback(err);
        if (result.lenght===0) {
            callback(new Error('O Não existem doentes nesse Estado'));
        } else {
            callback(result);
        }
    })

}


function getDoente(id,callback){
    const Doente = mongoManager.connect(doenteSchema, 'doentes');
    Doente.findOne({Numero_Utente: id, Estado: 'Triagem'}).exec(function(err,result){
            if(err) callback(err);
            if (result===null) {
                callback(new Error('O Doente não existe!!'));
            } else {
                callback(result);
            }
    })
}


exports.getDoente=getDoente;
exports.getDoentesTriagem = getDoentesTriagem;

