const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let processoSchema = require('./processo.js');

let dossierSchema = new Schema({
    numeroAluno: {
        type: Number,
        min: 0,
        max: 999999999
    },
    nomeAluno: String,
    DataNascimento: {
        type: Date
    },
    anoLetivo: {
        type: String,
        min: 9,
        max: 9
    },
    contacto: {
        type: Number,
        max: 9
    },
    processo: processoSchema,

});

dossierSchema.statics.findByNumeroInterno=function(numeroInterno,callback){
    this.model('dossiers').findOne({'processo.numeroInterno':numeroInterno}).exec(function(err,result){
        if(err) console.log(err);
        else{
            if(result!==null){
                callback(null,result);
            }else{
                callback (new Error('Numero Interno não existe!!'));
            }
        }
   });


}

module.exports = dossierSchema;