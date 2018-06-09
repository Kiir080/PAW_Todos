const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let DepartementosSchema = new Schema({
    Data_Entrada: {
        type: Date,
        default: Date.now
    },
    Data_Saida: {
        type: Date
    },
    Observacoes: String,
    Id_Funcionario:{type: Number, min: 1, max: 500}
});

module.exports = DepartementosSchema;