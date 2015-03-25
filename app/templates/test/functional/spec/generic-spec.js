/*global nemo:true, describe:true, it:true */
var Nemo = require('nemo');
var nemo = {};

describe('@generic@', function () {
  before(function (done) {
    nemo = Nemo(done);
  });
  after(function (done) {
    nemo.driver.quit().then(done);
  });
  it('should execute high level functionality using generic methods', function (done) {
    //login
    nemo.driver.get(nemo.data.baseUrl);
    nemo.view._waitVisible('#email');
    nemo.view._find('#email').sendKeys('me@mine.com');
    nemo.view._find('#password').sendKeys('11111111');
    nemo.view._find('#loginbutton').click();
    //add card
    nemo.view._waitVisible('#addccform');
    nemo.view._find('#cc').sendKeys('123456789012');
    nemo.view._finds('#type option').then(function(opts) {
      return opts[1].click();
    });
    nemo.view._find('#ccbutton').click();
    nemo.view._waitVisible('p.result.good');
    //add bank
    nemo.view._find('#addbalink').click();
    nemo.view._waitVisible('#addbaform');
    nemo.view._find('#ban').sendKeys('0123545332');
    nemo.view._find('#brn').sendKeys('343434');
    nemo.view._find('#babutton').click();
    nemo.view._waitVisible('p.result.good');
    //logout
    nemo.view._find('#logoutlink').click();
    nemo.view._waitVisible('#email').then(function () {
      done();
    }, function (err) {
      done(err);
    })
  });
});