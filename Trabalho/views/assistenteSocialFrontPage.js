$(function () {
    $(document).ready(function () {
        ajaxRequestA1();
        ajaxRequestA2();
        ajaxRequestA3();
        ajaxRequestA4();
    });
})()


function ajaxRequestA1() {
    $(document).ready(function () {

        $('#a1').on('click', function (event) {
            event.preventDefault();
            $("#tab1").empty()

            $.post('assistenteSocial/getProcessos', function (result) {
                if (result === null) {
                    $('#tab1').append('<div class="alert alert-danger alert-dismissible p-2">' +
                        ' <button type="button" class="close" data-dismiss="alert">&times;</button>' +
                        '<strong>Aconteceu Um erro tente novamente mais tarde</strong>' +
                        ' </div>');
                } else if (result.length === 0) {
                    $('#tab1').append('<div class="alert alert-danger alert-dismissible p-2">' +
                        ' <button type="button" class="close" data-dismiss="alert">&times;</button>' +
                        '<strong>Não existem Processos Atribuidos</strong>' +
                        ' </div>');
                } else {
                    $('#tab1').append('<table class="table table-striped table-hover table-responsive text-right mx-auto">' + '<thead class="thead-dark">' + '<tr>' + '<th>Numero Interno</th>' + '<th>Nome Aluno</th>' + '<th>Numero Aluno</th>' + '<th>Estado</th>' + '</tr>' + '</thead>' + '<tbody id="selectable"></tbody>')
                    for (i = 0; i < result.length; i++) {
                        $("#selectable").append("<tr>" +
                            "<td>" + result[i].processo.numeroInterno + "</td>" +
                            "<td>" + result[i].nomeAluno + "</td>" +
                            "<td>" + result[i].numeroAluno + "</td>" +
                            "<td>" + result[i].processo.estado + "</td></tr>");
                    }
                }


            });
        })
        $('#a1').click();
    })
}

function ajaxRequestA2() {
    $('#searchButton2').click((function (event) {
        event.preventDefault();
        let id = $('#searchBox2').val();
        $.post("assistenteSocial/getDossier", {
                data: {
                    numeroAluno: id
                }
            },
            function (result) {
                $("#list2").empty();
                if (result === null) {
                    $('#list2').append('<div class="alert alert-danger alert-dismissible p-2">' +
                        ' <button type="button" class="close" data-dismiss="alert">&times;</button>' +
                        '<strong>Esse Dossier não existe!!!</strong>' +
                        ' </div>');
                } else {
                    $('#list2').append(
                        '<li class="list-group-item list-group-item-dark" ' + '<strong>Dossier do Aluno Numero: ' + result.numeroAluno + '</strong>' + '</li>' +
                        '<li class="list-group-item">' +
                        '<strong>Nome do Aluno: </strong>' + '<span> ' + result.nomeAluno + '</span>' +
                        '</li>' +
                        '<li class="list-group-item">' +
                        '<strong>Idade: </strong>' + '<span> ' + calculaIdade(result.dataNascimento) + '</span>' +
                        '</li>' +
                        '<li class="list-group-item">' +
                        '<strong>Ano Letivo: </strong>' + '<span> ' + result.anoLetivo + '</span>' +
                        '</li>' +
                        '<li class="list-group-item">' +
                        '<strong>Contacto do Encarregado de Educação: </strong>' + '<span> ' + result.contacto + '</span>' +
                        '</li>');
                }
                $('.collapse2').collapse();

            }

        );

    }));

}

function ajaxRequestA3() {
    $(document).ready(function () {
        $('#searchButton3').click((function (event) {
            event.preventDefault();
            let id = $('#searchBox3').val();
            $.post("assistenteSocial/getProcesso", {
                    data: {
                        numeroInterno: id
                    }
                },
                function (result) {
                    $("#list3").empty();
                    if (result === null) {
                        $('#list3').append('<div class="alert alert-danger alert-dismissible p-2">' +
                            ' <button type="button" class="close" data-dismiss="alert">&times;</button>' +
                            '<strong>Esse Dossier não existe!!!</strong>' +
                            ' </div>');
                    } else {
                        $('#list3').append(
                            '<li class="list-group-item list-group-item-dark" ' + '<strong>Processo do Aluno Numero: ' + result.numeroAluno + '</strong>' + '</li>' +
                            '<li class="list-group-item">' +
                            '<strong>Numero Interno: </strong>' + '<span> ' + result.processo.numeroInterno + '</span>' +
                            '</li>' +
                            '<li class="list-group-item">' +
                            '<strong>Identificador de Assistente Social Atribuido: </strong>' + '<span> ' + result.processo.assistenteSocial + '</span>' +
                            '</li>' +
                            '<li class="list-group-item">' +
                            '<strong>Estado do Processo: </strong>' + '<span> ' + result.processo.estado + '</span>' +
                            '</li>' +
                            '<li class="list-group-item">' +
                            '<strong>Data de Registo: </strong>' + '<span> ' + new Date(result.processo.dataRegisto).toLocaleDateString() + '</span>' +
                            '</li>' +
                            '<li class="list-group-item">' +
                            '<strong>Observações: </strong>' + '<span> ' + result.processo.observacoes + '</span>' +
                            '</li>' +
                            '<li class="list-group-item">' +
                            '<strong>Entidade: </strong>' + '<span> ' + result.processo.entidade.nome + '</span>' +
                            '</li>' +
                            '<li class="list-group-item list-group-item-dark" ' + '<strong>Descriminação do Problema ' + '</strong>' + 
                            '</li>' +
                            '<li class="list-group-item">' +
                            '<strong>Tipo de Problema: </strong>' + '<span> ' + result.processo.problema.tipo + '</span>' +
                            '</li>' +
                            '<li class="list-group-item">' +
                            '<strong>Data: </strong>' + '<span> ' + new Date(result.processo.problema.data).toLocaleDateString() + '</span>' +
                            '</li>' +
                            '<li class="list-group-item">' +
                            '<strong>Descrição: </strong>' + '<span> ' + result.processo.problema.descricao + '</span>' +
                            '</li>');

                        if (result.processo.problema.acoes.length > 0) {
                            
                            $('#list3').append('<li class="list-group-item list-group-item-dark" ' + '<strong>Diligências Tomadas ' + '</strong>' + 
                            '</li>');

                            for (i = 0; i < result.processo.problema.acoes.length; i++) {
                                $('#list3').append(
                                    '<li class="list-group-item list-group-item-dark" ' + '<strong>Ação ' + (i + 1) + '</strong>' + '</li>' +
                                    '<li class="list-group-item">' +
                                    '<strong>Tipo:</strong>' + '<span> ' + result.processo.problema.acoes[i].tipo + '</span>' +
                                    '</li>' +
                                    '<li class="list-group-item">' +
                                    '<strong>Data:</strong>' + '<span> ' + new Date(result.processo.problema.acoes[i].data).toLocaleDateString() + '</span>' +
                                    '</li>' +
                                    '<li class="list-group-item">' +
                                    '<strong>Descricão:</strong>' + '<span> ' + result.processo.problema.acoes[i].descricao + '</span>' +
                                    '</li>');
                            }
                        }

                    }
                    $('.collapse3').collapse();

                }

            );

        }));
    });
}



function ajaxRequestA4() {
    $(document).ready(function () {

        $('#a4').on('click', function (event) {
            event.preventDefault();
            $("#tab4").empty();
            $.post('assistenteSocial/getEntidades', function (result) {
                if (result === null) {
                    $('#tab4').append('<div class="alert alert-danger alert-dismissible p-2">' +
                        ' <button type="button" class="close" data-dismiss="alert">&times;</button>' +
                        '<strong>Aconteceu Um erro tente novamente mais tarde</strong>' +
                        ' </div>');
                } else if (result.length === 0) {
                    $('#tab4').append('<div class="alert alert-danger alert-dismissible p-2">' +
                        ' <button type="button" class="close" data-dismiss="alert">&times;</button>' +
                        '<strong>Não existem Entidades</strong>' +
                        ' </div>');
                } else {
                    $('#tab4').append('<table class="table table-striped table-hover table-responsive text-right">' + '<thead>' + '<tr>' + '<th>Identificador</th>' + '<th>Nome</th>' + '<th>Contacto</th>' + '</tr>' + '</thead>' + '<tbody id="targetA4"></tbody>')
                    for (i = 0; i < result.length; i++) {
                        $("#targetA4").append("<tr>" +
                            "<td>" + result[i].id + "</td>" +
                            "<td>" + result[i].nome + "</td>" +
                            "<td>" + result[i].contacto + "</td>" + "</tr>");
                    }
                }
            });
        })
    })
}

function calculaIdade(input) { 
    let tempo = Date.now() - new Date(input).getTime();
    let idade = new Date(tempo); 
    let x = Math.abs(idade.getUTCFullYear() - 1970);
    return x
}