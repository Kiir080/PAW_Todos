const {
    mongoManager
} = require('../Modulo_Mongoose/mongoManager');

const dossierSchema = require('../Modulo_Mongoose/schemas/dossier.js');
const procurarEntidade = require('./administracaoControler').procurarEntidade;
const userSchema = require('../Modulo_Mongoose/schemas/user.js');

function criarDossier(req, callback) {
    const body=req.body;
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');
    Dossier.findOne({
        numeroAluno: `${req.sanitize(body.numeroAluno)}`
    }).exec((err, result) => {
        if (err) callback(err);
        else if (result !== null) {
            callback(new Error('O Numero do Aluno já existe'));
        } else {
            procurarEntidade(req.sanitize(body.id), function (res) {
                var temp = new Dossier({
                    numeroAluno: req.sanitize(body.numeroAluno),
                    nomeAluno: req.sanitize(body.nomeAluno),
                    dataNascimento: req.sanitize(body.dataNascimento),
                    contacto: req.sanitize(body.contacto),
                    processo: {
                        estado: 'aberto',
                        anoLetivo: req.sanitize(body.anoLetivo),
                        assistenteSocial: req.sanitize(body.assistenteSocial),
                        numeroInterno: req.sanitize(body.numeroInterno),
                        dataRegisto: req.sanitize(body.dataRegisto),
                        observacoes: req.sanitize(body.observacoes),
                        problema: {
                            descricao: req.sanitize(body.descricao),
                            tipo: req.sanitize(body.tipo),
                            data: body.data
                        },
                        entidade: {
                            id: res.id,
                            nome: res.nome,
                            contacto: res.contacto
                        }
                    }
                });
                temp.save(callback(err));
            })

        }
    })
}

function addProcesso(req, callback) {
    const body=req.body;
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');
    Dossier.findOne({
        numeroAluno: `${req.sanitize(body.numeroAluno)}`
    }).exec((err, result) => {
        if (err) callback(err);
        else if (result !== null) {
            procurarEntidade(req.sanitize(body.id), function (res) {
                var temp = new Dossier({
                    numeroAluno:result.numeroAluno,
                    nomeAluno: result.nomeAluno,
                    dataNascimento: result.dataNascimento,
                    contacto: result.contacto,
                    processo: {
                        numeroInterno: req.sanitize(body.numeroInterno),
                        anoLetivo: req.sanitize(body.anoLetivo),
                        estado: 'aberto',
                        assistenteSocial: req.sanitize(body.assistenteSocial),
                        dataRegisto: Date.now(),
                        observacoes:req.sanitize( body.observacoes),
                        problema: {
                            descricao: req.sanitize(body.descricao),
                            tipo: req.sanitize(body.tipo),
                            data: req.sanitize(body.data)
                        },
                        entidade: {
                            id: res.id,
                            nome: res.nome,
                            contacto: res.contacto
                        }
                    }
                });
                temp.save(callback(err));
            });

        } else {
            callback(new Error('O aluno não existe'));
        }

    })

}

function atualizarProblema (req, callback) {
    const body=req.body;
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');
    Dossier.findByNumeroInterno(req.sanitize(body.numeroInterno),(err, result) => {
    if (err) callback(err);
    else if (result !== null) {
        
        result.processo.problema.descricao = req.sanitize(body.descricao);
        result.processo.problema.tipo = req.sanitize(body.tipo);
        result.processo.problema.data = req.sanitize(body.data);
        
        result.save();
        callback();

    } else {
        callback(new Error('Não atualizou o problema'));
    }
})
}


function getProcessos(callback){
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');
    Dossier.find().select({ 'processo.numeroInterno': 1, numeroAluno: 1, nomeAluno: 1, 'processo.estado':1,'processo.assistenteSocial':1,'processo.anoLetivo':1,'processo.dataRegisto':1,'processo.problema.tipo':1,'processo.entidade':1}).exec(function(err,result){
        if (err) callback(err);
        else {
            callback(null,result);
        }
    })
}


function getDossier(req,callback){
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');
    Dossier.findOne({
        numeroAluno: `${req.sanitize(req.body.numeroAluno)}`
    }).exec((err, result) => {
        if (err) callback(err);
        else{
            callback(result);
        }
    });
}


function getProcesso(req,callback){
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');
    Dossier.findOne({
        'processo.numeroInterno': `${req.sanitize(req.body.numeroInterno)}`
    }).exec((err, result) => {
        if (err) callback(err);
        else{
            callback(result);
        }
    });
}

function checkIfExistsNumeroAluno(numeroAluno,callback){
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');
    Dossier.findOne({
        numeroAluno : `${numeroAluno}`
    }).exec((err, result) => {
        if (err) callback(err);
        else{
            callback(null,result !== null);
        }
    });
}

function checkIfExistsAssSocial(assistenteSocial,callback){
    const User =  mongoManager.connect(userSchema, 'users');
    User.findOne({id: `${assistenteSocial}`}).exec(function(err,result){
        if (err) callback(err);
        else if(result !== null){
            callback(null,result.departamento === 'assistenteSocial')
        }else{
            callback(null,false);
        }
    })
   
}

exports.checkIfExistsAssSocial=checkIfExistsAssSocial;
exports.checkIfExistsNumeroAluno=checkIfExistsNumeroAluno;
exports.getProcesso=getProcesso;
exports.getDossier=getDossier;
exports.getProcessos=getProcessos;
exports.addProcesso = addProcesso;
exports.atualizarProblema = atualizarProblema;
exports.criarDossier = criarDossier;