const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
let Schema = mongoose.Schema;

let idCount=0;


function currentId(){
    return ++idCount;
}

let userSchema = new Schema({
    id: {type: Number, min: 1, max: 500, set: currentId},
    username: {type:String, required:true},
    password: String,
    email: String,
    departamento: {type:String, enum:['Rececao','Triagem','Consulta','Exames','Gestor','Administrador']}
});

userSchema.plugin(passportLocalMongoose,{
    usernameQueryFields: ['id']
});

module.exports = userSchema;