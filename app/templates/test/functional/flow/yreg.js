'use strict';
module.exports = function yreg(nemo) {
  return {
    "registerYahooAccount": function() {
      var yr = nemo.view.yhooreg;
      yr.fname().sendKeys('MyFirstName');
      yr.lname().sendKeys('MyLastName');
      yr.bmonthOptionValue('1');
      yr.bdayOptionValue('1');
      yr.byearOptionValue('2000');
      return yr.maleradio().click();
    }
  };
};
