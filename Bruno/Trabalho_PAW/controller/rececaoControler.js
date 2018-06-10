const {
    mongoManager
} = require('../Modulo_Mongoose/mongoManager');



const doenteSchema = require('../Modulo_Mongoose/schemas/doente.js');



function addFichaUrgencia(body, callback) {
    const Doente = mongoManager.connect(doenteSchema, 'doentes');
    Doente.findOne({
        Numero_Utente: `${body.Numero_Utente}`
    }).exec((err, result) => {
        if (err) callback(err);
        if (result !== null) {
            var temp = new Doente({
                Numero_Utente: result.Numero_Utente,
                Nome: result.Nome,
                Genero: result.Genero,
                Morada: result.Morada,
                Idade: result.Idade,
                Numero_Processo: result.Numero_Processo,
                Estado: 'Triagem',
                Rececao: {
                    Data_Saida: Date.now(),
                    Observacoes: body.Observacoes,
                    Id_Funcionario: body.Id_Funcionario
                }
            });
            temp.save(callback(err));
        } else {
            callback(new Error('O Numero de Utente Não existe'));
        }

    })

}

function addDoente(body, callback) {
    const Doente = mongoManager.connect(doenteSchema, 'doentes');
    Doente.findOne({
        Numero_Utente: `${body.Numero_Utente}`
    }).exec((err, result) => {
        if (err) callback(err);
        else if (result !== null) {
            callback(new Error('O Numero de Utente já existe'));
        } else {
            var temp = new Doente({
                Numero_Utente: body.Numero_Utente,
                Nome: body.Nome,
                Genero: body.Genero,
                Morada: body.Morada,
                Idade: body.Idade,
                Numero_Processo: body.Numero_Processo,
                Estado: 'Triagem',
                Rececao: {
                    Data_Saida: Date.now(),
                    Observacoes: body.Observacoes,
                    Id_Funcionario: body.Id_Funcionario
                }
            });
            temp.save(callback(err));
        }
    })
}


function pesquisaUtente(body, callback) {
    const Doente = mongoManager.connect(doenteSchema, 'doentes');
    Doente.findByNumU(body.Numero_Utente, function (err, result) {
        if (result !== null) {
            callback(result);
        } else {
            callback(null);
        }
    });
}

exports.pesquisaUtente = pesquisaUtente;
exports.addDoente = addDoente;
exports.addFichaUrgencia = addFichaUrgencia;