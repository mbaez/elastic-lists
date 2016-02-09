# elastic-lists
A simple javascript library to build elastic lists. Elastic lists allow to navigate large, multi-dimensional info spaces with just a few clicks, never letting you run into situations with zero results. See the running demo [here](http://mbaez.github.io/elastic-lists/).

##Usage
Below is quick example how to use ElasticList:

*Download the latest version library and include it in your html.*

```html
<script src="js/jquery.js"></script>
<script src="js/elastic-list.js"></script>

<link href="boostrap.css" rel="stylesheet">
<link href="elastic-list.css" rel="stylesheet">

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

##Options
The available configuration options from a elastic list:

#### options.el
Type: `Jquery.Dom`

Container where the list will build. 


#### options.data
Type: `Array`

The array containing the data in json

#### options.columns
Type: `Array`

Array that contains the settings of the columns, which will be visible

```javascript
columns:[{
    title: "Country",//the column title
    attr: "col_country" //the json key attribute
  },
  ...
]
```

#### options[onchange] \(activeFilters)
Type: `Function`

Function called when the filters in the elastic list are activated. 

```javascript
  onchange: function (activeFilters) {
    console.info(activeFilters);
  },
```


#### options[hasFilter]
Type: `Boolean`
Default: False
If true, builds inputs at the top of the columns for local searches. Local search uses CSS selectors, instead of Jquery show / hide for performance improved

#### options[aling]
Type: `String`
Default: 'horizontal'

Sets the alignment of columns.

```javascript
  aling:'horizontal | vertical'
```

#### options[countColumn]
Type: `String`

Defines the name of the column that has the total precalculated for your data.

#### options[defaultValue]
Type: `Object`

Values that will be selected when the list was built.

```javascript
  defaultValue:{
    "col_country": "Paraguay"
    ...
  },
```

##Want to contribute?

If you've found a bug or have a great idea for new feature let me know by [adding your suggestion]
(http://github.com/mbaez/elastic-lists/issues/new) to [issues list](https://github.com/mbaez/elastic-lists/issues).
