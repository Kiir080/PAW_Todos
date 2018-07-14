const {
    mongoManager
} = require('../Modulo_Mongoose/mongoManager');

const dossierSchema = require('../Modulo_Mongoose/schemas/dossier.js');
const procurarEntidade = require('../controller/comumControler.js').procurarEntidade;


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
                    dataNascimento: new Date(req.sanitize(body.dataNascimento)).toISOString(),
                    contacto: req.sanitize(body.contacto),
                    processo: {
                        estado: 'aberto',
                        anoLetivo: req.sanitize(body.anoLetivo),
                        assistenteSocial: req.sanitize(body.assistenteSocial),
                        numeroInterno: req.sanitize(body.numeroInterno),
                        dataRegisto: Date.now(),
                        observacoes: req.sanitize(body.observacoes),
                        problema: {
                            descricao: req.sanitize(body.descricao),
                            tipo: req.sanitize(body.tipo),
                            data: new Date(req.sanitize(body.data)).toISOString()
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
                            data: new Date(req.sanitize(body.data)).toISOString()
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

exports.addProcesso = addProcesso;
exports.criarDossier = criarDossier;