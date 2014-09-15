/*global describe:true, it:true, before:true, after:true */
'use strict';

var nemoFactory = require('nemo-mocha-factory'),
  yreg = require('../flow/yreg'),
  plugins = require('../config/nemo-plugins'),
  nemo = {},
  setup = {};

describe('Nemo @yhooregSuite@', function() {

  nemoFactory({
    'plugins': plugins,
    'setup': setup,
    'context': nemo
  });

  it('will @yhooregTest@', function(done) {
    nemo.driver.get('https://edit.yahoo.com/registration');
    yreg(nemo).registerYahooAccount();
    nemo.driver.sleep(4000).then(function() {
        done();
    }, function(err) {
      done(err);
    });
  });
});
