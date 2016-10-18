/*global describe, beforeEach, it */

'use strict';
var helpers = require('yeoman-test');
var yeomanAssert = require('yeoman-assert');
var assert = require('assert');
var path = require('path');
var testutil = require('./util');

describe('mocha', function () {
  // Disable timeout since we're doing multiple installs
  this.timeout(Infinity);

  var expected = {
    mocha: [
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
    ],
    server: ['package.json', 'server.js', 'public/app.js', 'public/app.css', 'public/index.html']
  };
  it('creates expected mocha supporting files', function (done) {
    var base = testutil.makeBase('app');
    testutil.run(base, function (err) {
      yeomanAssert.file(expected.mocha);
      testutil.assertGruntTasks(['auto']);
      assert(require(path.resolve(__dirname, '../temp/test/functional/config/config')).driver.browser === 'phantomjs');
      done(err);
    });
  });

  //TODO: figure out why this unit test is failing and fix it
  //it('creates expected mocha/server supporting files', function (done) {
  //  var base = testutil.makeBase('app');
  //  base.prompt.existingServer = 'No';
  //  base.prompt.newAppDir = 'myNewApp';
  //  testutil.run(base, function (err) {
  //    //helpers.assertFile(expected.mocha.map(function (file) {return 'myNewApp/' + file}));
  //    yeomanAssert.file(expected.server);//.map(function (file) {return 'myNewApp/' + file}));
  //    testutil.assertGruntTasks(['auto']);
  //    assert(require(path.resolve(__dirname, '../temp/test/functional/config/config')).driver.browser === 'phantomjs');
  //    done(err);
  //  });
  //});
});
