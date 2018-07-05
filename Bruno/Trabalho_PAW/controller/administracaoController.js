const {
    mongoManager
} = require('../Modulo_Mongoose/mongoManager');

const dossierSchema = require('../Modulo_Mongoose/schemas/acoes');
const acoesSchema = require('../Modulo_Mongoose/schemas/acoes');
const problemasSchema = require('../Modulo_Mongoose/schemas/problemas');

function criaAcao(body,callback){
    const Dossier = mongoManager.connect(dossierSchema, 'Dossier');
    Dossier.findOne({ processo:{numeroInterno: `${body.numeroInterno}`}}).exec((err,result)=>{
        result.processo.problema.acoes.push({data: body.data,
                                             tipo: body.tipo,
                                             descricao: body.descricao});
    }
);
}

exports.criaAcao = criaAcao;