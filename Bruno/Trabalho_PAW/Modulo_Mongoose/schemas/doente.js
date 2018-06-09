const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let Ficha_UrgenciaSchema= require('./fichaUrgencia.js');

let doenteSchema = new Schema({
    Nome: String,
    Idade: {
        type: Number,
        min: 0,
        max: 150
    },
    Genero: {
        type: String,
        enum: ['Masculino', 'Feminino'],
    },
    Morada: String,
    Ficha_Urgencia: [Ficha_UrgenciaSchema],
    Numero_Processo: {
        type: Number,
        min: 0,
        max: 999999999
    },
    Numero_Utente: {
        type: Number,
        min: 0,
        max: 999999999
    },
});


doenteSchema.statics.findByNumU=function(targetNumU,callback){
    return this.model('doentes').findOne({ Numero_Utente: targetNumU},callback);
}

doenteSchema.methods.setInternamento=function(){
    Ficha_UrgenciaSchema.setInternamento();
}

module.exports = doenteSchema;