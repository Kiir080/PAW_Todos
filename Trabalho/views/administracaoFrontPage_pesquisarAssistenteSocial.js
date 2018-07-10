$(function () {
    $(document).ready(function () {
        ajaxRequestA5();
    });
})()

function ajaxRequestA5() {
    $(document).ready(function () {
        $('#searchButton5').click((function (event) {
            event.preventDefault();
            let id = $('#searchBox5').val();
            $.post(window.location.origin + "/administracao/getProcessosAssSocial", {
                    assistenteSocial: id
                },
                function (result) {
                    $("#list5").empty();
                    if (result.length === 0) {
                        $('#list5').append('<div class="alert alert-danger alert-dismissible p-2">' +
                            ' <button type="button" class="close" data-dismiss="alert">&times;</button>' +
                            '<strong>Esse Assistente Social não tem Processos!!!</strong>' +
                            ' </div>');
                    } else {
                        for (x = 0; x < result.length; x++) {
                            $('#list5').append(
                                '<li class="list-group-item list-group-item-dark" ' +
                                '<strong>Processo Numero ' + (x + 1) + '</strong>' +
                                '</li>' +
                                '<li class="list-group-item" ' +
                                '<strong>Numero do Aluno:</strong>' + '<span>' + result[x].numeroAluno + '</span>' +
                                '</li>' +
                                '<li class="list-group-item">' +
                                '<strong>Numero Interno: </strong>' + '<span>' + result[x].processo.numeroInterno + '</span>' +
                                '</li>' +
                                '<li class="list-group-item">' +
                                '<strong>Ano Letivo: </strong>' + '<span>' + result[x].processo.anoLetivo + '</span>' +
                                '</li>' +
                                '<li class="list-group-item">' +
                                '<strong>Estado do Processo: </strong>' + '<span>' + result[x].processo.estado + '</span>' +
                                '</li>' +
                                '<li class="list-group-item">' +
                                '<strong>Data de Registo: </strong>' + '<span>' + (result[x].processo.dataRegisto).split('T')[0] + '</span>' +
                                '</li>' +
                                '<li class="list-group-item">' +
                                '<strong>Observações: </strong>' + '<span>' + result[x].processo.observacoes + '</span>' +
                                '</li>' +
                                '<li class="list-group-item">' +
                                '<strong>Entidade: </strong>' + '<span>' + result[x].processo.entidade.nome + '</span>' +
                                '</li>' +
                                '<li class="list-group-item list-group-item-dark" ' + '<strong>Descriminação do Problema ' + '</strong>' +
                                '</li>' +
                                '<li class="list-group-item">' +
                                '<strong>Tipo de Problema: </strong>' + '<span>' + result[x].processo.problema.tipo + '</span>' +
                                '</li>' +
                                '<li class="list-group-item">' +
                                '<strong>Data: </strong>' + '<span>' + (result[x].processo.problema.data).split('T')[0] + '</span>' +
                                '</li>' +
                                '<li class="list-group-item">' +
                                '<strong>Descrição: </strong>' + '<span>' + result[x].processo.problema.descricao + '</span>' +
                                '</li>');

                            if (result[x].processo.problema.acoes.length > 0) {

                                $('#list5').append('<li class="list-group-item list-group-item-dark" ' + '<strong>Diligências Tomadas ' + '</strong>' +
                                    '</li>');

                                for (i = 0; i < result[x].processo.problema.acoes.length; i++) {
                                    $('#list5').append('<div>' +
                                        '<li class="list-group-item list-group-item-dark" ' + '<strong>Ação ' + (i + 1) + '</strong>' + '</li>' +
                                        '<li class="list-group-item">' +
                                        '<strong>Tipo:</strong>' + '<span>' + result[x].processo.problema.acoes[i].tipo + '</span>' +
                                        '</li>' +
                                        '<li class="list-group-item">' +
                                        '<strong>Data:</strong>' + '<span>' + (result[x].processo.problema.acoes[i].data).split('T')[0] + '</span>' +
                                        '</li>' +
                                        '<li class="list-group-item">' +
                                        '<strong>Descricão:</strong>' + '<span>' + result[x].processo.problema.acoes[i].descricao + '</span>' +
                                        '</li>' + '</div>');
                                }
                            }

                        }
                    }
                    $('.collapse5').collapse();

                }

            );

        }));
    });
}