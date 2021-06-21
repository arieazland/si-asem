$(document).ready(function(){
    //tampilkan data ke modal users untuk edit
    $('#listAspek').on('click','.edit',function(){
        var id = $(this).data('id');
        var idpart = $(this).data('idpart');
        var nama = $(this).data('nama');
        var status = $(this).data('status');
        $('#modalEditaspek').modal('show');
        $('.modalidaspek').val(id);
        $('.modalidpart').val(idpart);
        $('.modalnamaaspek').val(nama);
        $('#modalstatusaspek').val(status).change();
    });
    //tampilkan modal users hapus record
    $('#listAspek').on('click','.delete',function(){
        var id = $(this).data('id');
        var idpart = $(this).data('idpart');
        var nama = $(this).data('nama');
        $('#modalHapusaspek').modal('show');
        $('.modalidaspekhapus').val(id);
        $('.modalidparthapus').val(idpart);
        $('.judul').text(nama);
    });
});