const {
    mongoManager
} = require('../Modulo_Mongoose/mongoManager');

const dossierSchema = require('../Modulo_Mongoose/schemas/dossier.js');
const userSchema = require('../Modulo_Mongoose/schemas/user.js');
const entidadeSchema = require('../Modulo_Mongoose/schemas/entidade.js');

function criaAcao(req, callback) {
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');

    Dossier.update({
        'processo.numeroInterno': req.sanitize(req.body.numeroInterno)
    }, {
            $push: {
                'processo.problema.acoes': {
                    data: new Date(req.sanitize(req.body.data)).toISOString(),
                    tipo: req.sanitize(req.body.tipo),
                    descricao: req.sanitize(req.body.descricao)
                }
            },
            $set: {
                'processo.estado': 'acompanhamento',
                dataEncaminhamento: Date.now
            }
        }, callback);
}



function countTotalProcessos(callback, queryObj) {
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');
    if (queryObj) {
        Dossier.count(queryObj).exec((err, count) => {
            if (err) callback(0);
            else {
                callback(count);
            }
        });
    } else {
        Dossier.find().exec((err, result) => {
            if (err) callback(0);
            else {
                callback(result.length);
            }
        });
    }
}

function countTotalProcessosAssSocial(assistenteSocial, callback) {
    countTotalProcessos({
        'processo.assistenteSocial': assistenteSocial
    }, function (count) {
        callback(count);
    });
}

function countTotalProcessosAluno(numeroAluno, callback) {
    countTotalProcessos({
        numeroAluno: numeroAluno
    }, function (count) {
        callback(count);
    });
}

function countTotalAtribuicoesEntidade(entidadeId, callback) {
    countTotalProcessos({
        'processo.entidade': entidadeId
    }, function (count) {
        callback(count);
    });
}



function getProcessosTabela(callback, assistenteSocial) {

    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');

    if (assistenteSocial) {
        Dossier.find({
            'processo.assistenteSocial': assistenteSocial
        }).select({
            'processo.numeroInterno': 1,
            numeroAluno: 1,
            nomeAluno: 1,
            'processo.estado': 1,
            'processo.anoLetivo': 1,
            'processo.dataRegisto': 1,
            'processo.problema.tipo': 1,
            'processo.entidade': 1
        }).exec(function (err, result) {
            if (err) callback(err);
            else {
                callback(null, result);
            }
        });
    } else {
        Dossier.find().select({
            'processo.numeroInterno': 1,
            numeroAluno: 1,
            nomeAluno: 1,
            'processo.estado': 1,
            'processo.assistenteSocial': 1,
            'processo.assistenteSocial': 1,
            'processo.anoLetivo': 1,
            'processo.dataRegisto': 1,
            'processo.problema.tipo': 1,
            'processo.entidade': 1
        }).exec(function (err, result) {
            if (err) callback(err);
            else {
                callback(null, result);
            }
        });
    }
}


function getDossier(numeroAluno, callback) {
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');
    Dossier.findOne({
        numeroAluno: `${numeroAluno}`
    }).exec((err, result) => {
        if (err) callback(err);
        else {
            callback(result);
        }
    });
}


function getProcesso(numeroInterno, callback) {
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');
    Dossier.findOne({
        'processo.numeroInterno': `${numeroInterno}`
    }).exec((err, result) => {
        if (err) callback(err);
        else {
            callback(result);
        }
    });
}

function checkIfExistsNumeroAluno(numeroAluno, callback) {
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');
    Dossier.findOne({
        numeroAluno: `${numeroAluno}`
    }).exec((err, result) => {
        if (err) callback(err);
        else {
            callback(null, result !== null);
        }
    });
}

function checkIfExistsAssSocial(assistenteSocial, callback) {
    const User = mongoManager.connect(userSchema, 'users');
    User.findOne({
        id: `${assistenteSocial}`
    }).exec(function (err, result) {
        if (err) callback(err);
        else if (result !== null) {
            callback(null, result.departamento === 'assistenteSocial')
        } else {
            callback(null, false);
        }
    })

}

function procurarEntidade(id, callback) {
    const Entidade = mongoManager.connect(entidadeSchema, 'entidades');
    Entidade.findOne({
        id: `${id}`
    }).exec((err, result) => {
        if (err) callback(err);
        if (result !== null) {
            callback(result);
        } else {
            callback(new Error('A entidade nao existe'));
        }

    });

}

function getEntidades(callback) {
    const Entidade = mongoManager.connect(entidadeSchema, 'entidades');
    Entidade.find().exec(function (err, result) {
        if (err) callback(err);
        else {
            callback(null, result);
        }
    })
}


function countEntidades(callback) {
    const Entidade = mongoManager.connect(entidadeSchema, 'entidades');
    Entidade.find().exec((err, result) => {
        if (err) callback(0);
        else {
            callback(result.length);
        }
    });
}


function countUtilizador(callback) {
    const User = mongoManager.connect(userSchema, 'users');
    User.find().exec((err, result) => {
        if (err) callback(0);
        else {
            callback(result.length);
        }
    });
}



function terminarProcesso(req, callback) {
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');
    Dossier.updateOne({
        'processo.numeroInterno': `${req.sanitize(req.body.numeroInterno)}`
    }, {
            $set: {
                'processo.estado' : 'encerrado'
            }
        },
        callback
);
}

exports.terminarProcesso = terminarProcesso;
exports.countUtilizador = countUtilizador;
exports.countEntidades = countEntidades;
exports.criaAcao = criaAcao;
exports.getEntidades = getEntidades;
exports.procurarEntidade = procurarEntidade;
exports.checkIfExistsAssSocial = checkIfExistsAssSocial;
exports.checkIfExistsNumeroAluno = checkIfExistsNumeroAluno;
exports.getProcesso = getProcesso;
exports.getDossier = getDossier;
exports.getProcessosTabela = getProcessosTabela;
exports.countTotalProcessosAssSocial = countTotalProcessosAssSocial;
exports.countTotalAtribuicoesEntidade = countTotalAtribuicoesEntidade;
exports.countTotalProcessosAluno = countTotalProcessosAluno;
exports.countTotalProcessos = countTotalProcessos;