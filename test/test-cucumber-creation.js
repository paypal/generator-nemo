/*global describe, beforeEach, it */
'use strict';
var helpers = require('yeoman-generator').test;
var testutil = require('./util');

describe('nemo generator', function () {
  // Disable timeout since we're doing multiple installs
  this.timeout(Infinity);


  it('creates expected cucumberjs files with yahoo example', function (done) {
    var base = testutil.makeBase('app');
    base.prompt.testFramework = 'cucumberjs';
    testutil.run(base, function (err) {
      var expected = [
        'test/functional/support/world.js',
        'test/functional/config/nemo-plugins.json',
        'test/functional/locator/yhooreg.json',
        'test/functional/flow/yreg.js',
        'tasks/cucumberjs.js',
        'test/functional/features/step_definitions/hooks.js',
        'test/functional/features/yahooreg.feature',
        'test/functional/features/step_definitions/yahooRegStepDefs.js',
        'Gruntfile.js'
      ];
      helpers.assertFile(expected);
      done(err);
    });
  });

  it('creates expected mocha tests that validate text on the app', function (done) {
    var base = testutil.makeBase('app');
    base.prompt.testFramework = 'cucumberjs';
    base.prompt.customSpec = 'Yes';
    testutil.run(base, function (err) {
      var expected = [
        'test/functional/support/world.js',
        'test/functional/config/nemo-plugins.json',
        'test/functional/locator/landing.json',
        'test/functional/features/landing.feature',
        'tasks/cucumberjs.js',
        'test/functional/features/step_definitions/hooks.js',
        'test/functional/features/step_definitions/landingStepDefs.js',
        'Gruntfile.js'
      ];
      helpers.assertFile(expected);
      done(err);
    });
  });
});
