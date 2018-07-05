const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ProblemasSchema = require('./problemas.js');
let EntidadeSchema = require('./entidade.js');

let processoSchema = new Schema({
    estado: {
        type: String,
        enum: ['aberto', 'acompanhamento', 'encerrado']
    },

    assistenteSocial: {
        type: Number,
        min: 1,
        max: 999999
    },

    numeroInterno: {
        type: Number,
        min: 1,
        max: 999999
    },

    dataRegisto: {
        type: Date
    },

    observacoes: {
        type: String
    },

    entidade:EntidadeSchema,

    problema:ProblemasSchema

});

module.exports = processoSchema;