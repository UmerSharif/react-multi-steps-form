import { $, by, ElementFinder } from 'protractor';

import BasePage from './base-component';

export default class PersonalDetails extends BasePage {
  selector: ElementFinder = $('.top-container');

  pageHeading: ElementFinder = this.selector.$(
    '.MuiTypography-root.MuiTypography-h3'
  );
  nextButton: ElementFinder = this.selector.element(by.buttonText('Next'));
  firstName: ElementFinder = this.selector.$('#first-name');
  lastName: ElementFinder = this.selector.$('#last-name');
  // todo: add Gender
  phone: ElementFinder = this.selector.$('#phonbe');
  email: ElementFinder = this.selector.$('#email');
  addressLine1: ElementFinder = this.selector.$('#address-line-1');
  addressLine2: ElementFinder = this.selector.$('#address-line-2');

  constructor() {
    super();
  }

  async clickOnNext() {
    await this.nextButton.click();
  }
}
