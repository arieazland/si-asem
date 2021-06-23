$(document).ready(function(){
    //tampilkan data ke modal users untuk edit
    $('#listSoal').on('click','.edit',function(){
        var idsoal = $(this).data('id');
        var idaspek = $(this).data('idaspek');
        var idpart = $(this).data('idpart');
        var soal = $(this).data('nama');
        var statussoal = $(this).data('status');
        $('#modalEditsoal').modal('show');
        $('.modalidsoal').val(idsoal);
        $('.modalnamasoal').val(soal);
        $('.modalidaspek').val(idaspek);
        $('.modalidpart').val(idpart);
    });
    //tampilkan modal users hapus record
    $('#listSoal').on('click','.delete',function(){
        var id = $(this).data('id');
        var soal = $(this).data('nama');
        $('#modalHapussoal').modal('show');
        $('.modalidsoalhapus').val(id);
        $('.judul').text(soal);
    });
});