$(function () {
    view = new ElasticList({
        el: $("#main"),
        data: dataElastic,
        hasFilter: true,
        onchange: function (filters) {
            console.info(filters);
        },
        columns: [
            {
                title: "País",
                attr: "country"
            }, {
                title: "Genero",
                attr: "gender"
            }, {
                title: "Año",
                attr: "year"
            }, {
                title: "Categoría",
                attr: "category"
            }, {
                title: "Ciudad",
                attr: 'city'
            }, {
                title: "Universidad",
                attr: "name"
            }]
    });
});