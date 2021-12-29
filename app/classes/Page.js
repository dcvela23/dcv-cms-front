import each from 'lodash/each'
import GSAP from 'gsap'
import Prefix from 'prefix'

export default class Page {
  constructor({
    pageId,
    pageSelector,
    pageChildrenSelectors
  }) {
    this.pageId = pageId
    this.pageSelector = pageSelector
    this.pageChildrenSelectors = {
      ...pageChildrenSelectors,
      wrapper: '.page_wrapper'
    }
    this.transformPrefix = Prefix('transform')
    this.setInitialScrollValues()
    this.onMouseWheelEvent = this.onMouseWheel.bind(this)
  }

  create() {
    this.pageDomElement = document.querySelector(this.pageSelector)
    this.pageChildrenDomElements = {}

    this.setInitialScrollValues()

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
      this.animationIn = GSAP.timeline()

      GSAP.fromTo(this.pageDomElement,
        {
          autoAlpha: 0,
        },
        {
        autoAlpha: 1
      })

      this.animationIn.call(_ => {
        this.addEventListeners()
        resolve()
      })
    })
  }

  animateOutPage() {
    return new Promise((resolve) => {
      this.removeEventListeners()

      this.animationOut = GSAP.timeline()

      GSAP.to(this.pageDomElement, {
        autoAlpha: 0
      })

      this.animationOut.call(_ => {
        resolve()
      })
    })
  }

  addEventListeners() {
    window.addEventListener('mousewheel', this.onMouseWheelEvent)
  }

  removeEventListeners() {
    window.removeEventListener('mousewheel', this.onMouseWheelEvent)
  }

  onMouseWheel(event) {
    const { deltaY } = event
    this.scroll.target += deltaY
  }

  onResize() {
    if (this.pageChildrenDomElements.wrapper) {
      this.scroll.limit = this.pageChildrenDomElements.wrapper.clientHeight - window.innerHeight
    }
  }

  setInitialScrollValues() {
    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0
    }
  }

  update() {
    const interpolationEasing = 0.1

    this.scroll.target = GSAP.utils.clamp(0, this.scroll.limit, this.scroll.target)

    // we could create our own lerp funcion
    // this.scroll.current = lerp(this.scroll.current, this.scroll.target, interpolationEasing)
    this.scroll.current = GSAP.utils.interpolate(this.scroll.current, this.scroll.target, interpolationEasing)

    // zero limitation
    if (this.scroll.current < 0.01) {
      this.scroll.current = 0
    }

    if (this.pageChildrenDomElements.wrapper) this.pageChildrenDomElements.wrapper.style[this.transformPrefix] = `translate3d(0, ${-this.scroll.current}px, 0)`
  }
}
