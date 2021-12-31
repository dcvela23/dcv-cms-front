import Component from 'classes/Components'

export default class Animation extends Component {
  constructor({ componentDomElement }) {
    super({
      componentDomElement
    })
    this.componentDomElement = componentDomElement

    this.createObserver()
    this.animateOut()
  }

  createObserver() {
    this.observer = new IntersectionObserver( entryElements => {
      entryElements.forEach( entryElement => {
        if (entryElement.isIntersecting) {
          this.animateIn()
        } else {
          this.animateOut()
        }
      })
    })

    this.observer.observe(this.componentDomElement)
  }

  // This methods will be overwritted by the specific animation
  animateIn() {}
  animateOut() {}
}
