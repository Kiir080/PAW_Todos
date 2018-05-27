(function startUp() {
   
})()

setInterval(xpto,5000);


function xpto(){
    setTimeout( $("#target").empty() ,4900);
    $(document).ready(function () {
        $.ajax({
            url: "json",
            success: function (result) {       
                    $("#target").append("<tr>" +
                        "<td>" + "Numero_Utente" + "</td>" +
                        "<td>" + "Nome" + "</td>" +
                        "<td>" + "Idade" + "</td>" +
                        "<td>" + "Genero" + "</td>" +
                        "<td>" + "Morada" + "</tr>");
                    $.each(result, function (i, field) {
                        $("#target").append("<tr>" +
                            "<td>" + field.Numero_Utente + "</td>" +
                            "<td>" + field.Nome + "</td>" +
                            "<td>" + field.Idade + "</td>" +
                            "<td>" + field.Genero + "</td>" +
                            "<td>" + field.Morada + "</tr>");
                    });
            }
        });
    });
}


