const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let tempoSchema = new Schema({
    data: {
        type: Date,
        default: Date.now
    },
    tempo: {
        type: Number,
        required:true,
        min: 1,
    },
    idAdmin: {type: Number, min: 1, max: 500},
});

tempoSchema.statics.getLastTempo=function(callback){
    
    this.model('tempos').find().select({tempo:1}).exec(function(err,result){
            
                if(err || result.length===0){
                    //valor default de 5 dias
                        callback({tempo: 5});
                }else{
                    callback({tempo: result[result.length-1].tempo});
                }
                
            
        });
        
    
}

module.exports = tempoSchema;