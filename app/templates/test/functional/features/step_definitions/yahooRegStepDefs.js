
module.exports = function yahooRegStepDefs() {
  this.World = require("../../support/world.js").World;
  var yreg = require('../../flow/yreg');

  this.Given(/^I navigate to Yahoo registration Page$/, function (callback) {
    var nemo = this.nemo;
    nemo.driver.get('https://edit.yahoo.com/registration');
    callback();
  });

  this.When(/^I enter the details$/, function (callback) {
    yreg(this.nemo).registerYahooAccount().then(function () {
      callback();
    });

  });

  this.Then(/^I am able to create an account$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });
};

