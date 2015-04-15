/*global describe:true, it:true, before:true, after:true */
'use strict';

var nemoFactory = require('nemo-mocha-factory'),
  lifeStory = require('../flow/lifeStory'),
  config = require('../config/nemo'),
  plugins = config,
  setup = config.setup,
  nemo = {};

describe('Nemo @exampleSuite@', function() {

  nemoFactory({
    'plugins': plugins,
    'setup': setup,
    'context': nemo
  });

  it('will @tellMyLifeStory@', function(done) {
    nemo.driver.get('http://accessify.com/features/tutorials/accessible-forms/form-examples.htm');
    lifeStory(nemo).tellLifeStory().then(function() {
      done();
    }, function(err) {
      done(err);
    });
  });
});
