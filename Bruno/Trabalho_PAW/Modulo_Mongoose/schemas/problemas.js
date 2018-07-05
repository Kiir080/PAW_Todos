const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let acoesSchema= require('./acoes.js')


let problemaSchema = new Schema({
    data: {
        type: Date,
        default: Date.now
    },
    tipo: {
        type: String,
        enum:['absentismo','indisciplina','consumoDrogas']
    },
    descricao: String,
    acoes:[acoesSchema]
});

module.exports = problemaSchema;