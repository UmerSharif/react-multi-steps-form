import { $, by, ElementArrayFinder, ElementFinder } from 'protractor';

import BasePage from './base-component';

export default class Skills extends BasePage {
  selector: ElementFinder = $('.top-container');

  pageHeading: ElementFinder = this.selector.$(
    '.MuiTypography-root.MuiTypography-h3'
  );
  nextButton: ElementFinder = this.selector.element(by.buttonText('Next'));
  backButton: ElementFinder = this.selector.element(by.buttonText('Back'));

  skillsItems: ElementArrayFinder = this.selector.$$('input[name*=skills]');
}
