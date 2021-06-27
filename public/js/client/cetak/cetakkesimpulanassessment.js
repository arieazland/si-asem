function exportTableToExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    //specify filename
    filename = filename?filename+'.xls':'excel_data.xls';

    //create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML],{
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    } else {
        //create a link to the filename
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        //setting the filename
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }
}