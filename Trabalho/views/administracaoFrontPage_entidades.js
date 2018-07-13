let table1;
let firstTime=true;

$(function () {
        ajaxRequestA4();
    
})

function ajaxRequestA4() {
    $(document).ready(function () {
        $('#a4').on('click', function (event) {
            if(firstTime){
                table1 = $('#table4').DataTable({
                    "processing": true,
                    "responsive": true,
                    "select":'single',
                    "ajax": {
                        "url": window.location.origin + '/getEntidades',
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
                firstTime = false;
            }else{
            table1.ajax.reload();
            }
            
            $('#btnGE').show();
            
            $('#addE').click(getNumeroDeEntidades);

            selectLine();
        });
    })
}

function selectLine(){
    table1.on('select', function ( e, dt, type, indexes ) {
        if ( type === 'row' ) {
            var data = dt.row({ selected: true }).data();
            $('#edtE').prop('disabled', false);
    
            $('#edtE').click(function () {
                $('#idEd').val(data.id);
                $('#contactoEd').val(data.contacto);
                $('#nomeEd').val(data.nome);
            });
            
        }
    } );
}

function getNumeroDeEntidades() {
    $(document).ready(function () {
        $.post(window.location.origin + '/administracao/countEntidades', function (result) {
            $('#idE').val(result.num + 1);;
        });
    });
}

