$(document).ready(function(){
    //tampilkan data ke modal users untuk edit
    $('#listPart').on('click','.edit',function(){
        var id = $(this).data('id');
        var nama = $(this).data('nama');
        var status = $(this).data('status');
        $('#modalEditpart').modal('show');
        $('.modalidpart').val(id);
        $('.modalnamapart').val(nama);
        $('#modalstatuspart').val(status).change();
    });
    //tampilkan modal users hapus record
    $('#listPart').on('click','.delete',function(){
        var id = $(this).data('id');
        var nama = $(this).data('nama');
        $('#modalHapuspart').modal('show');
        $('.modalidparthapus').val(id);
        $('.judul').text(nama);
    });
});