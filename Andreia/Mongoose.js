const mongoose = require('mongoose');

let schema = mongoose.Schema;

let ExameSchema = new Schema({
    nome: String,
    Resultado: String,
})

let DepartementosSchema = new Schema({
    Data_Entrada: {type: Date, default: Date.now},
    Data_Saida: {type: Date},
    Observacoes: String,
})

let Ficha_UrgenciaSchema = new Schema({
    Data_Entrada: {type: Date, default: Date.now},
    Data_Saida: {type: Date},
    Estado_Gravidade: ['Vermelho', 'Amarelo', 'Verde'],
    Observacoes: String,
    Exame: [ExameSchema],
    Numero_Processo: {type: Number, min: 0, max: 999999999},
    Estado: ['Triagem', 'Consulta', 'Exame', 'Internamento', 'Terminado'],
    Triagem: DepartementosSchema,
    Exames: DepartementosSchema,
    Consulta: DepartementosSchema,
})

let doenteSchema = new Schema({
    Nome: String,
    Idade: {type: Number, min: 0, max: 150},
    Genero: ['Masculino', 'Feminino'],
    Morada: String,
    Ficha_Urgencia: [Ficha_UrgenciaSchema],
    Numero_Processo: {type: Number, min: 0, max: 999999999},
    Numero_Utente: {type: Number, min: 0, max: 999999999},
})

let Utilizador = new Schema({
    Nome: String,
    Password: String,
    id: {type: Number, min: 1, max: 500},
})

module.exports = doenteSchema;
