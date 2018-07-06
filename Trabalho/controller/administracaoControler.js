const {
    mongoManager
} = require('../Modulo_Mongoose/mongoManager');

const dossierSchema = require('../Modulo_Mongoose/schemas/dossier');
const entidadeSchema = require('../Modulo_Mongoose/schemas/entidade.js');


function criaAcao(body, callback) {
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');

    Dossier.update({
        'processo.numeroInterno': body.numeroInterno
    }, {
        $push: {
            'processo.problema.acoes': {
                data: body.data,
                tipo: body.tipo,
                descricao: body.descricao
            }
        }
    }, callback);
}


function eliminaAcao(body, callback) {
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');

    Dossier.update({
        'processo.numeroInterno': body.numeroInterno
    }, {
        $pull: {
            'processo.problema.acoes': {
                data: body.data,
                tipo: body.tipo,
            }
        }
    }, callback);


}

function getAcao(body, callback) {
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');

    Dossier.findOne({
        'processo.numeroInterno': body.numeroInterno
    }).exec(function (err, result) {
        if (err) callback(err);
        if (result !== null) {
            callback(result.processo.problema.acoes);
        } else {
            callback(null);
        }

    });
}

function criarEntidade(body, callback) {
    const Entidade = mongoManager.connect(entidadeSchema, 'entidades');
    Entidade.findOne({
        id: `${body.id}`
    }).exec((err, result) => {
        if (err) callback(err);
        else if (result !== null) {
            callback(new Error('A entidade já existe'));
        } else {
            var temp = new Entidade({
                id: body.id,
                nome: body.nome,
                contacto: body.contactoE
            });
            temp.save(callback(err));
        }
    })
}



function editarEntidade(body, callback) {
    const Entidade = mongoManager.connect(entidadeSchema, 'entidades');
    Entidade.findOne({
        id: `${body.id}`
    }).exec((err, result) => {
        if (err) callback(err);
        else {
            result.nome = body.nome;
            result.contacto = body.contactoE;

            result.save();
            atualizarEntidade(body, callback);

        }
    });
}



function atualizarEntidade(body, callback) {
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');
    procurarEntidade(body.id, function (res) {
        Dossier.updateMany({
            'processo.entidade.id': body.id
        }, {
            'processo.entidade.nome': res.nome,
            'processo.entidade.contacto': res.contacto
        }).exec(function (err) {
            if (err) callback(err);
            else {
                callback();
            }
        });

    });
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

function getEntidades(callback){
    const Entidade = mongoManager.connect(entidadeSchema, 'entidades');
    Entidade.find().exec(function(err,result){
        if (err) callback(err);
        else {
            callback(null,result);
        }
    })
}

exports.getEntidades=getEntidades;
exports.procurarEntidade = procurarEntidade;
exports.criarEntidade = criarEntidade;
exports.editarEntidade = editarEntidade;
exports.getAcao = getAcao;
exports.eliminaAcao = eliminaAcao;
exports.criaAcao = criaAcao;