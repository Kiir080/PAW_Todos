const {
    mongoManager
} = require('../Modulo_Mongoose/mongoManager');

const dossierSchema = require('../Modulo_Mongoose/schemas/dossier.js');
const entidadeSchema = require('../Modulo_Mongoose/schemas/entidade.js');

function addProcesso(body, callback) {
    const Dossier = mongoManager.connect(dossierSchema, 'dossier');
    Dossier.findOne({
        numeroAluno: `${body.numeroAluno}`
    }).exec((err, result) => {
        if (err) callback(err);
        else if (result !== null) {
            procurarEntidade(body.id, function (res) {
                var temp = new Dossier({
                    numeroAluno: result.numeroAluno,
                    nomeAluno: result.nomeAluno,
                    dataNascimento: result.dataNascimento,
                    anoLetivo: result.anoLetivo,
                    contacto: result.contacto,
                    processo: {
                        numeroInterno: body.numeroInterno,
                        estado: 'aberto',
                        assistenteSocial: body.assistenteSocial,
                        dataRegisto: Date.now(),
                        observacoes: body.observacoes,
                        problema: {
                            descricao: body.descricao,
                            tipo: body.tipo,
                            data: body.data
                        },
                        entidade: {
                            id: res.id,
                            nome: res.nome,
                            contacto: res.contactoE
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

exports.addProcesso = addProcesso;