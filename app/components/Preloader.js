import Component from 'classes/Components'
import GSAP from 'gsap'
import { split } from 'utils/text-split'

export default class Preloader extends Component {
  constructor() {
    super({
      componentSelector: '.preloader',
      componentChildrenSelectors: {
        title: '.preloader_title',
        counter: '.preloader_counter'
      }
    })

    split({
      element: this.componentChildrenDomElements.title,
      expression: ' '
    })
    split({
      element: this.componentChildrenDomElements.title,
      expression: ' '
    })

    this.componentChildrenDomElements.titleSpans = this.componentChildrenDomElements.title.querySelectorAll('span span')
    this.createLoader()
  }

  createLoader() {
    setTimeout(() => this.onLoaded(), 2000)
  }

  onLoaded() {
    return new Promise(() => {
      this.animateOut = GSAP.timeline()


      this.animateOut.to(this.componentChildrenDomElements.titleSpans, {
        duration: 1.5,
        ease: 'expo.out',
        stagger: 0.1,
        y: '100%'
      })

      this.animateOut.to(this.componentDomElement, {
        autoAlpha: 0
      })

      this.animateOut.call( _ => {
        this.emit('completed')
      })
    })
  }

  destroy() {
    this.componentDomElement.parentNode.removeChild(this.componentDomElement)
  }
}
