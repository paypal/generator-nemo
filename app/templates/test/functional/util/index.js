'use strict';
module.exports.waitForJSReady = function waitForJSReady(nemo) {
  return nemo.driver.wait(function() {
      return nemo.driver.executeScript(function() {
          return document.getElementsByTagName('body')[0].getAttribute('data-loaded');
      });
    }
    , 5000, 'JavaScript didn\'t load').then(function() {
      return null;
    });
};

module.exports.doneSuccess = function (callback) {
  return function () {
    callback();
  };
};

module.exports.doneError = function (callback) {
  return function (err) {
    callback(err);
  };
};

module.exports.checkError = function (err, callback) {
  if (err) {
    callback(err);
    return function () { /* noop */};
  }
  return callback;
}