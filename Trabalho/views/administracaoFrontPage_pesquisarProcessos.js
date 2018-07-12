let clicked;

$(function () {
    $(document).ready(function () {
        ajaxRequestA3();
        removeAcao();
        editaAcao();
       
    });
})()


function ajaxRequestA3() {
    $(document).ready(function () {
        $('#searchButton3').click((function (event) {
            event.preventDefault();
            let id = $('#searchBox3').val();
            $.post(window.location.origin + "/assistenteSocial/getProcesso", {
                    numeroInterno: id
                },
                function (result) {
                    $("#list3").empty();
                    if (result === "") {
                        $('#btnG').hide();
                        $('#list3').append('<div class="alert alert-danger alert-dismissible p-2">' +
                            ' <button type="button" class="close" data-dismiss="alert">&times;</button>' +
                            '<strong>Esse Processo não existe!!!</strong>' +
                            ' </div>');
                    } else {
                        $('#list3').append(
                            '<li class="list-group-item list-group-item-dark" ' + '<strong>Processo do Aluno Numero:' + result.numeroAluno + '</strong>' + '</li>' +
                            '<li class="list-group-item">' +
                            '<strong>Numero Interno: </strong>' + '<span>' + result.processo.numeroInterno + '</span>' +
                            '</li>' +
                            '<li class="list-group-item">' +
                            '<strong>Identificador de Assistente Social Atribuido: </strong>' + '<span>' + result.processo.assistenteSocial + '</span>' +
                            '</li>' +
                            '<li class="list-group-item">' +
                            '<strong>Ano Letivo: </strong>' + '<span>' + result.processo.anoLetivo + '</span>' +
                            '</li>' +
                            '<li class="list-group-item">' +
                            '<strong>Estado do Processo: </strong>' + '<span>' + result.processo.estado + '</span>' +
                            '</li>' +
                            '<li class="list-group-item">' +
                            '<strong>Data de Registo: </strong>' + '<span>' + (result.processo.dataRegisto).split('T')[0] + '</span>' +
                            '</li>' +
                            '<li class="list-group-item">' +
                            '<strong>Observações: </strong>' + '<span>' + result.processo.observacoes + '</span>' +
                            '</li>' +
                            '<li class="list-group-item">' +
                            '<strong>Entidade: </strong>' + '<span>' + result.processo.entidade.nome + '</span>' +
                            '</li>' +
                            '<li class="list-group-item list-group-item-dark" ' + '<strong>Descriminação do Problema ' + '</strong>' +
                            '</li>' +
                            '<li class="list-group-item">' +
                            '<strong>Tipo de Problema: </strong>' + '<span>' + result.processo.problema.tipo + '</span>' +
                            '</li>' +
                            '<li class="list-group-item">' +
                            '<strong>Data: </strong>' + '<span>' + (result.processo.problema.data).split('T')[0] + '</span>' +
                            '</li>' +
                            '<li class="list-group-item">' +
                            '<strong>Descrição: </strong>' + '<span>' + result.processo.problema.descricao + '</span>' +
                            '</li>');

                        if (result.processo.problema.acoes.length > 0) {

                            $('#list3').append('<li class="list-group-item list-group-item-dark" ' + '<strong>Diligências Tomadas ' + '</strong>' +
                                '</li>');

                            for (i = 0; i < result.processo.problema.acoes.length; i++) {
                                $('#list3').append(
                                    '<li class="list-group-item list-group-item-dark selected"' + '<strong>Ação ' + (i + 1) + '</strong>' + '<ul style="display: none;" id=' + (i + 1) + '>' +
                                    '<li class="list-group-item">' +
                                    '<strong>Tipo:</strong>' + '<span id="tipo' + (i + 1) + '">' + result.processo.problema.acoes[i].tipo + '</span>' +
                                    '</li>' +
                                    '<li class="list-group-item">' +
                                    '<strong>Data:</strong>' + '<span id="data' + (i + 1) + '">' + (result.processo.problema.acoes[i].data).split('T')[0] + '</span>' +
                                    '</li>' +
                                    '<li class="list-group-item">' +
                                    '<strong>Descricão:</strong>' + '<span id="dcs' + (i + 1) + '">' + result.processo.problema.acoes[i].descricao + '</span>' +
                                    '</li>' + '</ul>' + '</li>');
                            }

                            clickOnAction();
                        }
                            
                        if(result.processo.estado !== 'encerrado'){
                            ('#tp').prop('disabled', false);
                            terminarProcesso();
                        }

                        $('#btnG').show();
                        $('#addA').click(function () {
                            $('#num').val(id);
                        })

                    }



                    $('.collapse3').collapse();

                }

            );

        }));
    });
}


function clickOnAction() {
    $('.selected').click(function () {
        if ($(this.firstElementChild).is(':visible')) {
            $(this.firstElementChild).slideUp();
            $('#remA').prop('disabled', true);
            $('#edtA').prop('disabled', true);
        } else {
            $(this.firstElementChild).slideDown();
            clicked = $(this.firstElementChild).attr('id');
            $('#remA').prop('disabled', false);
            $('#edtA').prop('disabled', false);

        }
    });
}

function removeAcao() {
    $(document).ready(function () {

        $('#SimR').click(function () {
            $.post(window.location.origin + "/administracao/eliminaAcao", {
                numeroInterno: $('#searchBox3').val(),
                data: $("#data" + clicked).text(),
                tipo: $("#tipo" + clicked).text(),
                descricao: $("#dcs" + clicked).text(),
            }, function (result) {
                $('#remAcao').modal("hide");
                $('#tabs').before('<div class="alert alert-primary alert-dismissible p-2">' +
                    ' <button type="button" class="close" data-dismiss="alert">&times;</button>' +
                    '<strong>' + result + '</strong>' +
                    ' </div>');
                $('#searchButton3').click();
            });
        })
    })
}



function editaAcao() {
    $(document).ready(function () {
        $('#editaAcao').on('show.bs.modal', function () {
            $('#numE').val($('#searchBox3').val());
            $('#tipoE').val($('#tipo' + clicked).text());
            $('#dcsE').val($("#dcs" + clicked).text());

            $('#edtButton').click(function () {
                $.post(window.location.origin + "/administracao/editaAcao", {
                    numeroInterno: $('#searchBox3').val(),
                    data: $("#data" + clicked).text().replace(new RegExp('/', 'g'), '-'),
                    tipo: $("#tipo" + clicked).text(),
                    descricao: $("#dcs" + clicked).text(),
                    dataNew: $("#dataE").val(),
                    tipoNew: $("#tipoE").val(),
                    descricaoNew: $("#dcsE").val()
                }, function (result) {
                    $('#editaAcao').modal("hide");
                    $('#tabs').before('<div class="alert alert-primary alert-dismissible p-2">' +
                        ' <button type="button" class="close" data-dismiss="alert">&times;</button>' +
                        '<strong>' + result + '</strong>' +
                        ' </div>');
                    $('#searchButton3').click();
                });
            });
        });
    });
}

function terminarProcesso() {
    $(document).ready(function () {

        $('#SimT').click(function () {
            $.post(window.location.origin + "/administracao/terminarProcesso", {
                numeroInterno: $('#searchBox3').val(),
            }, function (result) {
                $('#terminarProcesso').modal("hide");
                $('#tabs').before('<div class="alert alert-primary alert-dismissible p-2">' +
                    ' <button type="button" class="close" data-dismiss="alert">&times;</button>' +
                    '<strong>' + result + '</strong>' +
                    ' </div>');
                $('#searchButton3').click();
            });
        })
    })
}
