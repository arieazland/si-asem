// For select2
$(".select2").select2();
$('.selectpicker').selectpicker();
// For multiselect
$('#pre-selected-options').multiSelect();
$('#optgroup').multiSelect({
    selectableOptgroup: true
});
$('#public-methods').multiSelect();
$('#select-all').click(function() {
    $('#public-methods').multiSelect('select_all');
    return false;
});
$('#deselect-all').click(function() {
    $('#public-methods').multiSelect('deselect_all');
    return false;
});
$('#refresh').on('click', function() {
    $('#public-methods').multiSelect('refresh');
    return false;
});
$('#add-option').on('click', function() {
    $('#public-methods').multiSelect('addOption', {
        value: 42,
        text: 'test 42',
        index: 0
    });
    return false;
});
$(".ajax").select2({
    ajax: {
        url: "https://api.github.com/search/repositories",
        dataType: 'json',
        delay: 250,
        data: function(params) {
            return {
                q: params.term, // search term
                page: params.page
            };
        },
        processResults: function(data, params) {
            // parse the results into the format expected by Select2
            // since we are using custom formatting functions we do not need to
            // alter the remote JSON data, except to indicate that infinite
            // scrolling can be used
            params.page = params.page || 1;
            return {
                results: data.items,
                pagination: {
                    more: (params.page * 30) < data.total_count
                }
            };
        },
        cache: true
    },
    escapeMarkup: function(markup) {
        return markup;
    }, // let our custom formatter work
    minimumInputLength: 1,
    templateResult: formatRepo, // omitted for brevity, see the source of this page
    templateSelection: formatRepoSelection // omitted for brevity, see the source of this page
});