/*global nemo:true, describe:true, it:true */
var Nemo = require('nemo');
var nemo = {};

describe('@view@', function () {
  before(function (done) {
    nemo = Nemo(done);
  });
  after(function (done) {
    nemo.driver.quit().then(done);
  });
  it('should execute high level functionality using view methods', function (done) {

    //login
    nemo.driver.get(nemo.data.baseUrl);
    nemo.view.login.emailWaitVisible().sendKeys('me@mine.com');
    nemo.view.login.password().sendKeys('11111111');
    nemo.view.login.button().click();

    //add card
    nemo.view.card.numberWaitVisible().sendKeys('123456789012');
    nemo.view.card.typeOptionText('Misa');
    nemo.view.card.button().click();
    nemo.view.card.successWait();

    //add bank
    nemo.view.nav.bankLink().click();
    nemo.view.bank.numberWaitVisible().sendKeys('0123545332');
    nemo.view.bank.routing().sendKeys('343434');
    nemo.view.bank.button().click();
    nemo.view.bank.successWait();

    //logout
    nemo.view.nav.logoutLink().click();
    nemo.view.login.emailWaitVisible().then(function () {
      done();
    }, function (err) {
      done(err);
    })

  });
});
