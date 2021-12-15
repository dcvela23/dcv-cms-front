import Page from 'classes/Page'

export default class About extends Page {
  constructor() {
    super({
      pageId: 'about',
      pageSelector: '.about'
    })
  }
};
