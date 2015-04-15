/*global describe, beforeEach, it */

'use strict';
var helpers = require('yeoman-generator').test;
var assert = require('assert');
var path = require('path');
var testutil = require('./util');

describe('nemo generator', function () {
  // Disable timeout since we're doing multiple installs
  this.timeout(Infinity);


  it('creates expected mocha files with yahoo example', function (done) {
    var base = testutil.makeBase('app');
    testutil.run(base, function (err) {
      var expected = [
        'tasks/loopmocha.js',
        'test/functional/config/config.json',
        'test/functional/locator/bank.json',
        'test/functional/locator/card.json',
        'test/functional/locator/login.json',
        'test/functional/locator/nav.json',
        'test/functional/flow/bank.js',
        'test/functional/flow/card.js',
        'test/functional/flow/navigate.js',
        'test/functional/spec/flow-spec.js',
        'test/functional/spec/generic-spec.js',
        'test/functional/spec/view-spec.js',
        'Gruntfile.js'
      ];
      helpers.assertFile(expected);
      testutil.assertGruntTasks(['auto']);
      assert(require(path.resolve(__dirname, '../temp/test/functional/config/config')).driver.browser === 'phantomjs');
      done(err);
    });
  });

});
