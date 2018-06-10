var dynatable = $('#selectable').dynatable({
    dataset: {
        ajax: true,
        ajaxUrl: '/Triagem/ajax',
        ajaxOnLoad: true,
        records: []
    }
});
