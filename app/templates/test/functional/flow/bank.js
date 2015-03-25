var Bank = function (nemo) {
  this.nemo = nemo;
};
var _enterForm = function (nemo, ban, brn) {
  nemo.view.nav.bankLink().click();
  nemo.view.bank.numberWaitVisible().clear();
  nemo.view.bank.number().sendKeys(ban);
  nemo.view.bank.routing().sendKeys(brn);
  return nemo.view.bank.button().click();
}
Bank.prototype.addSuccess = function(ban, brn) {
  _enterForm(this.nemo, ban, brn);
  return this.nemo.view.bank.successWait();
};

Bank.prototype.addFailure = function(ban, brn) {
  _enterForm(this.nemo, ban, brn);
  return this.nemo.view.bank.failureWait();
};

module.exports = Bank;