import Page from 'classes/Page'

export default class Contact extends Page {
  constructor() {
    super({
      pageId: 'contact',
      pageSelector: '.contact'
    })
  }
};
