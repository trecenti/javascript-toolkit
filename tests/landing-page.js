module.exports = {
  "Landing Page": function (browser) {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible("body", 1000)
      .assert.title("JavaScript Toolkit")
      .end();
  }
};
