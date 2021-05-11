import { $, by, ElementArrayFinder, ElementFinder } from 'protractor';

import BasePage from './base-component';

export default class PersonalDetails extends BasePage {
  selector: ElementFinder = $('.top-container');

  pageHeading: ElementFinder = this.selector.$(
    '.MuiTypography-root.MuiTypography-h3'
  );
  nextButton: ElementFinder = this.selector.element(by.buttonText('Next'));
  backButton: ElementFinder = this.selector.element(by.buttonText('Back'));
  firstName: ElementFinder = this.selector.$('#first-name');
  lastName: ElementFinder = this.selector.$('#last-name');
  // todo: add Gender
  phone: ElementFinder = this.selector.$('#phone');
  email: ElementFinder = this.selector.$('#email');
  addressLine1: ElementFinder = this.selector.$('#address-line-1');
  addressLine2: ElementFinder = this.selector.$('#address-line-2');
  radioFemale: ElementFinder = this.selector.$(
    'input[type=radio][name=gender][value=F]'
  );
  radioMale: ElementFinder = this.selector.$(
    'input[type=radio][name=gender][value=M]'
  );
  radioOther: ElementFinder = this.selector.$(
    'input[type=radio][name=gender][value=X]'
  );
  suburb: ElementFinder = this.selector.$('#addressAutoComplete');
  suburbListItems: ElementArrayFinder = $('#addressAutoComplete-popup').$$(
    'li'
  );

  dob: ElementFinder = this.selector.$('#date-picker-dialog');

  constructor() {
    super();
  }

  async clickOnNext() {
    await this.nextButton.click();
  }
}
