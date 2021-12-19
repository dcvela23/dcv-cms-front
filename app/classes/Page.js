import each from 'lodash/each'
import GSAP from 'gsap'

export default class Page {
  constructor({
    pageId,
    pageSelector,
    pageChildrenSelectors
  }) {
    this.pageId = pageId
    this.pageSelector = pageSelector
    this.pageChildrenSelectors = { ...pageChildrenSelectors }
  }

  create() {
    this.pageDomElement = document.querySelector(this.pageSelector)
    this.pageChildrenDomElements = {}

    each(this.pageChildrenSelectors, (childrenSelector, key) => {
      if (childrenSelector instanceof window.HTMLElement || childrenSelector instanceof window.NodeList || Array.isArray(childrenSelector)) {
        // store the element if it is an html element or elements array
        this.pageChildrenDomElements[key] = childrenSelector
      } else {
        // this gave us a node list. It is difficult working with node list so we need to querySelector each element
        this.pageChildrenDomElements[key] = document.querySelectorAll(childrenSelector)

        if (this.pageChildrenDomElements[key].lenth === 0) {
          this.pageChildrenDomElements[key] = null
        } else if (this.pageChildrenDomElements[key].length === 1) {
          this.pageChildrenDomElements[key] = document.querySelector(childrenSelector)
        }
      }
    })
  }

  animateInPage() {
    return new Promise((resolve) => {
      GSAP.fromTo(this.pageDomElement,
        {
          autoAlpha: 0,
        },
        {
        autoAlpha: 1,
        onComplete: resolve
      })
    })
  }

  animateOutPage() {
    return new Promise((resolve) => {
      GSAP.to(this.pageDomElement, {
        autoAlpha: 0,
        onComplete: resolve
      })
    })
  }
}
