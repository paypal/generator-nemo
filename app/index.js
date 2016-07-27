'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var nemoBanner = require('./lib/banner');
var chalk = require('chalk');
var fs = require('fs');
var gruntFileApi = require('gruntfile-api');

var NemoGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');
    this.options['skip-install'] = true;
    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });

  },

  askFor: function () {
    var prompts;
    var done = this.async();

    nemoBanner();

    prompts = [
      {
        type: 'input',
        name: 'baseDirOption',
        message: 'What is the desired base directory for your tests, starting from your app root directory?',
        default: "test/functional"
      }, {
        type: 'list',
        name: 'browserOption',
        message: 'Which desktop browser do you want to use by default?',
        default: "phantomjs",
        "choices": ["phantomjs", "firefox", "chrome", "safari"]
      }, {
        type: 'list',
        name: 'testFramework',
        message: 'Which test framework would you like to use?',
        default: "mocha",
        "choices": ["mocha", "cucumberjs"]
      }
    ];

    this.prompt(prompts, function (props) {
      this.baseDirOption = props.baseDirOption;
      this.browserOption = props.browserOption;
      this.testFramework = props.testFramework;
      this.deployedUrl = (!!props.deployedUrl) ? props.deployedUrl : undefined;
      done();
    }.bind(this));
  },

  editGruntfile: function () {
    var that = this;
    var done = this.async();
    var exists = fs.existsSync('Gruntfile.js');
    var gruntContent;
    var gruntfileData;
    var output
    if (!exists) {
      gruntContent = 'module.exports = function (grunt) { require(\'grunt-config-dir\')(grunt, {configDir: require(\'path\').resolve(\'tasks\')});};';
      fs.writeFileSync('Gruntfile.js', gruntContent);
    }
    //let's update Gruntfile.js if possible
    gruntfileData = fs.readFileSync('Gruntfile.js');
    output = gruntFileApi.init(gruntfileData);
    output.registerTask('auto', ['loopmocha'], 'overwrite');
    if (that.sauceSetup === "Yes") {
      output.registerTask('auto:mobile', ['loopmocha:sauce'], 'overwrite');
    }
    fs.writeFile('Gruntfile.js', output.toString(), 'utf8', function (err) {
      if (err) {
        return console.log(err);
      }
      done();
    });
  },

  app: function () {
    var baseDir = this.baseDirOption;
    var utilDir = baseDir + "/util";
    var configDir = baseDir + "/config";
    var locatorDir = baseDir + "/locator";
    var reportDir = baseDir + "/report";
    var specDir = baseDir + "/spec";
    var featureDir = baseDir + "/features";
    var stepDefDir = featureDir + "/step_definitions";
    var flowDir = baseDir + "/flow";
    var taskDir = "tasks/";
    var done = this.async();
    var _ = this._;
    var self = this;
    var newval;
    //base test directory
    this.mkdir(baseDir);
    this._.templateSettings.imports.loscape = function (val) {
      newval = "<%=" + val + "%>";
      return newval;
    };
    function copyData(prefix, dir, fileNames) {
      fileNames.forEach(function (fileName) {
        self.copy(prefix + fileName, dir + fileName);
      });
    }
    function copyFlows(dir, fileNames) {
      copyData('test/functional/flow', dir, fileNames);
    }
    function copyLocators(dir, fileNames) {
      copyData('test/functional/locator', dir, fileNames);
    }
    function copySpecs(dir, fileNames) {
      copyData('test/functional/spec', dir, fileNames);
    }
    function copyFeatures(dir, fileNames) {
      copyData('test/functional/features', dir, fileNames);
    }
    function setUpDirectories() {
      //config dir
      self.mkdir(configDir);
      self.template('_config.json', configDir + '/config.json');
      //locator dir
      self.mkdir(locatorDir);
      //report dir
      self.mkdir(reportDir);
      self.copy('test/functional/report/README.md', reportDir + '/README.md');
      self.mkdir(flowDir);
    }
    if (self.testFramework === 'mocha') {
      self.template('_loopmocha.js', taskDir + 'loopmocha.js');
      setUpDirectories();
      self.mkdir(utilDir);
      self.copy('test/functional/util/index.js', utilDir + '/index.js');
      copyFlows(flowDir, ['/bank.js', '/card.js', '/navigate.js']);
      copyLocators(locatorDir, ['/bank.json', '/card.json', '/login.json', '/nav.json'])
      self.mkdir(specDir);
      copySpecs(specDir, ['/flow-spec.js', '/generic-spec.js', '/view-spec.js'])
    } else if (self.testFramework === 'cucumberjs') {
      self.mkdir(baseDir + "/support");
      self.template('_world.js', baseDir + "/support/" + 'world.js');
      self.template('_cucumberjs.js', taskDir + 'cucumberjs.js');
      setUpDirectories();
      self.mkdir(featureDir);
      self.mkdir(stepDefDir);
      copyFeatures(featureDir, ['/step_definitions/hooks.js', '/yahooreg.feature', '/step_definitions/yahooRegStepDefs.js']);
      copyLocators(locatorDir, ['/yhooreg.json']);
      copyFlows(flowDir, ['/yreg.js']);
    }
    done();
    self.mkdir('app/templates');
  },
  installThings: function () {
    var listening = false;
    var cmd;
    var done;
    if (this.testFramework === 'mocha') {
      cmd = this.spawnCommand("npm", ["install", "--save-dev", "nemo@^v1.0.0", "nemo-view@^v1.0.0", "grunt-loop-mocha@^v1.0.0", "nconf@~v0.6.7", "xunit-file@v0.0.4", "grunt-config-dir@^0.3.2"]);
    } else if (this.testFramework === 'cucumberjs') {
      cmd = this.spawnCommand("npm", ["install", "--save-dev", "cucumber@^0.4.4", "nemo@^v1.0.0", "nemo-view@^v1.0.0", "path@^0.11.14", "grunt-cucumberjs@^v0.5.1", "grunt-config-dir@^0.3.2"]);
    }
    done = this.async();
    cmd.on('close', function (code) {
      console.log('child process exited with code ' + code);
      done();
    });

    cmd.on('error', function (err) {
      console.log('child process exited with error ' + err);
      done();
    });
    cmd.on('message', function () {
      if (listening === false) {
        listening = true;
        cmd.stdout.on('data', function (data) {
          console.log('Received data...');
          console.log(data.toString('utf8'));
        });
      }
    });
  },

  finalValidation: function () {
    var done = this.async();
    var browser = this.browserOption;
    var tryRunning;
    if (this.testFramework === 'mocha') {
      tryRunning = "Now try running 'grunt auto'";
      tryRunning += (this.sauceSetup === "Yes") ? "or 'grunt auto:mobile'" : "";
      this.log(chalk.green(tryRunning));
    } else if (this.testFramework === 'cucumberjs') {
      this.log(chalk.green("Now try running 'grunt cucumberjs'"));
    }
    done();
  }
});

module.exports = NemoGenerator;
