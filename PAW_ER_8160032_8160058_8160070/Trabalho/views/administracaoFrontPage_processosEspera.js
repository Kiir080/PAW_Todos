"use strict";
let refreshRate = 5000;
let flag = true;
let tempoValue;

$(function () {
    $(document).ready(function () {
    //Iniciar Pagina
    getTempoValue();
    ajaxRequestA6();
    clickOnEditButton();

    //refrescar automaticamente
    setInterval(getTempoValue, refreshRate / 2);
    setInterval(ajaxRequestA6, refreshRate);
    });

})

function clickOnEditButton() {

    $('#edtTempo').click(function () {
        flag = false;
        $('#tempo').prop('readonly',false);
        $('#saveTempo').prop('disabled', false);
        saveTempo();
    });


}

function saveTempo() {
    $(document).ready(function () {
        $('#saveTempo').click(function () {
            $(this).prop('disabled', true);
            $('#tempo').prop('readonly',true);
            $.post(window.location.origin + '/administracao/saveTempo', {
                tempo: $('#tempo').val()
            }, function (result) {
                if (result) {
                    tempoValue = $('#tempo').val();
                    flag = true;
                    ajaxRequestA6();
                } else {
                    $('#tab6').append('<div class="alert alert-danger alert-dismissible p-2">' +
                        ' <button type="button" class="close" data-dismiss="alert">&times;</button>' +
                        '<strong>Aconteceu um erro a guardar o Tempo de Espera, tente novamente mais tarde!!!</strong>' +
                        ' </div>');
                        $('#tempo').val(tempoValue); //por o valor antigo
                }
            });
        });
    });
}


function getTempoValue() {
    $(document).ready(function () {
        if (flag) {
            $.post(window.location.origin + '/administracao/getTempo', function (result) {
                tempoValue = result.tempo;
                if ((($('#tempo').val() === "") || ($('#tempo').val() !== tempoValue)) && flag) {
                    $('#tempo').val(result.tempo);
                }
            });
        }
    });
}

function ajaxRequestA6() {
    $(document).ready(function () {
        if (flag) {
            $.post(window.location.origin + '/administracao/getProcessosEmEsperaMaxima', {
                targetDays: tempoValue
            }, function (result) {
                //se o pedido ja tiver sido realizado deixar concluir
                $('#tableTempo').empty();
                if (!result) {
                    $('#notification').text("");
                    $('#tableTempo').append('<div class="alert alert-danger alert-dismissible p-2">' +
                        ' <button type="button" class="close" data-dismiss="alert">&times;</button>' +
                        '<strong>Não Existente Processos que ultrapassem o Tempo de Espera!!!</strong>' +
                        ' </div>');
                } else {
                    $('#tableTempo').append('<table class="table table-striped table-hover table-responsive text-right mx-auto">' +
                        '<thead class="thead-dark">' +
                        '<tr>' + '<th>Numero Interno</th>' +
                        '<th>Assistente Social</th>' +
                        '<th>Dias em Atraso </th>' + '</tr>' +
                        '</thead>' + '<tbody id="tbody"></tbody>')
                    for (var i = 0; i < result.length; i++) {
                        $('#notification').text(result.length);
                        $('#tbody').append("<tr>" +
                            "<td>" + result[i].numeroInterno + "</td>" +
                            "<td>" + result[i].assistenteSocial + "</td>" +
                            "<td>" + result[i].diasAtraso + "</td>" +
                            +"</tr>");
                    }
                }
            });
        }
    });

}