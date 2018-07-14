let table;
let firstUse =true;
$(function () {
    $(document).ready(function () {
        ajaxRequestA1();
        getNumeroDeUtilizadores();

    });
})



function ajaxRequestA1() {
    $(document).ready(function () {
        $('#a1').on('click', function (event) {
            event.preventDefault();
            if(firstUse){
                table = $('#table1').DataTable({
                    "processing": true,
                    "responsive": true,
                    "ajax": {
                        "url": window.location.origin + '/getProcessos',
                        "type": "POST",
                        "dataSrc": ''
                    },
                    "columns": [{
                            "data": "processo.numeroInterno"
                        },
                        {
                            "data": "numeroAluno"
                        },
                        {
                            "data": "processo.estado"
                        },
                        {
                            "data": "processo.assistenteSocial"
                        },
                        {
                            "data": "processo.anoLetivo"
                        },
                        {
                            "data": "processo.dataRegisto",
                            "render": function (data, type, row) {
                                if(type === 'display'){
                                  return new Date(data).toLocaleDateString()
                                }else{
                                    return data;
                                }
                            }
                        },
                        {
                            "data": "processo.entidade.nome"
                        },
                        {
                            "data": "processo.problema.tipo"
                        },
                    ]
                });
                
                firstUse=false;
            }else{
                table.ajax.reload();
            }
            
        });
        $('#a1').click();
    });
}


function getNumeroDeUtilizadores() {
    $(document).ready(function () {

        $.post(window.location.origin+'/administracao/countUtilizador', function (result) {
            $('#idUt').val(result.num + 1);
        });
    });
}