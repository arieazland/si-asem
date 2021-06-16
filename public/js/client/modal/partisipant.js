$(document).ready(function(){
    //tampilkan modal users hapus record
    $('#listPartisipant').on('click','.delete',function(){
        var id = $(this).data('id');
        var nama = $(this).data('nama');
        $('#modalHapuspartisipant').modal('show');
        $('.modalidpartisipanthapus').val(id);
        $('.judul').text(nama);
    });
});