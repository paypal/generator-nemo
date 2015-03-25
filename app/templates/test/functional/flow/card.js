var Card = function (nemo) {
  this.nemo = nemo;
};

var _enterForm = function (nemo, number, type) {
  nemo.view.card.numberWaitVisible().clear();
  nemo.view.card.number().sendKeys(number);
  nemo.view.card.typeOptionText(type);
  return nemo.view.card.button().click();
}
Card.prototype.addSuccess = function(number, type) {
  _enterForm(this.nemo, number, type);
  return this.nemo.view.card.successWait();
};

Card.prototype.addFailure = function(number, type) {
  _enterForm(this.nemo, number, type);
  return this.nemo.view.card.failureWait();
};

module.exports = Card;