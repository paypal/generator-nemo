var Navigate = function (nemo) {
  this.nemo = nemo;
};

var _enterLoginForm = function (nemo, user, pass) {
  nemo.driver.get(nemo.data.baseUrl);
  nemo.view.login.emailWaitVisible().sendKeys(user);
  nemo.view.login.password().sendKeys(pass);
  return nemo.view.login.button().click();
}
Navigate.prototype.loginSuccess = function(user, pass) {
  _enterLoginForm(this.nemo, user, pass);
  return this.nemo.view.login.successWait();
};

Navigate.prototype.loginFailure = function(user, pass) {
  _enterLoginForm(this.nemo, user, pass);
  return this.nemo.view.login.failureWait();

};

Navigate.prototype.logout = function() {
  this.nemo.view.nav.logoutLink().click();
  return this.nemo.view.login.emailWaitVisible();
};

Navigate.prototype.bank = function() {
  this.nemo.view.nav.bankLink().click();
  return this.nemo.view.bank.numberWaitVisible();
};

Navigate.prototype.card = function() {
  this.nemo.view.nav.cardLink().click();
  return nemo.view.card.numberWaitVisible();
};

module.exports = Navigate;