const {
    mongoManager
  } = require('../Modulo_Mongoose/mongoManager');



const doenteSchema = require('../Modulo_Mongoose/schemas/doente.js');
const Ficha_UrgenciaSchema = require('../Modulo_Mongoose/schemas/fichaUrgencia.js');


function addFichaUrgencia(body, callback) {
    const Doente = mongoManager.connect(doenteSchema, 'doentes');
    Doente.findOne({
        Numero_Utente: `${body.Numero_Utente}`
    }).exec((err, result) => {
        if (err) callback(err);
        if (result !== null) {
            result.Ficha_Urgencia.push({
                Numero_Processo: body.Numero_Processo,
                Estado: 'Triagem',
                Rececao:{
                    Data_Saida:Date.now(),
                    Observacoes: body.Observacoes,
                    Id_Funcionario: body.Id_Funcionario 
                } 
            });
            result.save(callback(err));
        }else{
            callback(new Error('O Numero de Utente Não existe'));
        }
        
    })

}

function addDoente(body,callback){
    const Doente = mongoManager.connect(doenteSchema,'doentes');
    Doente.findOne({
        Numero_Utente : `${body.Numero_Utente}`
    }).exec((err,result)=>{
        if (err) callback(err);
        else if (result !== null) {
            callback(new Error('O Numero de Utente já existe'));
        } else {
            var temp = new Doente(body);
            temp.save(callback(err));
      }
    })
}


exports.addDoente = addDoente;
exports.addFichaUrgencia = addFichaUrgencia;