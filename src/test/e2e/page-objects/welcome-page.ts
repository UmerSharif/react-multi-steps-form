import { $, by, ElementFinder } from 'protractor';

import BasePage from './base-component';

export default class Welcome extends BasePage {
  selector: ElementFinder = $('.top-container');

  welcomeHeading: ElementFinder = this.selector.$(
    '.MuiTypography-root.MuiTypography-h3'
  );
  nextButton: ElementFinder = this.selector.element(by.buttonText('Next'));

  constructor() {
    super();
  }

  async clickOnNext() {
    await this.nextButton.click();
  }
}
