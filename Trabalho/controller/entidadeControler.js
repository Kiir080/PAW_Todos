const {
    mongoManager
} = require('../Modulo_Mongoose/mongoManager');


const entidadeSchema = require('../Modulo_Mongoose/schemas/entidade.js');

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

exports.criarEntidade = criarEntidade;
