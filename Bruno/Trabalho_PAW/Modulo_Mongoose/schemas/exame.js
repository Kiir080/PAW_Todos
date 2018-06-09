const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ExameSchema = new Schema({
    nome: String,
    Resultado: String,
});

module.exports = ExameSchema;
