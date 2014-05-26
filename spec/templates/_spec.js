/*global describe:true, it:true, before:true, after:true */
'use strict';

var nemoFactory = require('nemo-mocha-factory'),
  plugins = require('../config/nemo-plugins'),
  setup = {
    "view": [<%= views %>]
  };

describe('Nemo @<%= name %>Suite@', function() {

  nemoFactory({
    'plugins': plugins,
    'setup': setup
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
