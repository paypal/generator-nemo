/*global describe:true, it:true, before:true, after:true */
'use strict';

var nemoFactory = require('nemo-mocha-factory'),
  config = require('../config/nemo'),
  plugins = config,
  setup = config.setup,
  nemo = {};

describe('Nemo @<%= name %>Suite@', function() {

  nemoFactory({
    'plugins': plugins,
    'setup': setup,
    'context': nemo
  });

  it('will @<%= name %>Test@', function(done) {
    nemo.driver.get(nemo.props.targetBaseUrl);
    nemo.driver.sleep(1000).then(function() {
        done();
    }, function(err) {
      done(err);
    });
  });
});
