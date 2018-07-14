const {
    mongoManager
} = require('../Modulo_Mongoose/mongoManager');

const dossierSchema = require('../Modulo_Mongoose/schemas/dossier');
const entidadeSchema = require('../Modulo_Mongoose/schemas/entidade.js');
const comumControler = require('../controller/comumControler.js');
const tempoSchema = require('../Modulo_Mongoose/schemas/tempo.js');

function eliminaAcao(req, callback) {

    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');
    Dossier.update({
        'processo.numeroInterno': req.sanitize(req.body.numeroInterno)
    }, {
        $pull: {
            'processo.problema.acoes': {
                data: req.sanitize(req.body.data),
                tipo: req.sanitize(req.body.tipo),
                descricao: req.sanitize(req.body.descricao)
            }
        }

    }, {
        multi: true
    }, callback);


}

function editaAcao(req, callback) {
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');
    Dossier.updateOne({
        $and: [{
                'processo.numeroInterno': req.sanitize(req.body.numeroInterno)
            },
            {
                'processo.problema.acoes': {
                    $elemMatch: {
                        data: req.sanitize(req.body.data),
                        tipo: req.sanitize(req.body.tipo),
                        descricao: req.sanitize(req.body.descricao)
                    }
                }
            }
        ]
    }, {
        $set: {
            'processo.problema.acoes.$.data': new Date(req.sanitize(req.body.dataNew)).toISOString(),
            'processo.problema.acoes.$.tipo': req.sanitize(req.body.tipoNew),
            'processo.problema.acoes.$.descricao': req.sanitize(req.body.descricaoNew)
        }
    }, callback);
}


function getAcao(req, callback) {
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');

    Dossier.findOne({
        'processo.numeroInterno': req.sanitize(req.body.numeroInterno)
    }).exec(function (err, result) {
        if (err) callback(err);
        if (result !== null) {
            callback(result.processo.problema.acoes);
        } else {
            callback(null);
        }

    });
}

function criarEntidade(req, callback) {
    const Entidade = mongoManager.connect(entidadeSchema, 'entidades');
    Entidade.findOne({
        id: `${req.sanitize(req.body.id)}`
    }).exec((err, result) => {
        if (err) callback(err);
        else if (result !== null) {
            callback(new Error('A entidade já existe'));
        } else {
            var temp = new Entidade({
                id: req.sanitize(req.body.id),
                nome: req.sanitize(req.body.nome),
                contacto: req.sanitize(req.body.contactoE)
            });
            temp.save(callback(err));
        }
    })
}



function editarEntidade(req, callback) {
    const Entidade = mongoManager.connect(entidadeSchema, 'entidades');
    Entidade.findOne({
        id: `${req.sanitize(req.body.id)}`
    }).exec((err, result) => {
        if (err) callback(err);
        else {
            result.nome = req.sanitize(req.body.nome);
            result.contacto = req.sanitize(req.body.contactoE);

            result.save(function(){
                atualizarEntidade(req, callback);
            });
           

        }
    });
}



function atualizarEntidade(req, callback) {
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');
        Dossier.updateMany({
            'processo.entidade.id': req.sanitize(req.body.id)
        }, {
            $set: {
            'processo.entidade.nome': req.sanitize(req.body.nome),
            'processo.entidade.contacto': req.sanitize(req.body.contacto)
            }
        }).exec(function (err) {
            if (err) callback(err);
            else {
                callback();
            }
        });
}


function getProcessosAssSocial(assistenteSocial, callback) {

    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');


    Dossier.find({
        'processo.assistenteSocial': assistenteSocial
    }).exec(function (err, result) {
        if (err) callback(err);
        else {
            callback(null, result);
        }
    });
}


function getTempo(callback) {
    const Tempo = mongoManager.connect(tempoSchema, 'tempos');
    Tempo.getLastTempo(function(result){
        callback(result);
    });
}

function saveTempo(req,callback) {
    const Tempo = mongoManager.connect(tempoSchema, 'tempos');
    let temp = new Tempo({
        tempo: req.sanitize(req.body.tempo),
        idAdmin: req.sanitize(req.user.id)
    });
    temp.save(function(err){
        callback(err);
    });
}

function getProcessosEmEsperaMaxima(targetDays,callback) {
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');
    let array = [];
    Dossier.find({
        'processo.estado': 'aberto'
    }).select({'processo.dataRegisto':1,'processo.numeroInterno':1,'processo.assistenteSocial':1}).exec(function(err,result){
        if(err){
            console.log(err);
            callback(false);
        }else{
            if(result.length===0){
                callback(false);
            }else{
                for(var i=0;i< result.length;i++){
                    addToarray(targetDays,result[i],array);
                }

                if(array.length===0){
                    callback(false);
                }else{
                    callback(array);
                }
            }
        } 
    })




}

function addToarray(targetDays, result, array) {
    let dataProcesso = new Date(result.processo.dataRegisto);
    let dataHj= new Date();
    let mills = Math.abs(dataHj.getTime() - dataProcesso.getTime());
    let dias = Math.ceil(mills / (24 * 3600 * 1000));
    if (targetDays < dias) {
        array.push({
            numeroInterno: result.processo.numeroInterno,
            assistenteSocial: result.processo.assistenteSocial,
            diasAtraso: dias-targetDays
        })
    }
}


function atualizarProblema (req, callback) {
    const body=req.body;
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');
    Dossier.updateOne({ 'processo.numeroInterno': req.sanitize(body.numeroInterno)},
        {$set:{
        'processo.problema.descricao': req.sanitize(body.descricao),
        'processo.problema.tipo' : req.sanitize(body.tipo),
        'processo.problema.data' : new Date(req.sanitize(body.data)).toISOString()}
        },
   callback);
}

exports.atualizarProblema = atualizarProblema;
exports.getProcessosEmEsperaMaxima=getProcessosEmEsperaMaxima;
exports.saveTempo = saveTempo;
exports.getTempo = getTempo;
exports.editaAcao = editaAcao;
exports.getProcessosAssSocial = getProcessosAssSocial;
exports.criarEntidade = criarEntidade;
exports.editarEntidade = editarEntidade;
exports.getAcao = getAcao;
exports.eliminaAcao = eliminaAcao;