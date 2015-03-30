/*global nemo:true, describe:true, it:true */
var Nemo = require('nemo');

var util = require('../util');

//instance variables
var nemo;

describe('Nemo @landingSuite@', function() {

  before(function (done) {
    nemo = Nemo(function (err) {
      done = util.checkError(err, done);
      done();
    });
  });

  it('will @loadAndVerifyLandingPage@', function(done) {
    nemo.driver.get(nemo.data.targetBaseUrl);
    nemo.view.landing.pageVisible();
    nemo.view.landing.page().getText().then(function(text) {
      if (text === "<%= landingPageText %>") {
        done();
      } else {
        done(new Error("Didnt find text: <%= landingPageText %>"));
      }
    }, function(err) {
      done(err);
    });
  });
});
