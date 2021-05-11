import { $, by, ElementArrayFinder, ElementFinder } from 'protractor';

import BasePage from './base-component';

export default class Experiences extends BasePage {
  selector: ElementFinder = $('.top-container');

  pageHeading: ElementFinder = this.selector.$(
    '.MuiTypography-root.MuiTypography-h3'
  );
  nextButton: ElementFinder = this.selector.element(by.buttonText('Next'));
  backButton: ElementFinder = this.selector.element(by.buttonText('Back'));
  saveButton: ElementFinder = this.selector.element(
    by.buttonText('Save & Exit')
  );
  okButton: ElementFinder = $('#ok');

  experiencesItems: ElementArrayFinder = this.selector.$$(
    'div[data-testid*="experience"]'
  );

  async clickOnNext() {
    await this.nextButton.click();
  }
}
