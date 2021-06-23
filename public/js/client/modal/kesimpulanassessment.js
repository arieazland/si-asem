$(document).ready(function(){
    //tampilkan data ke modal users untuk edit
    $('#kesimpulan').on('click','.edit',function(){
        var id = $(this).data('id');
        var kesimpulan = $(this).data('kesimpulan');
        $('#modalEditkesimpulan').modal('show');
        $('.modalidkesimpulan').val(id);
        $('.modalkesimpulan').val(kesimpulan);
    });
    //tampilkan modal users hapus record
    $('#kesimpulan').on('click','.delete',function(){
        var id = $(this).data('id');
        var kesimpulan = $(this).data('kesimpulan');
        $('#modalHapuskesimpulan').modal('show');
        $('.modalidkesimpulanhapus').val(id);
        $('.judul').text(kesimpulan);
    });
});