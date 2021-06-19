$(document).ready(function(){
    //tampilkan data ke modal users untuk edit
    $('#listAcara').on('click','.edit',function(){
        var id = $(this).data('id');
        var nama = $(this).data('nama');
        var tanggalmulai = $(this).data('tanggalmulai');
        var tanggalberakhir = $(this).data('tanggalberakhir');
        var status = $(this).data('status');
        $('#modalEditacara').modal('show');
        $('.modalidacara').val(id);
        $('.modalnamaacara').val(nama);
        $('.modaltanggalmulaiacara').val(tanggalmulai);
        $('.modaltanggalberakhiracara').val(tanggalberakhir);
        $('#modalstatusacara').val(status).change();
    });
    //tampilkan modal users hapus record
    $('#listAcara').on('click','.delete',function(){
        var id = $(this).data('id');
        var nama = $(this).data('nama');
        $('#modalHapusacara').modal('show');
        $('.modalidacarahapus').val(id);
        $('.judul').text(nama);
    });
});