import Page from 'classes/Page'

export default class About extends Page {
  constructor() {
    super({
      pageId: 'home',
      pageSelector: '.home',
      pageChildrenSelectors: {
        navigation: document.querySelector('.navigation'),
        title: '.home-hero_title'
      }
    })
  }
}
