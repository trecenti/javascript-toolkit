module.exports = {
  "Test Runners": function (browser) {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible("body", 500)
      .click('a[href*="test-runners"]')
      .waitForElementVisible("body", 500)
      .assert.title('JavaScript Toolkit - Test Runners')
      .end();
  },
  "Frameworks": function (browser) {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible("body", 500)
      .click('a[href*="frameworks"]')
      .waitForElementVisible("body", 500)
      .assert.title('JavaScript Toolkit - Frameworks')
      .end();
  },
  "End to End": function (browser) {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible("body", 500)
      .click('a[href*="end-to-end"]')
      .waitForElementVisible("body", 500)
      .assert.title('JavaScript Toolkit - End to End')
      .end();
  },
  "Test Support": function (browser) {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible("body", 500)
      .click('a[href*="test-support"]')
      .waitForElementVisible("body", 500)
      .assert.title('JavaScript Toolkit - Test Support')
      .end();
  }
};
