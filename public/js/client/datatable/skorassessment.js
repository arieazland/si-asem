function Table(idtable){
    $('#' + idtable).DataTable({
        dom: 'Bfrtip',
        "pageLength": 10,
        // "order": [
        //     [1, 'asc']
        // ],
        // buttons: [
        //     'copy', 'csv', 'excel', 'pdf', 'print'
        // ]
        buttons: [
            {
                extend: 'copy',
                text: 'Copy',
                className: '',
                exportOptions: {
                    columns: ':not(.notexport)',
                    //columns: 'th:not(:last-child)'
                }
            },
            {
                extend: 'excel',
                text: 'Excel',
                className: '',
                exportOptions: {
                    columns: ':not(.notexport)',
                    //columns: 'th:not(:last-child)'
                }
            },
            {
                extend: 'pdfHtml5',
                text: 'PDF',
                exportOptions: {
                    columns: ':not(.notexport)',
                }
            },
            {
                extend: 'print',
                text: 'Print',
                exportOptions: {
                    columns: ':not(.notexport)',
                }
            }
        ],
    });
};
    
// tabel users
var idtable = "part1";
Table(idtable);

var idtable = "part2";
Table(idtable);

var idtable = "part3";
Table(idtable);

var idtable = "part4";
Table(idtable);

var idtable = "part5";
Table(idtable);