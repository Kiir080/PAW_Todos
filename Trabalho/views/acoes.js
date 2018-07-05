(function () {

    $(document).ready(function () {

        $('#searchButton').click((function (event) {

            let id = $('#searchBox').val();

       $.ajax({

                method: "POST",

                url: "getAcoes",

                data: {
                    numeroInterno: id
                },
                success: function (result) {
                    if (result === null) {
                        $('#list').append('<li class="list-group-item">' +
                            '<strong>' + 'Não existe Ações' + '</strong>' +
                            '</li>');
                    } else {

                        for (i = 0; i < result.length; i++) {
                            $('#list').append('<li class="list-group-item">' +
                                '<strong>Tipo:</strong>' + '<span>' + result[i].tipo + '</span>' +
                                '</li>' +
                                '<li class="list-group-item">' +
                                '<strong>Data:</strong>' + '<span>' + result[i].data + '</span>' +
                                '</li>' +
                                '<li class="list-group-item">' +
                                '<strong>Descricão:</strong>' + '<span>' + result[i].descricao + '</span>' +
                                '</li>');
                        }

                    }
                    $('.collapse').collapse();

                }

            });


        }));



    });
})()