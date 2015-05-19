/**
 * @param {Object} options Description
 * @config {Jquery.El} el container of the view.
 * @config {Object} data the use to  build de view.
 * @config {function} onchange
 * @config {boolean} hasFilter
 * @config {String} countColumn
 * @config {String} panelTemplate
 * @config {String} panelHeadTemplate
 * @config {String} panelBodyTemplate
 * @config {Object} columns
 */
function ElasticList(options) {
    var grafo = {};
    var countMap = {}

    /**
     * @field
     */
    this.panelTemplate = '<div class="panel panel-default "></div>';
    /**
     * @field
     */
    this.panelHeadTemplate = '<div class="panel-heading"></div>';
    /**
     * @field
     */
    this.panelBodyTemplate = '<div class="panel-body"/></div>';
    /**
     * @field
     */
    this.hideClass = "hide-element";
    /**
     * Build a encode string.
     *
     * @param {Sting} value the input string
     * @returns {String} The encode string for the input.
     */
    function genId(value) {
        value = value.toString();
        value = value.trim().toLowerCase();
        var hash = 0,
            i, chr, len;
        if (value.length == 0) return hash;
        for (i = 0, len = value.length; i < len; i++) {
            chr = value.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    /**
     * Build a compose string.
     * @returns {String} a encode string .
     */
    function getKey(group, el) {
        return genId(parseValue(group)) + "X" + genId(parseValue(el));
    }

    function genColumnId(attr) {
        return attr+"X"+genId(attr);
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
        var $filters = options.el.find(".active");
        var filters = {};
        $filters.each(function () {
            var key = $(this).parent().attr("data-name");
            var value = $(this).find(":not(.badge)").text();
            filters[key] = value;
        });
        return filters;
    }

    /**
     * Description
     */
    this.applyFilters = function ($target, undo) {
        var map = {};
        var attrKey = null,
            nodes;
        var filters = getFilters();
        for (var key in filters) {
            attrKey = getKey(key, filters[key]);
        }
        //si no existe ningún filtro activo
        if (attrKey == null) {
            this.el.find("li").removeClass(this.hideClass);
            for (var elId in countMap) {
                this.el.find("#" + elId).text(countMap[elId]);
            }
            if (typeof options.onchange != "undefined") {
                options.onchange({});
            }
            return;
        }
        nodes = grafo[attrKey];
        attrKey = attrKey.split("X");
        var targetId = $target.find('.badge').attr("id");
        var attr = attrKey[0],
            key = attrKey[1];
        //hide all elements
        options.el.find("li:not(.active)").addClass(this.hideClass);
        for (var i = 0; i < nodes.length; i++) {
            if (isIn(nodes[i], filters)) {
                for (var j = 0; j < options.columns.length; j++) {
                    var nodeKey = options.columns[j].attr;
                    var elId = getKey(nodeKey, nodes[i][nodeKey]);
                    var $el = $("#" + elId).parent();
                    var count = this.count(map, elId, nodes[i]);
                    if (nodeKey != attr) {
                        $el.removeClass(this.hideClass);
                    }
                    $("#" + elId).text(count);
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
    this.clickHandler = function (el) {
        var $target = $(el);
        var undo = false;
        var clazz = $target.attr("class");
        if (clazz.indexOf(this.hideClass) >= 0) {
            return;
        } else if (clazz.indexOf("active") >= 0) {
            $target.removeClass("active");
            undo = true;
        } else {
            $target.addClass("active");
            $target.removeClass(this.hideClass);
        }

        if(typeof this.hasFilter !== "undefined"&& this.hasFilter){
            this.el.find("input").each(function(){
                $(this).val("");
            });
        }
        this.applyFilters($target, undo);
    }

    /**
     * Description
     */
    this.buildContainer = function () {
        var len = parseInt(12 / this.columns.length);
        var $container = $("<div class='list-container'></div>");
        var $input = $("<input type='text' class='elastic-filter'>");
        var $panel = $(this.panelTemplate);
        $container.addClass("col-md-" + len + "");
        var $head = $(this.panelHeadTemplate);
        var $body = $(this.panelBodyTemplate);
        for (var j = 0; j < this.columns.length; j++) {
            var attr = this.columns[j].attr;
            var $ulContainer = $container.clone();
            var $ulPanel = $panel.clone();
            var $ulhead = $head.clone();
            //var $ulBody = $body.clone();
            $ulhead.text(this.columns[j].title);
            var $ul = $("<ul class='list-group'></ul>");
            $ul.attr("id", genColumnId(attr));
            $ul.attr("data-name", attr);
            $ulPanel.append($ulhead);
            //if the filter is allowed
            if (typeof this.hasFilter != "undefined" && this.hasFilter) {
                var $ulFilter = $input.clone();
                $ulFilter.attr("placeholder", this.columns[j].title);
                $ulPanel.append($ulFilter);
                var $style = $("<style></style>");
                $style.attr("class", genColumnId(attr));
                $ulPanel.append($style);
            }
            $ulPanel.append($ul);
            $ulContainer.append($ulPanel);
            this.el.append($ulContainer);
        }
    }

    /**
     * Description
     */
    this.count = function (countMap, key, node) {
        var hasCountColumn = typeof this.countColumn == "undefined" ? false : true;
        if (typeof countMap[key] == "undefined") {
            countMap[key] = hasCountColumn ? node[this.countColumn] : 1;
            return countMap[key];
        }
        countMap[key] += hasCountColumn ? node[this.countColumn] : 1;
        return countMap[key];
    }

    /**
     * Description
     */
    this.buildList = function () {
        var count = 0;
        for (var i = 0; i < this.data.length; i++) {
            for (var j = 0; j < this.columns.length; j++) {
                var attr = this.columns[j].attr;
                var value = this.data[i][attr];
                value = parseValue(value);
                var key = value.toString().toLowerCase();
                var elKey = getKey(attr, key);
                if (typeof countMap[elKey] == "undefined") {
                    count = this.count(countMap, elKey, this.data[i]);
                    grafo[elKey] = [];
                    var $ul = this.el.find("#" + genColumnId(attr));
                    var $li = $("<li class='list-group-item'></li>");
                    var $span = $("<div></div>");
                    var $badge = $span.clone();
                    $badge.addClass('badge');
                    $badge.attr("id", elKey);
                    $badge.text(count);
                    $li.attr("data-value", value.toString().toLowerCase());
                    $span.text(value);
                    $span.addClass("elastic-data");
                    $li.append($badge);
                    $li.append($span);
                    $ul.append($li);
                } else {
                    count = this.count(countMap, elKey, this.data[i]);
                    this.el.find("#" + elKey).text(count);
                }
                grafo[elKey].push(this.data[i]);
            }
        }
    }

    /**
     * Description
     */
    this.bindEvents = function () {
        var thiz = this;
        this.el.find("li").on("click", function (e) {
            thiz.clickHandler(this);
        });

        if (typeof this.hasFilter !== "undefined" && this.hasFilter) {
            this.el.find("input.elastic-filter").on("keyup", function (e) {
                thiz.findData(e);
            });
        }
    }

    /**
     * @function
     *
     * @public
     */
    this.findData = function (event) {
        event.stopPropagation();
        var $input = $(event.target);
        var $column = $input.parent().find("ul");
        var columnId = $column.attr("id");
        // Dependiente del input que es tipeado, setea los valores.
        var data = $input.val().trim();
        var $style = this.el.find("." + columnId);
        if (data.length > 0) {
            data = data.toLocaleLowerCase();
            var rule = " ul#" + columnId + ' li[data-value*="' + data + '"]{display:block;} ';
            rule += " ul#" + columnId + ' li:not([data-value*="' + data + '"]){display:none;}';
            $style.html(rule);
        } else {
            $style.html("");
        }
        return;
    }

    /**
     * @param {Object} options Description
     * @config {Jquery.El} el container of the view.
     * @config {Object} data the use to  build de view.
     * @config {function} onchange
     * @config {boolean} hasFilter
     * @config {String} countColumn
     * @config {String} panelTemplate
     * @config {String} panelHeadTemplate
     * @config {String} panelBodyTemplate
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
