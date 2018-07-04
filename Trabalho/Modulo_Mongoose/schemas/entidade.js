const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let entidadeSchema = new Schema({
    id: {
        type: Number,
        min: 0,
        max: 999999999
    },
    nome: String,
    contacto: {
        type: Number,
        max: 9
    }
});

module.exports = entidadeSchema;
