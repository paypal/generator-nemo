'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var banner = require('./lib/banner');
var chalk = require('chalk');


var NemoGenerator = yeoman.generators.Base.extend({
  init: function() {
    this.pkg = require('../package.json');
    this.options['skip-install'] = true;
    this.on('end', function() {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function() {
    var done = this.async();

    //Nemo banner
    banner();

    // replace it with a short and sweet description of your generator
    //this.log(chalk.magenta('You\'re using the fantastic Nemo generator.'));

    var prompts = [{
      type: 'input',
      name: 'baseDirOption',
      message: 'What is the desired base directory for your tests, starting from your app root directory?',
      default: "test/functional"
    }, {
      type: 'list',
      name: 'browserOption',
      message: 'Which browser do you want to use by default?',
      default: "phantomjs",
      "choices": ["phantomjs", "firefox"]
    }];

    this.prompt(prompts, function(props) {
      this.baseDirOption = props.baseDirOption;
      this.browserOption = props.browserOption;

      done();
    }.bind(this));
  },

  app: function() {
    var baseDir = this.baseDirOption,
      configDir = baseDir + "/config",
      locatorDir = baseDir + "/locator",
      reportDir = baseDir + "/report",
      specDir = baseDir + "/spec",
      dataDir = baseDir + "/data",
      viewDir = baseDir + "/view",
      browserOption = this.browserOption;
    //base test directory
    this.mkdir(baseDir);
    this.copy('_Gruntfile.js', 'Gruntfile.js');
    //config dir
    this.mkdir(configDir);
    this.copy('test/functional/config/nemo-plugins.json', configDir + '/nemo-plugins.json');
    //locator dir
    this.mkdir(locatorDir);
    this.copy('test/functional/locator/formExample.json', locatorDir + '/formExample.json');
    //report dir
    this.mkdir(reportDir);
    this.copy('test/functional/report/README.md', reportDir + '/README.md');
    //spec dir
    this.mkdir(specDir);
    this.copy('test/functional/spec/example.js', specDir + '/example.js');
    //data dir
    this.mkdir(dataDir);
    this.copy('test/functional/data/setup.js', dataDir + '/setup.js');
    //view dir
    this.mkdir(viewDir);
    this.copy('test/functional/view/formExample.js', viewDir + '/formExample.js');

    // this.mkdir('app/templates');

    // this.copy('_package.json', 'package.json');
    // this.copy('_bower.json', 'bower.json');
  },
  installThings: function() {
    var cmd = this.spawnCommand("npm", ["install", "--save-dev", "nemo-mocha-factory@v0.0.1", "grunt-loop-mocha@v0.2.6", "nemo-drivex@v0.1.0", "nemo-screenshot@v0.1.7", "nconf@~v0.6.7", "xunit-file@v0.0.4"]);
    cmd.on('close', function(code) {
      console.log('child process exited with code ' + code);

    });
  }

  // projectfiles: function () {
  //   this.copy('editorconfig', '.editorconfig');
  //   this.copy('jshintrc', '.jshintrc');
  // }
});

module.exports = NemoGenerator;