import { browser, element, by } from 'protractor';
import SignInPage from './page-objects/signin-page';
import { waitUntilDisplayed, getToastByInnerText } from './util/utils';

describe('Registration Form e2e Test', function () {
  it('should have a title', async () => {
    browser.waitForAngularEnabled(false);
    browser.get(browser.baseAppUrl);
    expect(browser.getTitle()).toEqual('Multi Steps Online Registration');
  });
});
