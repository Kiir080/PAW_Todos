
$(function(){
    $(document).ready(function () {
    $('#searchButton').click((function(event){
        let id =$('#searchBox').val();
        $.ajax({
            method: "POST",
            url: "Rececao/pesquisaU",
            data:{Numero_Utente:id},
            success: function (result) {
                if(result){
                    $("#nU").append("<span>"+ result.Numero_Utente+"</span>");
                    $("#n").append("<span>"+ result.Nome+"</span>");
                    $("#i").append("<span>"+ result.Idade+"</span>");
                    $("#g").append("<span>"+ result.Genero+"</span>");
                    $("#m").append("<span>"+ result.Morada+"</span>");
                    $('.collapse').collapse();
                }
            }
        });

    }))
    
})})()