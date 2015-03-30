var Bank = function (nemo) {
  this.nemo = nemo;
};
var _enterForm = function (nemo, ban, brn) {
  nemo.view.nav.bankLink().click();
  nemo.view.bank.numberWaitVisible(10000,'Number not visible').clear();
  nemo.view.bank.number().sendKeys(ban);
  nemo.view.bank.routing().sendKeys(brn);
  return nemo.view.bank.button().click();
}
Bank.prototype.addSuccess = function(ban, brn) {
  _enterForm(this.nemo, ban, brn);
  return this.nemo.view.bank.successWait(10000,'Success message did not appear');
};

Bank.prototype.addFailure = function(ban, brn) {
  _enterForm(this.nemo, ban, brn);
  return this.nemo.view.bank.failureWait(10000, 'Failure message did not appear');
};

module.exports = Bank;
