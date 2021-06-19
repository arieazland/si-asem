$(document).ready(function(){
    //tampilkan modal users hapus record
    $('#listPartisipan').on('click','.delete',function(){
        var id = $(this).data('id');
        var nama = $(this).data('nama');
        $('#modalHapuspartisipan').modal('show');
        $('.modalidpartisipanhapus').val(id);
        $('.judul').text(nama);
    });
});