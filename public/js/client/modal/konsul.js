$(document).ready(function(){
    //tampilkan data ke modal users untuk edit
    $('#listKonsul').on('click','.edit',function(){
        var id = $(this).data('id');
        var nama = $(this).data('nama');
        var tanggalmulai = $(this).data('tanggalmulai');
        var tanggalberakhir = $(this).data('tanggalberakhir');
        $('#modalEditkonsul').modal('show');
        $('.modalidkonsul').val(id);
        $('.modalnamakonsul').val(nama);
        $('.modaltanggalmulaikonsul').val(tanggalmulai);
        $('.modaltanggalberakhirkonsul').val(tanggalberakhir);
    });
    //tampilkan modal users hapus record
    $('#listKonsul').on('click','.delete',function(){
        var id = $(this).data('id');
        var nama = $(this).data('nama');
        $('#modalHapuskonsul').modal('show');
        $('.modalidkonsulhapus').val(id);
        $('.judul').text(nama);
    });
});