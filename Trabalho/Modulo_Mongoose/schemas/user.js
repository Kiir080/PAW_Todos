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
    departamento: {type:String, enum:['assistenteSocial','administrador']}
});

userSchema.methods.findById=function(targetId){
    return this.model('users').findOne({id: targetId});
}

userSchema.plugin(passportLocalMongoose,{
    usernameQueryFields: ['id'],
    selectFields: ['username','departamento']
});

module.exports = userSchema;