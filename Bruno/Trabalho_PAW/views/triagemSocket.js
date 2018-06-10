var socket = io.connect('http://localhost:8000');
//socket.emit('hello-message', {myData: 'hello from client'}); 


socket.on('server-answer', function (data) {

        $(document).ready(function (data) {
             //   $(".temp").empty();
                for (let i = 0; i < data.length; i++) {
                        $("#start").append("<tr class='temp'>" +
                                "<td>" + data[i].Numero_Processo + "</td>" +
                                "<td>" + data[i].Nome + "</td>" +
                                "<td>" + data[i].Data_Entrada + "</td>" +
                                "<td>" + data[i].Data_Entrada + "</td>" +
                                "<td>" + data[i].Estado + "</tr>");
                }
        });



});