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
    dataNascimento: {
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

module.exports = dossierSchema;