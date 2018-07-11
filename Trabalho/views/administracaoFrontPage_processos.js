$(function () {
    $(document).ready(function () {
        let table = $('#table1').DataTable({
            "processing": true,
            "responsive": true,
            "ajax": {
                "url": window.location.origin + '/assistenteSocial/getProcessos',
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

        ajaxRequestA1();
    });
})()



function ajaxRequestA1() {
    $(document).ready(function () {
        $('#a1').on('click', function (event) {
            event.preventDefault();
            table.ajax.reload();
        });
    })
}