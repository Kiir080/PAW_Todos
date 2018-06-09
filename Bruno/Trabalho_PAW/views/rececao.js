(function starUp() {
    $("form.search").submit(function (event) {
        event.preventDefault();
        findByNumU();
    });

})()

function findByNumU() {
    $("#target").empty();
    $(document).ready(function () {
        console.log($("form.search").val());
        $.post("rececao/pesquisaU", {
                Numero_Utente: $("#Numero_Utente").val()
            },
            function (result) {
                $("#target").append("<tr>" +
                    "<td>" + "Numero_Utente" + "</td>" +
                    "<td>" + "Nome" + "</td>" +
                    "<td>" + "Idade" + "</td>" +
                    "<td>" + "Genero" + "</td>" +
                    "<td>" + "Morada" + "</tr>");
                $("#target").append("<tr>" +
                    "<td>" + result.Numero_Utente + "</td>" +
                    "<td>" + result.Nome + "</td>" +
                    "<td>" + result.Idade + "</td>" +
                    "<td>" + result.Genero + "</td>" +
                    "<td>" + result.Morada + "</tr>");

            }
        );
    });
}