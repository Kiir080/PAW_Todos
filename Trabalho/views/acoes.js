$(function () {

    $(document).ready(function () {

        $('#searchButton').click((function (event) {
            event.preventDefault();
            let id = $('#searchBox').val();

            $.post("getAcoes",{data:{
                numeroInterno:id
            }},
                function (result) {
                    $("#list").empty();
                    if (result.length === 0) {
                        $('#list').append('<li class="list-group-item list-group-item-dark">' +
                            '<strong> ' + 'Não existe Ações' + '</strong>' +
                            '</li>');
                    } else {

                        for (i = 0; i < result.length; i++) {
                            $('#list').append(
                                '<li class="list-group-item list-group-item-dark" ' + '<strong>Ação ' + (i+1) + '</strong>' + '</li>' +
                                '<li class="list-group-item">' +
                                '<strong>Tipo:</strong>' + '<span> ' + result[i].tipo + '</span>' +
                                '</li>' +
                                '<li class="list-group-item">' +
                                '<strong>Data:</strong>' + '<span> ' + new Date(result[i].data).toLocaleDateString() + '</span>' +
                                '</li>' +
                                '<li class="list-group-item">' +
                                '<strong>Descricão:</strong>' + '<span> ' + result[i].descricao + '</span>' +
                                '</li>');
                        }

                    }
                    $('.collapse').collapse();

                }

            );


        }));



    });
})()