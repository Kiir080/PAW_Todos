const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ExameSchema = require('./exame.js');
let DepartementosSchema = require('./departamento.js');

let doenteSchema = new Schema({
    Nome: String,
    Idade: {
        type: Number,
        min: 0,
        max: 150
    },
    Genero: {
        type: String,
        enum: ['Masculino', 'Feminino'],
    },
    Morada: String,
    Numero_Processo: {
        type: Number,
        min: 0,
        max: 999999999
    },
    Numero_Utente: {
        type: Number,
        min: 0,
        max: 999999999
    },
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
    Estado: {
        type: String,
        enum: ['Triagem', 'Consulta', 'TriagemExame', 'ConsultaExame', 'Internamento', 'Terminado'],
    },
    Triagem: DepartementosSchema,
    Exames: DepartementosSchema,
    Consulta: DepartementosSchema,
    Rececao: DepartementosSchema

});


doenteSchema.statics.findByNumU=function(targetNumU,callback){
    return this.model('doentes').findOne({ Numero_Utente: targetNumU},callback);
}

doenteSchema.methods.setInternamento=function(){
    Ficha_UrgenciaSchema.setInternamento();
}

doenteSchema.statics.getLastFicha_Urgencia=function(callback,estado,estado2){
    this.model('doentes').where('Ficha_Urgencia').elemMatch(function (elem) {
        elem.where('Estado', estado)
        if(estado2!==null){
            elem.where('Estado', estado2)  
        }
      }).select("Ficha_Urgencia").exec(function(err,result){
        if(err) console.log(err);
        else{
            if(result.lenght>0){
                callback(result[resul.lenght-1]);
            }else{
                callback(false);
            }
        }
   });


}


module.exports = doenteSchema;