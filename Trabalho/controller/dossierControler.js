const {
    mongoManager
} = require('../Modulo_Mongoose/mongoManager');



const dossierSchema = require('../Modulo_Mongoose/schemas/dossier.js');
const entidadeSchema = require('../Modulo_Mongoose/schemas/entidade.js');



function criarDossier(body, callback) {
    const Dossier = mongoManager.connect(dossierSchema, 'dossier');
    Dossier.findOne({
        numeroAluno: `${body.numeroAluno}`
    }).exec((err, result) => {
        if (err) callback(err);
        else if (result !== null) {
            callback(new Error('O Numero do Aluno já existe'));
        } else {
            procurarEntidade(body.id, function (res) {
                var temp = new Dossier({
                    numeroAluno: body.numeroAluno,
                    nomeAluno: body.nomeAluno,
                    dataNascimento: body.dataNascimento,
                    anoLetivo: body.anoLetivo,
                    contacto: body.contacto,
                    processo: {
                        estado: 'aberto',
                        assistenteSocial: body.assistenteSocial,
                        numeroInterno: body.numeroInterno,
                        dataRegisto: body.dataRegisto,
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
            })

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

exports.criarDossier = criarDossier;