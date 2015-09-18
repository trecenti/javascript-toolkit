module.exports = {
  "Github Ribbon": function (browser) {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible("body", 1000)
      .click('.github-ribbon')
      .assert.urlEquals('https://github.com/trecenti/javascript-toolkit')
      .end();
  }
};
