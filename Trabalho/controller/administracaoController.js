const {
    mongoManager
} = require('../Modulo_Mongoose/mongoManager');

const dossierSchema = require('../Modulo_Mongoose/schemas/dossier');


function criaAcao(body, callback) {
    const Dossier = mongoManager.connect(dossierSchema, 'dossiers');

    Dossier.findByNumeroInterno(body.numeroInterno, function (err, result) {
        if (err) callback(err);
        else {
            result.processo.problema.acoes.push({
                data: body.data,
                tipo: body.tipo,
                descricao: body.descricao
            });
            result.save();
            callback();
        }


    });


}

exports.criaAcao = criaAcao;