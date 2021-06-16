$(document).ready(function(){
    //tampilkan data ke modal users untuk edit
    $('#listPertanyaan').on('click','.edit',function(){
        var id = $(this).data('id');
        var pertanyaan = $(this).data('pertanyaan');
        $('#modalEditsoal').modal('show');
        $('.modalidpertanyaan').val(id);
        $('.modalpertanyaan').val(pertanyaan);
    });
    //tampilkan modal users hapus record
    $('#listPertanyaan').on('click','.delete',function(){
        var id = $(this).data('id');
        var pertanyaan = $(this).data('pertanyaan');
        $('#modalHapussoal').modal('show');
        $('.modalidpertanyaanhapus').val(id);
        $('.judul').text(pertanyaan);
    });
});