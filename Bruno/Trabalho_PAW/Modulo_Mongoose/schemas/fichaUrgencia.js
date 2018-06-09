const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let ExameSchema = require('./exame.js');
let DepartementosSchema = require('./departamento.js');

let Ficha_UrgenciaSchema = new Schema({
    Data_Entrada: {
        type: Date,
        default: Date.now
    },
    Data_Saida: {
        type: Date
    },
    Estado_Gravidade: {
        type: String,
        enum: ['Vermelho', 'Amarelo', 'Verde']
    },
    Observacoes: String,
    Exame: [ExameSchema],
    Numero_Processo: {
        type: Number,
        min: 0,
        max: 999999999
    },
    Estado: {
        type: String,
        enum: ['Triagem', 'Consulta', 'TriagemExame', 'ConsultaExame', 'Internamento', 'Terminado'],
    },
    Triagem: DepartementosSchema,
    Exames: DepartementosSchema,
    Consulta: DepartementosSchema,
    Rececao: DepartementosSchema
});

Ficha_UrgenciaSchema.methods.setInternamento=function(){
    this.Estado='Internamento';
}

module.exports = Ficha_UrgenciaSchema;