class DOMNodeCollection {
  constructor(htmlEl) {
    this.arr = htmlEl;
  }

  html(string) {
    if (typeof string === "string") {
      this.arr.forEach((node) => {
        node.innerHTML = string;
      });
    } else if (this.arr.length > 0) {
      return this.arr[0].innerHTML;
    }
  }

  empty() {
    this.html('');
  }

  append (children) {
    if (this.arr.length === 0) return;
    if (typeof children === 'object' && !(children instanceof DOMNodeCollection)) {
      children = $k(children);
    }
    if (typeof children === "string") {
      this.arr.forEach((node) => {
        node.innerHTML += children;
      });
    } else if (children instanceof DOMNodeCollection) {
      this.arr.forEach((node) => {
        children.forEach((childNode) => {
          node.appendChild(childNode.cloneNode(true));
        });
      });
    }
  }

  attr (key, value) {
    if (typeof value === "string") {
      this.arr.forEach(node => node.setAttribute(key, value));
    } else {
      return this.arr[0].getAttribute(key);
    }
  }


  addClass(className){

    this.arr.forEach((el) => {

      if (el.className === ""){
        el.className = className;
      } else {
        el.className = el.className.concat(" ").concat(className);
      }
    });
  }

  removeClass(className = ""){
    this.arr.forEach((el) => {
      let classes = el.className.split(' ');
      classes = classes.filter((name) =>{
        return name !== className;
      });
      el.className = classes.join(' ');
    });
  }


  children () {
    let childNodes = [];
    this.arr.forEach((node) => {
      const childNodeList = node.children;
      childNodes = childNodes.concat(Array.from(childNodeList));
    });
    return new DOMNodeCollection(childNodes);
  }


  parent () {
    let parentNodes = [];
    this.arr.forEach((node)=>{
      parentNodes = parentNodes.concat([node.parentNode]);
    });
    return new DOMNodeCollection(parentNodes);
  }

  find (selector){
    const children = this.children();
    let result = [];
    children.arr.forEach((el) => {
      if (el.className === selector) {
        result = result.concat(el);
      }
    });
    return new DOMNodeCollection(result);
  }

  remove () {
    this.arr.forEach((node) => {
      node.remove();
    });
    this.empty();
  }

  on (eventType, callback){
    this.arr.forEach((node)=>{
      node.addEventListener(eventType, callback);
      node[eventType] = callback;
    });
  }

  off (eventType) {
    this.arr.forEach((node)=>{
      node.removeEventListener(eventType, node[eventType]);
      node[eventType] = null;
    });
  }
}



module.exports = DOMNodeCollection;
