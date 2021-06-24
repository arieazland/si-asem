function Table(idtable,id){
    $('#' + idtable).DataTable({
        drawCallback: function () {
            var sum = $('#'+idtable).DataTable().column(2).data().sum();
            $('#total'+id).html(sum);
        },
        dom: 'Bfrtip',
        "pageLength": 10,
        // "order": [
        //     [1, 'asc']
        // ],
        // buttons: [
        //     'copy', 'csv', 'excel', 'pdf', 'print'
        // ]
        buttons: [
            
        ],
    });
};
    
// tabel users
var idtable = "part1";
var id = "1";
Table(idtable,id);

var idtable = "part2";
var id = "2";
Table(idtable,id);

var idtable = "part3";
var id = "3";
Table(idtable,id);

var idtable = "part4";
var id = "4";
Table(idtable,id);

var idtable = "part5";
var id = "5";
Table(idtable,id);