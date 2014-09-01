module.exports = {
  "Application Frameworks": function (browser) {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible("body", 500)
      .click('a[href*="application-frameworks"]')
      .waitForElementVisible("body", 500)
      .assert.title('Javascript Toolkit - Application Frameworks')
      .end();
  },
  "Application Utilities": function (browser) {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible("body", 500)
      .click('a[href*="application-utilities"]')
      .waitForElementVisible("body", 500)
      .assert.title('Javascript Toolkit - Application Utilities')
      .end();
  },
  "Dynamic Loading": function (browser) {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible("body", 500)
      .click('a[href*="dynamic-loading"]')
      .waitForElementVisible("body", 500)
      .assert.title('Javascript Toolkit - Dynamic Loading')
      .end();
  }
};
