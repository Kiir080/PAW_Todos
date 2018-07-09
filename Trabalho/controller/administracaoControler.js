const {
    mongoManager
} = require('../Modulo_Mongoose/mongoManager');

const dossierSchema = require('../Modulo_Mongoose/schemas/dossier');
const entidadeSchema = require('../Modulo_Mongoose/schemas/entidade.js');
const comumControler = require('../controller/comumControler.js');

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

            result.save();
            atualizarEntidade(req, callback);

        }
    });
}



function atualizarEntidade(req, callback) {
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');
    comumControler.procurarEntidade(req.sanitize(req.body.id), function (res) {
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

exports.editaAcao = editaAcao;
exports.getProcessosAssSocial = getProcessosAssSocial;
exports.criarEntidade = criarEntidade;
exports.editarEntidade = editarEntidade;
exports.getAcao = getAcao;
exports.eliminaAcao = eliminaAcao;