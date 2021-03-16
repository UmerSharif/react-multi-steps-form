import { browser, element, by } from 'protractor';
import WelcomePage from './page-objects/welcome-page';
import { waitUntilDisplayed, getToastByInnerText } from './util/utils';

describe('Registration Form e2e Test', function () {
  let welcomePage = new WelcomePage();
  it('should have a title', async () => {
    browser.waitForAngularEnabled(false);
    browser.get(browser.baseAppUrl);
    await browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Multi Steps Online Registration');
  });

  it('should continer welcome on title', async () => {
    await browser.sleep(1000);
    expect(welcomePage.welcomeHeading.getText()).toBe(
      'Welcome to Online Registration'
    );
  });

  it('should go to personal detials page after next button is clicked', async () => {
    await waitUntilDisplayed(welcomePage.nextButton);
    await welcomePage.clickOnNext();
    await browser.sleep(3000);
  });
});
