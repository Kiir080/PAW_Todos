const {
    mongoManager
} = require('../Modulo_Mongoose/mongoManager');

const dossierSchema = require('../Modulo_Mongoose/schemas/dossier.js');
const procurarEntidade = require('./administracaoControler').procurarEntidade;

function criarDossier(body, callback) {
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');
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
                            contacto: res.contacto
                        }
                    }
                });
                temp.save(callback(err));
            })

        }
    })
}

const dossierSchema = require('../Modulo_Mongoose/schemas/dossier.js');
const entidadeSchema = require('../Modulo_Mongoose/schemas/entidade.js');

function addProcesso(body, callback) {
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');
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

function atualizarProblema (body, callback) {
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');
    Dossier.findByNumeroInterno(body.numeroInterno,(err, result) => {
    if (err) callback(err);
    else if (result !== null) {
        
        result.processo.problema.descricao = body.descricao;
        result.processo.problema.tipo = body.tipo;
        result.processo.problema.data = body.data;
        
        result.save();
        callback();

    } else {
        callback(new Error('Não atualizou o problema'));
    }
})
}


exports.addProcesso = addProcesso;
exports.atualizarProblema = atualizarProblema;
exports.criarDossier = criarDossier;