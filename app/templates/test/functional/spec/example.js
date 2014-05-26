/*global describe:true, it:true, before:true, after:true */
'use strict';

var nemoFactory = require('nemo-mocha-factory'),
  lifeStory = require('../lib/lifeStory'),
  plugins = require('../config/nemo-plugins'),
  setup = {
    "view": ['formExample']
  };

describe('Nemo @exampleSuite@', function() {

  nemoFactory({
    'plugins': plugins,
    'setup': setup
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
