/*global describe, beforeEach, it */

'use strict';
var helpers = require('yeoman-generator').test;
var testutil = require('./util');

describe('nemo generator', function () {
  // Disable timeout since we're doing multiple installs
  this.timeout(Infinity);


  it('creates expected mocha files with yahoo example', function (done) {
    var base = testutil.makeBase('app');
    testutil.run(base, function (err) {
      var expected = [
        'tasks/loopmocha.js',
        'test/functional/config/nemo-plugins.json',
        'test/functional/locator/yhooreg.json',
        'test/functional/flow/yreg.js',
        'test/functional/spec/yhooreg.js',
        'Gruntfile.js'
      ];
      helpers.assertFile(expected);
      testutil.assertGruntTasks(['auto']);
      done(err);
    });
  });

  it('creates expected mocha tests that validate text on the app', function (done) {
    var base = testutil.makeBase('app');
    base.prompt.customSpec = 'Yes';
    testutil.run(base, function (err) {
      var expected = [
        'tasks/loopmocha.js',
        'test/functional/config/nemo-plugins.json',
        'test/functional/locator/landing.json',
        'test/functional/spec/landing.js',
        'Gruntfile.js'
      ];
      helpers.assertFile(expected);
      testutil.assertGruntTasks(['auto']);
      done(err);
    });
  });
  it('creates expected mocha tests with custom validation and sauce setup', function (done) {
    var base = testutil.makeBase('app');
    base.prompt.customSpec = 'Yes';
    base.prompt.sauceSetup = 'Yes';
    base.prompt.sauceUser = 'user';
    base.prompt.sauceKey = 'key';
    testutil.run(base, function (err) {
      var expected = [
        'tasks/loopmocha.js',
        'test/functional/config/nemo-plugins.json',
        'test/functional/locator/landing.json',
        'test/functional/spec/landing.js',
        'Gruntfile.js'
      ];
      helpers.assertFile(expected);
      testutil.assertGruntTasks(['auto', 'auto:mobile']);
      done(err);
    });
  });
});
