# elastic-lists
A simple javascript library to build elastic lists. Elastic lists allow to navigate large, multi-dimensional info spaces with just a few clicks, never letting you run into situations with zero results. See the running demo [here](http://mbaez.github.io/elastic-lists/).

## Usage
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

## Options
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
Optional parameters :

##### formatter \(value, first)
Type: `Function`
Return: `String`

* `value`: the value to format.
* `first`: first data object found.

It is responsible for formatting the value

```javascript
columns:[{
    title: "Country",
    attr: "col_country",
    formatter : function(value, first){ 
      value = value.toUpperCase();
      return value;
    }
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
Default: `False`

If true, builds inputs at the top of the columns for local searches. Local search uses CSS selectors, instead of Jquery show / hide for performance improved

#### options[aling]
Type: `String`
Default: `'horizontal'`

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

#### options[beforeSearch]
Type: `Function`

This function will be called before the search. In the following example is used avoid some accent characters in the search.

```javascript
  beforeSearch : function(value, columnAttr){
     var r = value.toLowerCase();
     r = r.replace(new RegExp(/\s/g),"");
     r = r.replace(new RegExp(/[àáâãäå]/g),"a");
     r = r.replace(new RegExp(/[èéêë]/g),"e");
     r = r.replace(new RegExp(/[ìíîï]/g),"i");
     r = r.replace(new RegExp(/ñ/g),"n");                
     r = r.replace(new RegExp(/[òóôõö]/g),"o");
     r = r.replace(new RegExp(/[ùúûü]/g),"u");  
     return r;
  }
```

## Functions
The available functions from a elastic list:

#### getFilters \(options)

Returns all selections in the elastic list.

```javascript
var view = new ElasticList({...});
//...
var filters = view.getFilters();
```

#### setSelected \(options)
Param : `Object`

Select items from the elastic list.

```javascript
var view = new ElasticList({...});
//...
view.setSelected({
"col_country": "Paraguay",
...//all de columns to select
});
```

#### clean \()
Clean all selections of the view.

```javascript
var view = new ElasticList({...});
//...
view.clean();
```

## Want to contribute?

If you've found a bug or have a great idea for new feature let me know by [adding your suggestion]
(http://github.com/mbaez/elastic-lists/issues/new) to [issues list](https://github.com/mbaez/elastic-lists/issues).
