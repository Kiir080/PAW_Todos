const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let acoesSchema = new Schema({
    data: {
        type: Date,
        default: Date.now
    },
    tipo: {
        type: String,
        enum:['reunião','pedido','encaminhamento','expulsão','suspensão'],
        required:true
    },
    descricao: String,
});

module.exports = acoesSchema;