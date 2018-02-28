import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getApplicationTitle() {
    return element(by.id('ascii-title')).getText();
  }
}
