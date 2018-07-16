const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let acoesSchema= require('./acoes.js')


let problemaSchema = new Schema({
    data: {
        type: Date,
        required: true
    },
    tipo: {
        type: String,
        enum:['absentismo','indisciplina','consumoDrogas'],
        required: true
    },
    descricao: String,
    acoes:[acoesSchema]
});

module.exports = problemaSchema;