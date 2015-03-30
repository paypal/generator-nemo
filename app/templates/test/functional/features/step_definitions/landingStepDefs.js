module.exports= function landingStepDefs() {
  this.World = require("../../support/world.js").World;
  this.Given(/^I navigate to my landing page "([^"]*)"$/, function (url, callback) {
    this.nemo.driver.get(url);
    callback();
  });

  this.Then(/^I see presence of text "([^"]*)"$/, function (text, callback) {
    var landing = this.nemo.view.landing;
    landing.pageVisible();
    landing.page().getText().then(function (actualText) {
      if (actualText === text) {
        callback();
      } else {
        callback.fail(new Error("Didnt find text: " + text));
      }
    });
  });
};

