'use strict';
module.exports = function yreg(nemo) {
  return {
    "registerYahooAccount": function() {
      var yr = nemo.view.yhooreg;
      yr.fname().sendKeys('Matthew');
      yr.lname().sendKeys('Edelman');
      yr.bmonthOptionValue('11');
      yr.bdayOptionValue('7');
      yr.byearOptionValue('1974');
      yr.maleradio().click();
    }
  };
};
