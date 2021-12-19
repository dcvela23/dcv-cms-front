import each from 'lodash/each'
import EventEmitter from 'events'

export default class Component extends EventEmitter {
  constructor({
    componentSelector,
    componentChildrenSelectors
  }) {
    super()
    this.componentSelector = componentSelector
    this.componentChildrenSelectors = { ...componentChildrenSelectors }
    this.create()
    this.addEventListeners()
  }

  create() {
    this.componentDomElement = document.querySelector(this.componentSelector)
    this.componentChildrenDomElements = {}

    each(this.componentChildrenSelectors, (childrenSelector, key) => {
      if (childrenSelector instanceof window.HTMLElement || childrenSelector instanceof window.NodeList || Array.isArray(childrenSelector)) {
        // store the element if it is an html element or elements array
        this.componentChildrenDomElements[key] = childrenSelector
      } else {
        // this gave us a node list. It is difficult working with node list so we need to querySelector each element
        this.componentChildrenDomElements[key] = document.querySelectorAll(childrenSelector)

        if (this.componentChildrenDomElements[key].lenth === 0) {
          this.componentChildrenDomElements[key] = null
        } else if (this.componentChildrenDomElements[key].length === 1) {
          this.componentChildrenDomElements[key] = document.querySelector(childrenSelector)
        }
      }
    })
  }

  addEventListeners() {

  }

  removeEventListeners() {

  }
}
