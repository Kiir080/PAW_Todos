
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

        $.post(window.location.origin+'/getEntidades',function (result) {
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

function checkIfExistsNumAluno() {
    $(document).ready(function () {
        $('#numAluno').blur(function (event) {
            $.post(window.location.origin+'/checkIfExistsNumAluno',{ numeroAluno: $('#numAluno').val()},function (result) {
                if (!result) {
                    event.preventDefault();
                    alert('Numero de Aluno Não existe!!!');
                    $('#numAluno').val(" ");
                }
            });
        });
    });
}


function checkIfExistsAssSocial() {
    $(document).ready(function () {
        $('#nom').blur(function (event) {
            $.post(window.location.origin+'/checkIfExistsAssSocial',{ assistenteSocial: $('#nom').val()},function (result) {
                if (!result) {
                    event.preventDefault();
                    alert('Esse Identificador de Assistente social não existe');
                    $('#nom').val(" ");
                }
            });
        });
    });
}

function getNumeroDeProcessos() {
    $(document).ready(function () {

        $.post(window.location.origin+'/countProcessos', function (result) {
            $('#num').val(result.num + 1);;
        });
    });
}