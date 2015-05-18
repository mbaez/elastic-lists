# elastic-lists
A simple javascript library to build elastic lists. Elastic lists allow to navigate large, multi-dimensional info spaces with just a few clicks, never letting you run into situations with zero results. See the running demo [here](http://mbaez.github.io/elastic-lists/).

##Usage
Below is quick example how to use ElasticList:

*Download the latest version library and include it in your html.*

```html
<script src="js/jquery.js"></script>
<script src="js/elastic-list.js"></script>
```

*Add a container in your html :*

```html
...
<div id="view-container" class='container'></div>
```

*This code build a view with six columns*

```javascript
//instance elastic list class
var view = new ElasticList({
  el: $("#view-container"),
  data: novelPrizeJson, //the json data
  onchange: function (filters) {
      console.info(filters);
  },
  columns: [{
    title: "Country",//the column title
    attr: "country" //the json attribute
  }, {
    title: "Gender",
    attr: "gender"
  }, {
    title: "Year",
    attr: "year"
  }, {
    title: "Category",
    attr: "category"
  }, {
    title: "City",
    attr: 'city'
  }, {
    title: "Name",
    attr: "name"
  }]
});
```

##Want to contribute?

If you've found a bug or have a great idea for new feature let me know by [adding your suggestion]
(http://github.com/mbaez/elastic-lists/issues/new) to [issues list](https://github.com/mbaez/elastic-lists/issues).
