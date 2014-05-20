/*global describe:true, it:true, before:true, after:true */
'use strict';

var assert = require('assert'),
  nemoFactory = require('nemo-mocha-factory'),
  setup = require('../data/setup').lifeStorySpec,
  lifeStory = require('../lib/lifeStory'),
  plugins = require('../config/nemo-plugins'),
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
