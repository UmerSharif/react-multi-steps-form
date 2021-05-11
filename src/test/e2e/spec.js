import { browser, element, by } from 'protractor';
import WelcomePage from './page-objects/welcome-page';
import PersonalDetailsPage from './page-objects/personalDetails-page';
import SkillsPage from './page-objects/skills-page';
import { waitUntilDisplayed, getToastByInnerText } from './util/utils';

describe('Registration Form e2e Test', function () {
  let welcomePage = new WelcomePage();
  let personalDetailsPage = new PersonalDetailsPage();
  let skillsPage = new SkillsPage();

  it('should have a title', async () => {
    browser.waitForAngularEnabled(false);
    browser.get(browser.baseAppUrl);
    //await browser.sleep(2000);
    expect(browser.getTitle()).toEqual('Multi Steps Online Registration');
  });

  it('should continer welcome on title', async () => {
    //await browser.sleep(1000);
    expect(welcomePage.welcomeHeading.getText()).toBe(
      'Welcome to Online Registration'
    );
  });

  it('should go to personal detials page after next button is clicked', async () => {
    await waitUntilDisplayed(welcomePage.nextButton);
    await welcomePage.clickOnNext();
    //await browser.sleep(3000);
  });

  it('should load Personal Details page and show correct title', async () => {
    await waitUntilDisplayed(personalDetailsPage.nextButton);
    expect(personalDetailsPage.pageHeading.getText()).toBe('Personal Details');
  });

  it('should show error validatio error when Next button is clicked', async () => {
    await personalDetailsPage.clickOnNext();
    // Todo: expect error
    //await browser.sleep(1000);
    await personalDetailsPage.firstName.sendKeys('Bill');
    //await browser.sleep(1000);
    await personalDetailsPage.lastName.sendKeys('Huang');
    await personalDetailsPage.radioMale.click();
    await personalDetailsPage.phone.sendKeys('0404001002');
    await personalDetailsPage.email.sendKeys('bill@hot.com');
    await personalDetailsPage.addressLine1.sendKeys('100 King st');
    await personalDetailsPage.suburb.sendKeys('nor');
    await browser.sleep(2000);
    await personalDetailsPage.suburbListItems.get(0).click();
    await browser.sleep(1000);
    await personalDetailsPage.dob.sendKeys('12/12/1980');
    await browser.sleep(1000);
    await personalDetailsPage.clickOnNext();
    await browser.sleep(2000);
  });

  it('should show skills when next button is clicked', async () => {
    expect(skillsPage.pageHeading.getText()).toBe('Skills');

    await skillsPage.skillsItems.get(0).click();
    await skillsPage.skillsItems.get(3).click();
    await skillsPage.skillsItems.get(4).click();
    await browser.sleep(2000);
    await skillsPage.clickOnNext();
    await browser.sleep(2000);
  });
});
