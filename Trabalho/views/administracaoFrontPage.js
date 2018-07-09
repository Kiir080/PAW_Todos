let clicked;

$(function () {
    $(document).ready(function () {
        ajaxRequestA1();
        ajaxRequestA2();
        ajaxRequestA3();
        ajaxRequestA4();
        ajaxRequestA5();
        removeAcao();
        editaAcao();
        $('#addE').click(getNumeroDeEntidades);
       
    });
})()




function ajaxRequestA1() {
    $(document).ready(function () {

        $('#a1').on('click', function (event) {
            event.preventDefault();
            $("#tab1").empty()

            $.post(window.location.origin + '/assistenteSocial/getProcessos', function (result) {
                if (result === "") {
                    $('#tab1').append('<div class="alert alert-danger alert-dismissible p-2">' +
                        ' <button type="button" class="close" data-dismiss="alert">&times;</button>' +
                        '<strong>Aconteceu Um erro tente novamente mais tarde</strong>' +
                        ' </div>');
                } else if (result.length === 0) {
                    $('#tab1').append('<div class="alert alert-danger alert-dismissible p-2">' +
                        ' <button type="button" class="close" data-dismiss="alert">&times;</button>' +
                        '<strong>Não existem Processos</strong>' +
                        ' </div>');
                } else {
                    $('#tab1').append('<table class="table table-striped table-hover table-responsive text-right mx-auto">' + '<thead class="thead-dark">' + '<tr>' + '<th>Numero Interno</th>' + '<th>Nome Aluno</th>' + '<th>Numero Aluno</th>' + '<th>Estado</th>' + '<th>Assistente Social</th>' + '<th>Ano Letivo</th>' + '<th>Data de Registo </th>' + '<th>Entidade</th>' + '<th>Tipo de Problema</th>' + '</tr>' + '</thead>' + '<tbody id="selectable"></tbody>')
                    for (i = 0; i < result.length; i++) {
                        $("#selectable").append("<tr>" +
                            "<td>" + result[i].processo.numeroInterno + "</td>" +
                            "<td>" + result[i].nomeAluno + "</td>" +
                            "<td>" + result[i].numeroAluno + "</td>" +
                            "<td>" + result[i].processo.estado + "</td>" +
                            "<td>" + result[i].processo.assistenteSocial + "</td>" +
                            "<td>" + result[i].processo.anoLetivo + "</td>" +
                            "<td>" + (result[i].processo.dataRegisto).split('T')[0] + "</td>" +
                            "<td>" + result[i].processo.entidade.nome + "</td>" +
                            "<td>" + result[i].processo.problema.tipo + "</td>" +
                            +"</tr>");
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
        $.post(window.location.origin + "/assistenteSocial/getDossier", {
                numeroAluno: id
            },
            function (result) {
                $("#list2").empty();
                if (result === "") {
                    $('#list2').append('<div class="alert alert-danger alert-dismissible p-2">' +
                        ' <button type="button" class="close" data-dismiss="alert">&times;</button>' +
                        '<strong>Esse Dossier não existe!!!</strong>' +
                        ' </div>');
                } else {
                    $('#list2').append(
                        '<li class="list-group-item list-group-item-dark" ' + '<strong>Dossier do Aluno Numero: ' + result.numeroAluno + '</strong>' + '</li>' +
                        '<li class="list-group-item">' +
                        '<strong>Nome do Aluno: </strong>' + '<span>' + result.nomeAluno + '</span>' +
                        '</li>' +
                        '<li class="list-group-item">' +
                        '<strong>Idade: </strong>' + '<span>' + calculaIdade(result.dataNascimento) + '</span>' +
                        '</li>' +
                        '<li class="list-group-item">' +
                        '<strong>Contacto do Encarregado de Educação: </strong>' + '<span>' + result.contacto + '</span>' +
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
            $.post(window.location.origin + "/assistenteSocial/getProcesso", {
                    numeroInterno: id
                },
                function (result) {
                    $("#list3").empty();
                    if (result === "") {
                        $('#btnG').hide();
                        $('#list3').append('<div class="alert alert-danger alert-dismissible p-2">' +
                            ' <button type="button" class="close" data-dismiss="alert">&times;</button>' +
                            '<strong>Esse Dossier não existe!!!</strong>' +
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



function ajaxRequestA4() {
    $(document).ready(function () {

        $('#a4').on('click', function (event) {
            event.preventDefault();
            $("#table").empty();
            
            $.post(window.location.origin + '/assistenteSocial/getEntidades', function (result) {
                if (result === "") {
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
                    $('#table').append('<table class="table table-striped table-hover table-responsive text-right">' + '<thead>' + '<tr>' + '<th>Identificador</th>' + '<th>Nome</th>' + '<th>Contacto</th>' + '</tr>' + '</thead>' + '<tbody id="targetA4"></tbody>')
                    for (i = 0; i < result.length; i++) {
                        $("#targetA4").append("<tr class='line' id='L"+(i+1)+"' >" +
                            "<td id='idL"+(i+1)+"'>" + result[i].id + "</td>" +
                            "<td id='nomeL"+(i+1)+"'>" + result[i].nome + "</td>" +
                            "<td id='contactoL"+(i+1)+"'>" + result[i].contacto + "</td>" + "</tr>");
                    }

                    clickOnLine();
                    
                    
                     
                }
            });
        })
    })
}

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

function getNumeroDeEntidades() {
    $(document).ready(function () {
        $.post(window.location.origin+'/administracao/countEntidades', function (result) {
            $('#idE').val(result.num + 1);;
        });
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

function clickOnLine(){
    $('#btnGE').show();
    $('.line').click(function(){
        $('#edtE').prop('disabled', false);
        let clicked=$(this).attr('id');
        let x=$('#id'+clicked).text();

        $('#edtE').click( function () {
            $('#idEd').val($('#id'+clicked).text());
            $('#contactoEd').val($('#contacto'+clicked).text());
            $('#nomeEd').val($('#nome'+clicked).text());
         });
        
    })
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

function calculaIdade(input) {
    let tempo = Date.now() - (new Date(input)).getTime();
    let idade = new Date(tempo);
    let x = Math.abs(idade.getUTCFullYear() - 1970);
    return x
}