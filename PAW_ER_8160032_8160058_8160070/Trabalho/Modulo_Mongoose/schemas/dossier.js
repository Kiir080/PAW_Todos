const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let processoSchema = require('./processo.js');

let dossierSchema = new Schema({
    numeroAluno: {
        type: Number,
        min: 0,
        max: 999999999,
        required: true
    },
    nomeAluno: { type:String, required: true},
    dataNascimento: {
        type: Date
    },
    contacto: {
        type: Number,
        max: 999999999,
        min: 1,
        required: true
    },
    processo: processoSchema

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

dossierSchema.plugin(uniqueValidator);

module.exports = dossierSchema;