/*global nemo:true, describe:true, it:true */
var Nemo = require('nemo');
var Navigate = require('../flow/navigate');
var Bank = require('../flow/bank');
var Card = require('../flow/card');
var util = require('../util');

//instance variables
var nemo, navigate, bank, card;

describe('@flow@', function () {
  before(function (done) {
    nemo = Nemo(function (err) {
      done = util.checkError(err, done);
      navigate = new Navigate(nemo);
      bank = new Bank(nemo);
      card = new Card(nemo);
      done();
    });
  });
  after(function (done) {
    nemo.driver.quit().then(done);
  });
  it('should execute high level functionality using flow modules', function (done) {
    navigate.loginFailure('fail@fail.com', '11111111');
    navigate.loginSuccess('me@mine.com', '11111111');
    card.addSuccess('0123456789012345', 'Misa');
    card.addFailure('1001001', 'Misa');
    bank.addSuccess('0432787332', '92929');
    bank.addFailure('1001001', '92929');
    navigate.logout().then(util.doneSuccess(done), util.doneError(done));
  });
});