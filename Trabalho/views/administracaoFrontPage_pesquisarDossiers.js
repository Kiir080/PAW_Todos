$(function () {
    $(document).ready(function () {
      ajaxRequestA2();
    });
})()


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

function calculaIdade(input) {
    let tempo = Date.now() - (new Date(input)).getTime();
    let idade = new Date(tempo);
    let x = Math.abs(idade.getUTCFullYear() - 1970);
    return x
}