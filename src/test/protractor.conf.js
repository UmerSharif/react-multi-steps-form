// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./e2e/*.js', './e2e/modules/personalDetails/*.spec.js'],

  beforeLaunch() {
    require('ts-node').register({
      project: './tsconfig.e2e.json',
    });
  },

  onPrepare() {
    // @ts-ignore
    browser.driver.manage().window().setSize(1280, 1024);
    // @ts-ignore
    browser.ignoreSynchronization = true;
    // Disable animations
    // @ts-ignore
    browser.executeScript('document.body.className += " notransition";');
    const chai = require('chai');
    const chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    // @ts-ignore
    global.chai = chai;

    browser.baseAppUrl = 'http://localhost:3000';
    browser.username = '';
    browser.password = '';
  },
};
