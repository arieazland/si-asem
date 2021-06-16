$(document).ready(function(){
    //tampilkan data ke modal users untuk edit
    $('#listUsers').on('click','.edit',function(){
        var id = $(this).data('id');
        var nama = $(this).data('nama');
        var email = $(this).data('email');
        $('#modalEditusers').modal('show');
        $('.modalid').val(id);
        $('.modalnama').val(nama);
        $('.modalemail').val(email);
    });
    //tampilkan modal users hapus record
    $('#listUsers').on('click','.delete',function(){
        var id = $(this).data('id');
        var nama = $(this).data('nama');
        $('#modalHapususers').modal('show');
        $('.modalidhapus').val(id);
        $('.judul').text(nama);
    });
});