$(function () {
    view = new ElasticList({
        el: $("#main"),
        data: dataCount,
        onchange: function (filters) {
            console.info(filters);
        },
        countColumn: "total",
        columns: [
            {
                title: "Presentacion",
                attr: "csv_presentacion"
            }, {
                title: "Marca",
                attr: "csv_marca"
            }, {
                title: "Modalidad",
                attr: "csv_modalidad"
            }]
    });
});