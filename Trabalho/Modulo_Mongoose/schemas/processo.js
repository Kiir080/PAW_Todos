const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let ProblemasSchema = require('./problemas.js');
let EntidadeSchema = require('./entidade.js');

let processoSchema = new Schema({
    estado: {
        type: String,
        enum: ['aberto', 'acompanhamento', 'encerrado'],
        required: true
    },

    assistenteSocial: {
        type: Number,
        min: 1,
        max: 999999,
        required: true
    },

    numeroInterno: {
        type: Number,
        min: 1,
        max: 999999,
        required: true,
        index:true,
        unique:true
    },

    dataRegisto: {
        type: Date,
        default: Date.now
    },

    observacoes: {
        type: String
    },

    entidade:EntidadeSchema,

    problema:ProblemasSchema

});
dossierSchema.plugin(uniqueValidator);
module.exports = processoSchema;