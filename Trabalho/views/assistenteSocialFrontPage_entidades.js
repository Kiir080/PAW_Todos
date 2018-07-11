let table1;
let firstTime=true;

$(function () {
    $(document).ready(function () {
        ajaxRequestA4();
    });
})()

function ajaxRequestA4() {
    $(document).ready(function () {
        $('#a4').on('click', function (event) {
            if(firstTime){
                table1 = $('#table4').DataTable({
                    "processing": true,
                    "responsive": true,
                    "select":'single',
                    "ajax": {
                        "url": window.location.origin + '/assistenteSocial/getEntidades',
                        "type": "POST",
                        "dataSrc": ''
                    },
                    "columns": [{
                            "data": "id"
                        },
                        {
                            "data": "nome"
                        },
                        {
                            "data": "contacto"
                        }
                    ]
                });  
            }else{
            table1.ajax.reload();
            }
            
        });
    })
}

