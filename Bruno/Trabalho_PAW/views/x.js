
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
                    $("#nU").after("<span>"+ result.Numero_Utente+"</span>");
                    $("#n").after("<span>"+ result.Nome+"</span>");
                    $("#i").after("<span>"+ result.Idade+"</span>");
                    $("#g").after("<span>"+ result.Genero+"</span>");
                    $("#m").after("<span>"+ result.Morada+"</span>");
                    $('.collapse').collapse();
                }
            }
        });

    }))
    
})})()