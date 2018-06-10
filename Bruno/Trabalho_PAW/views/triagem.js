"use strict"
let click = new jQuery.Event("click");
let time = 15000;
let target;


ajaxRequest();

setInterval(function () {
    setTimeout($(".temp").detach(), time - 5);
    ajaxRequest()
}, time);


function ajaxRequest() {
    $(document).ready(function () {
        $.ajax({
            method: "POST",
            url: "Triagem/ajax",
            success: function (result) {
                $.each(result, function (i, field) {
                    $("#selectable").append("<tr class='temp'>" +
                        "<td>" + field.Numero_Utente + "</td>" +
                        "<td>" + field.Nome + "</td>" +
                        "<td>" + new Date(field.Data_Entrada).toTimeString() + "</td>" +
                        "<td>" + new Date(field.Data_Entrada).toDateString() + "</td>" +
                        "<td>" + field.Estado + "</tr>");
                })
            }
        });
    })
}




$(function () {
    $("#selectable").selectable({
        selected: function (click, ui) {
            target=ui.selected.firstChild.innerText;
            console.log(target);
            $(".formButton").prop('disabled', false);
            $(".formButton").click(()=>{
                window.location.replace("http://localhost:8000/Triagem/"+ $.param({id:target}));  
            });
            //Parar o ajaxRequest
            /*      var refreshIntervalId = setInterval(fname, 10000);
                    clearInterval(refreshIntervalId); */

        }
    });
});

function teste(){
       /*  $(document).ready(function () {
            $.ajax({
                method: 'POST',
                url: "Triagem/realizaTriagem",
                data: {
                    Nome: "bruno"
                },
                success: function(data){
                    $("html").html(data);
                }
            });
        }); */
 
       
}