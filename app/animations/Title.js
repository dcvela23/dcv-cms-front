import GSAP from 'gsap'
import Animation from 'classes/Animation'
import { calculate, split } from 'utils/text-split'

export default class Title extends Animation {
  constructor({ componentDomElement }) {
    super({
      componentDomElement
    })

    split({ element: componentDomElement, append: true })
    split({ element: componentDomElement, append: true })
    this.titleLineSpans = this.componentDomElement.querySelectorAll('span span')
  }

  animateIn() {
    GSAP.fromTo(this.titleLines,
      {
        autoAlpha: 1,
        y: '100%'
      },
      {
        autoAlpha: 1,
        delay: 0.25,
        duration: 0.5,
        stagger: {
          amount: 0.2,
          axis: 'x'
        },
        y: '0'
      }
    )
  }

  animateOut() {
    GSAP.set(this.titleLines, {
      autoAlpha: 1,
      y: '100%'
    })
  }

  onResize() {
    this.titleLines = calculate(this.titleLineSpans)
  }
}
