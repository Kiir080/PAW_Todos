const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let entidadeSchema = new Schema({
    id: {
        type: Number,
        min: 0,
        max: 999999999,
        required:true
    },
    nome: {type:String, required:true},
    contacto: {
        type: Number,
        max: 999999999,
        min: 1,
        required:true
    }
});

module.exports = entidadeSchema;
