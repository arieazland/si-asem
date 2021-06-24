$(document).ready(function(){
    //tampilkan data ke modal users untuk edit
    $('#kesimpulanprodi').on('click','.edit',function(){
        var id = $(this).data('id');
        var kesimpulan = $(this).data('kesimpulan');
        $('#modalEditkesimpulanprodi').modal('show');
        $('.modalidkesimpulan').val(id);
        $('.modalkesimpulan').val(kesimpulan);
    });
    //tampilkan modal users hapus record
    $('#kesimpulanprodi').on('click','.delete',function(){
        var id = $(this).data('id');
        var kesimpulan = $(this).data('kesimpulan');
        $('#modalHapuskesimpulanprodi').modal('show');
        $('.modalidkesimpulanhapus').val(id);
        $('.judul').text(kesimpulan);
    });
});