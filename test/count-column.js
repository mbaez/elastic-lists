$(function () {
	view = new ElasticList({
		el: $("#main"),
		data: dataCount,
		onchange: function (filters) {
			console.info(filters);
		},
		hasFilter: true,
		countColumn: "total",
		align: 'horizontal',
		columns: [
			{
				title: "Presentacion",
				attr: "csv_presentacion",
				formatter: function (value) {
					if (value == "UNI") {
						return "Uni formater value";
					}
					return value;
				}
            }, {
				title: "Marca",
				attr: "csv_marca"
            }, {
				title: "Modalidad",
				attr: "csv_modalidad"
            }]
	});
});
