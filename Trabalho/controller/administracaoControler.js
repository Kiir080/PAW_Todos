const {
    mongoManager
} = require('../Modulo_Mongoose/mongoManager');

const dossierSchema = require('../Modulo_Mongoose/schemas/dossier');
const entidadeSchema = require('../Modulo_Mongoose/schemas/entidade.js');


function criaAcao(req, callback) {
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');

    Dossier.update({
        'processo.numeroInterno': req.sanitize(req.body.numeroInterno)
    }, {
        $push: {
            'processo.problema.acoes': {
                data: req.sanitize(req.body.data),
                tipo: req.sanitize(req.body.tipo),
                descricao: req.sanitize(req.body.descricao)
            }
        },
        $set: {'processo.estado':'acompanhamento', dataEncaminhamento: Date.now}
    }, callback);
}


function eliminaAcao(req, callback) {
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');

    Dossier.update({
        'processo.numeroInterno': req.sanitize(req.body.numeroInterno)
    }, {
        $pull: {
            'processo.problema.acoes': {
                data: req.sanitize(req.body.data),
                tipo: req.sanitize(req.body.tipo),
            }
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

            result.save();
            atualizarEntidade(req, callback);

        }
    });
}



function atualizarEntidade(req, callback) {
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');
    procurarEntidade(req.sanitize(req.body.id), function (res) {
        Dossier.updateMany({
            'processo.entidade.id': req.sanitize(req.body.id)
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