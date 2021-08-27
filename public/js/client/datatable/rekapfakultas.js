function Table(idtable,id){
    $('#' + idtable).DataTable({
        drawCallback: function () {
            var sum = $('#'+idtable).DataTable().column(2).data().sum();
            $('#total'+id).html(sum);
        },
        dom: 'Bfrtip',
        "pageLength": 10,
        "order": [
            [1, 'asc']
        ],
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
    });
};
    
// tabel users
var idtable = "rekapfakultas";
var id = "1";
Table(idtable,id);