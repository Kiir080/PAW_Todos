const {
    mongoManager
} = require('../Modulo_Mongoose/mongoManager');

const dossierSchema = require('../Modulo_Mongoose/schemas/dossier');


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

exports.eliminaAcao = eliminaAcao;
exports.criaAcao = criaAcao;