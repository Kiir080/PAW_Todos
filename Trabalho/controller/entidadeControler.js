const {
    mongoManager
} = require('../Modulo_Mongoose/mongoManager');


const entidadeSchema = require('../Modulo_Mongoose/schemas/entidade.js');
const dossierSchema = require('../Modulo_Mongoose/schemas/dossier.js');

function criarEntidade(body, callback) {
    const Entidade = mongoManager.connect(entidadeSchema, 'entidade');
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
    const Entidade = mongoManager.connect(entidadeSchema, 'entidade');
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
    const Dossier = mongoManager.connect(dossierSchema, 'dossier');

    procurarEntidade(body.id, function (res) {
        Dossier.updateMany({ 'processo.problema.entidade.id': body.id }, { 'processo.problema.entidade.nome': res.nome, 'processo.problema.entidade.contacto': res.contacto }).exec(function (err) {
            if (err) callback(err);
            else {
                callback();
            }
        });
    
    });
}

function procurarEntidade(id, callback) {
    const Entidade = mongoManager.connect(entidadeSchema, 'entidade');
    Entidade.findOne({
        id: `${id}`
    }).exec((err, result) => {
        if (err) callback(err);
        if (result !== null) {
            callback(result);
        } else {
            callback(new Error('A entidade nao existe'));
        }

    })

}

exports.criarEntidade = criarEntidade;
exports.editarEntidade = editarEntidade;
exports.atualizarEntidade = atualizarEntidade;
