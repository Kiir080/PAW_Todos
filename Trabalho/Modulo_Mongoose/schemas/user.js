const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
let Schema = mongoose.Schema;

let idCount=0;


function currentId(){
    return ++idCount;
}

let userSchema = new Schema({
    id: {type: Number, min: 1, max: 500, required:true},
    password: {type:String},
    departamento: {type:String, enum:['assistenteSocial','administracao'], required:true}
});

userSchema.methods.findById=function(targetId){
    return this.model('users').findOne({id: targetId});
}

userSchema.plugin(passportLocalMongoose,{
    usernameField: 'id',
    selectFields: ['id','departamento']
});

module.exports = userSchema;