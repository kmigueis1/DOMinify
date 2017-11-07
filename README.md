# DOMinify
  DOMinify is an API that allows manipulation of DOM elements on the
  browser using basic JavaScript. In terminal while in the working directory,
  execute "npm run webpack" to bundle the entry file. Copy the fullpath for
  the index.html file in the root directory and paste the path into your browser.

## API and Features
  This API defines convenient features for DOM manipulation such as the following:

  $k(HTMLElement) --> creates a DOMNodeCollection of the type of HTML element specified.
  $k("html tag mame") i.e. $k("div") --> creates a DOMNodeCollection of all elements on the
  page that satisfy the selector tag name.
  $k(".class") --> creates a DOMNodeCollection of all elements on the page that match the specified class
  $k("tagname.class") --> creates a DOMNodeCollection of all elements on the page that match the specified
  tag and class.

  $k.extend(obj1, obj2, obj3, ...) --> merges a series of objects and maps or overwrites existing keys
  from successive objects onto the first object. Returns the newly modified first object.

  $k.ajax({...}) --> sends an ajax request and returns a promise. Can be chained with promise function '.then()'.
  Defaults that can be specified are shown in the following example:
  $k.ajax({
    method: 'GET',
    url: "http://exampleurl.com",
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',    
    success: f(),
    error: f()
    })


  $k().html([,"string"]) --> sets the innerHTML of each node in the DOMNodeCollection to the optional
  string specified. If no argument is given, it will return the innerHTML of the first node in the collection.

  $k().empty() --> clears the innerHTML field of all nodes in the collection.

  $k().append(children) --> adds the specified argument as a child to each of the nodes in the collection. Can accept a string
  as innerHTML, and actual DOM object, or another DOMNodeCollection.

  $k().attr(key, value) --> sets a key and value pair attribute for each node in the collection.

  $k().addClass("className") --> add a class to each of the nodes in the DOMNodeCollection.

  $k().removeClass([,"optional className"]) --> remove all classes on the nodes in the collection. If a className is specified, only that class is removed.

  $k().children() --> returns a collection of all child nodes of all nodes in the collection.

  $k().parent() --> returns a collection of all parent nodes of all nodes in the collection.

  $k().find("className") --> returns a collection of descendents of all nodes in the collection that
  match the specified class selector.

  $k().remove() --> removes the innerHTML of all nodes in the collection as well as empties the collection.

  $k().on(eventType, eventHandler) --> sets an event of the specified eventType on every node in the collection and specifies the eventHandler callback that is triggered upon activation of the event.
  
  $k().off(eventType) --> removes all events of the eventType from every node in the collection.
