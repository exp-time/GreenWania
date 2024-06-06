class Elem {
  constructor(options = {}) {
    const { tag = 'div', attrs = {}, children = [], parent = null } = options;
    if (options instanceof Element) { // FIX to iterate each child!=!=")=")=
      this.elem = options; // Assume it's a DOM element already
    } else {
      this.elem = document.createElement(tag);
      this.setAttr(attrs);
      this.addChildren(children);
      if (parent) {
        this.appendTo(parent);
      }
    }
  }

  setAttr(attributes) {
    for (const attr in attributes) {
      if (attr.startsWith('on') && typeof attributes[attr] === 'function') {
        this.elem.addEventListener(attr.substring(2), attributes[attr]);
      } else {
        this.elem[attr] = attributes[attr];
      }
    }
    return this;
  }

  appendTo(parent) {
    parent.appendChild(this.elem);
    return this;
  }

  addChild(childSpec, returnParent = false) {
    let child;
    if (childSpec instanceof Element) {
      child = { elem: childSpec }; // Wrap the DOM element in an object to fit the existing structure
      this.elem.appendChild(childSpec);
    } else if (childSpec instanceof Elem) {
      child = childSpec;
      this.elem.appendChild(childSpec.elem);
    } else {
      child = new Elem(childSpec);
      this.elem.appendChild(child.elem);
    }
    return returnParent ? this : child;
  }

  addChildren(childrenSpecs) {
    childrenSpecs.forEach(spec => this.addChild(spec));
    return this;
  }
}

// Helper function to debounce another function
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}