import each from 'lodash/each'
import Home from 'pages/Home'
import About from 'pages/About'
import Contact from 'pages/Contact'
import Preloader from 'components/Preloader'

class App {
  constructor() {
    this.createContent()
    this.createPages()
    this.createPreloader()
    this.addLinkListeners()
  }

  // -------
  // Create elements
  // -------

  // CONTENT

  createContent() {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template') // is equivalent of: this.content.dataset.template
  }

  // PAGES

  createPages() {
    // pages is going to be a map of templates (of the classes we initialize)
    this.pages = {
      home: new Home(),
      about: new About(),
      contact: new Contact()
    }

    this.page = this.pages[this.template]
    this.page.create()

    // we need to set a way to destroy our page instances when we leave that page in order to clear all the scripts and animations we set a we don't want in other pages
  }

  // PRELOADER

  createPreloader() {
    this.preloader = new Preloader()
    this.preloader.once('completed', this.onPreloaded.bind(this))
  }

   onPreloaded() {
    this.preloader.destroy()
    this.page.animateInPage()
  }

  // -------
  // Link and page transitions
  // -------

  async onChange(url) {
    await this.page.animateOutPage()
    const request = await window.fetch(url)

    if (request.status === 200) {
      // get the HTML page from the server
      const text = await request.text()

      // create a fake div where append the page html text
      const div = document.createElement('div')
      div.innerHTML = text

      // switch the current page with the new page html data
      const divContent = div.querySelector('.content')
      this.template =  divContent.getAttribute('data-template')
      this.content.setAttribute('data-template', this.template)
      this.content.innerHTML = divContent.innerHTML
      this.page = this.pages[this.template]
      this.page.create()
      this.page.animateInPage()
      this.addLinkListeners()
    } else {
      console.log('Error')
    }
  }

  addLinkListeners() {
    const links = document.querySelectorAll('a')
    each(links, link => {
      link.onclick = event => {
        const { href } = link
        event.preventDefault()
        this.onChange(href)
      }
    })
  }
}

new App()
