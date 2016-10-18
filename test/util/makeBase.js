//inspired by generator-kraken tests

'use strict';

module.exports = function makeBase(generator) {
  return Object.create({
    type: 'nemo:' + generator,

    args: [],

    dependencies: [
      '../app'
    ],

    options: {
      'skip-install': true
    },

    prompt: {
      'existingServer': true,
      'newAppDir': 'myNewApp',
      'testFramework': 'mocha',
      'baseDirOption': 'test/functional',
      'browserOption': 'phantomjs'
    }
  });
};
