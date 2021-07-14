$(document).ready(function(){
    //tampilkan data ke modal users untuk edit
    $('#listUsers').on('click','.edit',function(){
        var id = $(this).data('id');
        var username = $(this).data('username');
        var email = $(this).data('email');
        var nama = $(this).data('nama');
        var telepon = $(this).data('telepon');
        var tempatlahir = $(this).data('tempatlahir');
        var tanggallahir = $(this).data('tanggallahir');
        var alamat = $(this).data('alamat');
        var tipe = $(this).data('tipe');
        $('#modalEditusers').modal('show');
        $('.modalid').val(id);
        $('.modalusername').val(username);
        $('.modalemail').val(email);
        $('.modalnama').val(nama);
        $('.modaltelepon').val(telepon);
        $('.modaltempatlahir').val(tempatlahir);
        $('.modaltanggallahir').val(tanggallahir);
        $('.modalalamat').val(alamat);
        $('#modaltipe').val(tipe).change();
    });

    //tampilkan modal users hapus record
    $('#listUsers').on('click','.delete',function(){
        var id = $(this).data('id');
        var nama = $(this).data('nama');
        $('#modalHapususers').modal('show');
        $('.modalidhapus').val(id);
        $('.judul').text(nama);
    });

    //tampilkan modal users reset password
    $('#listUsers').on('click','.reset',function(){
        var id = $(this).data('id');
        $('#modalResetpassword').modal('show');
        $('.peserta').val(id);
    });
});