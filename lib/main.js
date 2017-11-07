const DOMNodeCollection = require("./dom_node_collection");

let readyCallbacks = [];

Window.prototype.$k = function (selector) {

  if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);

  } else if (typeof selector === "string") {
    const node = document.querySelectorAll(selector);
    const arr = Array.from(node);
    return new DOMNodeCollection(arr);

  } else if (typeof selector === "function") {
    readyCallbacks.push(selector);
  }
  if (document.readyState === "complete"){
    readyCallbacks.forEach((callback) => {
      callback();
      readyCallbacks = [];
    });
  }
};

Window.prototype.$k.extend = function (objA, ...objects) {
  objects.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      objA[key] = obj[key];
    })
  });
  return objA;
};

Window.prototype.$k.ajax = function (options = {}) {
  const defaults = {
    method: 'GET',
    url: window.location.href,
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: (response) => {
    console.log(this.status);
    console.log(this.responseType);
    console.log(this.response);
   },
    error: (error) => (console.log(error))
  };

  newDefaults = Object.assign(defaults, options);

  const promise = new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(newDefaults.method, newDefaults.url);
    request.onload = function () {
      newDefaults.success(JSON.parse(request.response));
      resolve(JSON.parse(request.responseText));
    };
    request.onerror = function (){
      newDefaults.error(JSON.parse(request.statusText));
      reject(JSON.parse(request.statusText));
    };
    request.send(JSON.stringify(newDefaults.data));
  })
  return promise;
};
