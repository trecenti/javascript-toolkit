module.exports = {
  "Landing Page" : function (browser) {
    browser
      .url('http://localhost:4000')
      .waitForElementVisible("body", 1000)
      .assert.title("JS toolkit")
      .end();
  }
};
