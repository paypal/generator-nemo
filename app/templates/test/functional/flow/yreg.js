'use strict';
module.exports = function yreg(nemo) {
  return {
    "registerYahooAccount": function() {
      var yr = nemo.view.addView('yhooreg');
      yr.fname().sendKeys('Matthew');
      yr.lname().sendKeys('Edelman');
      yr.bmonthOptionValue('11');
      yr.bdayOptionValue('7');
      yr.byearOptionValue('1974');
      return yr.maleradio().click();
    }
  };
};
