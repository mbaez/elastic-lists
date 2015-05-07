/**
 * @param {Object} options Description
 * @config {Jquery.El} el container of the view.
 * @config {Object} data the use to  build de view.
 * @config {function} onchange
 * @config {Object} columns
 */
function ElasticList(options) {
    var grafo = {};
    var globalMap = {}

    /**
     * Build a encode string.
     *
     * @param {Sting} value the input string
     * @returns {String} The encode string for the input.
     */
    function genId(value) {
        value = value.toString();
        value = encodeURI(value);
        value = value.trim().toLowerCase().replace(/-/g, '').replace(/\ /g, '').replace(/\./g, '')
        value = value.replace(/\)/g, '').replace(/\(/g, '').replace(/,/g, '').replace(/\;/g, '');
        value = value.replace(/\`/g, '').replace(/\'/g, '').replace(/\%/g, '').replace(/\#/g, '');
        value = value.replace(/\$/g, '').replace(/\&/g, '').replace(/\*/g, '').replace(/\//g, '');
        value = value.replace(/\!/g, '').replace(/\@/g, '').replace(/\[/g, '').replace(/\]/g, '');
        value = value.replace(/\</g, '').replace(/\>/g, '').replace(/\"/g, '').replace(/\+/g, '');
        value = value.replace(/\=/g, '').replace(/\_/g, '').replace(/\{/g, '').replace(/\}/g, '');
        return value;
    }

    /**
     * Build a compose string.
     * @returns {String} a encode string .
     */
    function getKey(group, el) {
        return genId(parseValue(group)) + "-" + genId(parseValue(el));
    }

    /**
     *
     * @param {type} value Description
     * @returns {type} Description
     */
    function parseValue(value) {
        return value == null || typeof value == "undefined" || value.length == 0 ? "Desconocido" : value;
    }

    /**
     * Description
     */
    function isIn(node, filters) {
        var resp = true;
        for (var key in filters) {
            if (genId(parseValue(node[key])) != genId(parseValue(filters[key]))) {
                resp = false;
            }
        }
        return resp;
    }

    /**
     * Description
     */
    function getFilters() {
        var $filters = $(".active");
        var filters = {};
        $filters.each(function () {
            var key = $(this).parent().attr("id");
            var value = $(this).find("span:not(.badge)").text();
            filters[key] = value;

        });
        return filters;
    }

    /**
     * Description
     */
    function applyFilters($target, undo) {
        var map = {};
        var attrKey = null,
            nodes;
        var filters = getFilters();
        for (var key in filters) {
            attrKey = getKey(key, filters[key]);
        }
        //si no existe ningún filtro activo
        if (attrKey == null) {
            $("li").show();
            for (var elId in globalMap) {
                $("span#" + elId).text(globalMap[elId]);
            }
            return;
        }
        nodes = grafo[attrKey];
        attrKey = attrKey.split("-");
        var targetId = $target.find('.badge').attr("id");
        var attr = attrKey[0],
            key = attrKey[1];
        //hide all elements
        options.el.find("li:not(.active)").hide();

        for (var i = 0; i < nodes.length; i++) {
            if (isIn(nodes[i], filters)) {
                for (var j = 0; j < options.columns.length; j++) {
                    var nodeKey = options.columns[j].attr;
                    var elId = getKey(nodeKey, nodes[i][nodeKey]);
                    var $el = $("#" + elId).parent();
                    map[elId] = typeof map[elId] == "undefined" ? 1 : map[elId] += 1;
                    if (nodeKey != attr) {
                        $el.show();
                    }
                    $("#" + elId).text(map[elId]);
                }
            }
        }
        if (typeof options.onchange != "undefined") {
            options.onchange(filters);
        }
    }

    /**
     * Description
     */
    function clickHandler(e) {
        var $target = $(this);
        var undo = false;
        var clazz = $target.attr("class");
        if (clazz.indexOf("active") >= 0) {
            $target.removeClass("active");
            undo = true;
        } else {
            $target.addClass("active");
            $target.show();
        }
        applyFilters($target, undo);
    }

    /**
     * Description
     */
    this.buildContainer = function () {
        var len = parseInt(12 / this.columns.length);
        var $container = $("<div class='list-container'></div>");
        var $panel = $('<div class="panel panel-default "></div>');
        $container.addClass("col-md-" + len + "");
        var $head = $('<div class="panel-heading"></div>');
        var $body = $('<div class="panel-body"/></div>');
        for (var j = 0; j < this.columns.length; j++) {
            var attr = this.columns[j].attr;
            var $ulContainer = $container.clone();
            var $ulPanel = $panel.clone();
            var $ulhead = $head.clone();
            //var $ulBody = $body.clone();
            $ulhead.text(this.columns[j].title);
            var $ul = $("<ul class='list-group'></ul>");
            $ul.attr("id", attr);
            //$ulBody.append($ul);
            $ulPanel.append($ulhead);
            $ulPanel.append($ul);
            $ulContainer.append($ulPanel);
            this.el.append($ulContainer);
        }
    }

    /**
     * Description
     */
    this.buildList = function () {
        var map = {};
        for (var i = 0; i < this.data.length; i++) {
            for (var j = 0; j < this.columns.length; j++) {
                var attr = this.columns[j].attr;
                var value = this.data[i][attr];
                value = parseValue(value);
                var key = value.toString().toLowerCase();
                var elKey = getKey(attr, key);
                if (typeof map[elKey] == "undefined") {
                    map[elKey] = 1;
                    grafo[elKey] = [];
                    var $ul = this.el.find("#" + attr);
                    var $li = $("<li class='list-group-item'></li>");
                    var $span = $("<span></span>");
                    var $badge = $span.clone();
                    $badge.addClass('badge');
                    $badge.attr("id", elKey);
                    $badge.text("1");
                    $span.text(value);
                    $li.append($badge);
                    $li.append($span);
                    $ul.append($li);
                } else {
                    map[elKey] += 1;
                    this.el.find("#" + elKey).text(map[elKey]);
                }
                grafo[elKey].push(this.data[i]);
            }
        }
        globalMap = map;
    }

    /**
     * Description
     */
    this.bindEvents = function () {
        this.el.find("li").on("click", clickHandler);
    }

    /**
     * @constructor
     * @param {Object} options Description
     * @config {Jquery.El} el container of the view.
     * @config {Object} data the use to  build de view.
     * @config {function} onchange
     * @config {Object} columns
     */
    this.initialize = function (options) {
        for (var attr in options) {
            this[attr] = options[attr];
        }
        this.buildContainer();
        this.buildList();
        this.bindEvents();
    }

    this.initialize(options);

    return {
        getFilters: getFilters
    }
}
