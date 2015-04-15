var Card = function (nemo) {
  this.nemo = nemo;
};

var _enterForm = function (nemo, number, type) {
  nemo.view.card.numberWaitVisible(10000, 'Number not visible').clear();
  nemo.view.card.number().sendKeys(number);
  nemo.view.card.typeOptionText(type);
  return nemo.view.card.button().click();
}
Card.prototype.addSuccess = function(number, type) {
  _enterForm(this.nemo, number, type);
  return this.nemo.view.card.successWait(10000,'Success message did not appear');
};

Card.prototype.addFailure = function(number, type) {
  _enterForm(this.nemo, number, type);
  return this.nemo.view.card.failureWait(10000, 'Failure message did not appear');
};

module.exports = Card;
