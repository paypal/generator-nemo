/*global describe, beforeEach, it */
'use strict';
var helpers = require('yeoman-generator').test;
var testutil = require('./util');

describe('cucumber', function () {
  // Disable timeout since we're doing multiple installs
  this.timeout(Infinity);


  it('creates expected cucumberjs files with yahoo example', function (done) {
    var base = testutil.makeBase('app');
    base.prompt.testFramework = 'cucumberjs';
    testutil.run(base, function (err) {
      var expected = [
        'test/functional/support/world.js',
        'test/functional/config/config.json',
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
});
