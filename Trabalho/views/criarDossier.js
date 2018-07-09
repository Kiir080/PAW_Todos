
$(function () {
    $(document).ready(function () {
        getNumeroDeProcessos();
        getEntidades();
        checkIfExistsNumAluno();
        checkIfExistsAssSocial();
    });
})()


function getEntidades() {
    $(document).ready(function () {

        $.post(window.location.origin+'/assistenteSocial/getEntidades', function (result) {
            if (result === null || result.length === 0) {
                $('#entidades').append('<option> Não existem entidades Disponiveis</option>');
            } else {
                for (i = 0; i < result.length; i++) {
                    $("#entidade").append(
                        '<option value="' + result[i].id + '">' + result[i].nome + '</option>');
                }
            }

        });
    });
}

function getNumeroDeProcessos() {
    $(document).ready(function () {

        $.post(window.location.origin+'/assistenteSocial/countProcessos', function (result) {
            $('#num').val(result.num + 1);;
        });
    });
}

function checkIfExistsNumAluno() {
    $(document).ready(function () {
        $('#numero').blur(function (event) {
            $.post(window.location.origin+'/assistenteSocial/checkIfExistsNumAluno', {
                numeroAluno: $('#numero').val()
            }, function (result) {
                if (result) {
                    event.preventDefault();
                    alert('Numero de Aluno já existe');
                    $('#numero').val(" ");
                }
            });
        });
    });
}


function checkIfExistsAssSocial() {
    $(document).ready(function () {
        $('#nom').blur(function (event) {
            $.post(window.location.origin+'/assistenteSocial/checkIfExistsAssSocial', {
                assistenteSocial: $('#nom').val()
            }, function (result) {
                if (!result) {
                    event.preventDefault();
                    alert('Esse Identificador de Assistente social não existe');
                    $('#nom').val(" ");
                }
            });
        });
    });
}