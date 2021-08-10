function Table(idtable){
    $('#' + idtable).DataTable({
        dom: 'Bfrtip',
        "pageLength": 5000,
        "searching": false,
        "ordering": false,
        // "order": [
        //     [1, 'asc']
        // ],
        // buttons: [
        //     'copy', 'csv', 'excel', 'pdf', 'print'
        // ]
        buttons: [
            // {
            //     extend: 'copy',
            //     text: 'Copy',
            //     className: '',
            //     exportOptions: {
            //         columns: ':not(.notexport)',
            //         //columns: 'th:not(:last-child)'
            //     }
            // },
            // {
            //     extend: 'excel',
            //     text: 'Excel',
            //     className: '',
            //     exportOptions: {
            //         columns: ':not(.notexport)',
            //         //columns: 'th:not(:last-child)'
            //     }
            // },
            // {
            //     extend: 'pdfHtml5',
            //     text: 'PDF',
            //     exportOptions: {
            //         columns: ':not(.notexport)',
            //     }
            // },
            // {
            //     extend: 'print',
            //     text: 'Print',
            //     exportOptions: {
            //         columns: ':not(.notexport)',
            //     }
            // }
        ],
    });
};
    
// tabel users
var idtable = "soalassessment";
Table(idtable);

// tabel users
var idtable = "soalassessment2";
Table(idtable);