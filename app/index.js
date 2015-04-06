'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var banner = require('./lib/banner');
var chalk = require('chalk');
var fs = require('fs');
//var _ = require('lodash');
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
      message: 'Which desktop browser do you want to use by default?',
      default: "phantomjs",
      "choices": ["phantomjs", "firefox", "chrome", "safari"]
    }, {
      type: 'list',
      name: 'testFramework',
      message: 'Which test framework would you like to use?',
      default: "mocha",
      "choices": ["mocha", "cucumberjs"]
    },
      {
        type: 'list',
        name: 'customSpec',
        choices: ['Yes', 'No'],
        message: 'Would you like to add a custom spec for your application? It will test for presence of text on your landing page.'

      }, {
        type: 'input',
        name: 'targetBaseUrl',
        default: 'http://localhost:8000',
        message: 'What is the URL of your application landing page (where your first test should start)?',
        when: function (answers) {
          return (answers.customSpec === "Yes");
        }
      }, {
        type: 'input',
        name: 'landingPageLocator',
        default: '#wrapper h1',
        message: 'What CSS selctor will select distinct text on your landing page?',
        validate: function (landingPageSelector) {
          if (landingPageSelector !== "") {
            return true;
          }
          return "You need to add a CSS selector for your test to use.";
        },
        when: function (answers) {
          return (answers.customSpec === "Yes");
        }
      }, {
        type: 'input',
        name: 'landingPageText',
        default: 'Hello, index!',
        message: 'What text should appear on your application\'s landing page within the locator provided above?',
        validate: function (homePageText) {
          if (homePageText !== "") {
            return true;
          }
          return "You need to add some text for your first test to check.";
        },
        when: function (answers) {
          return (answers.customSpec === "Yes");
        }
      }, {
        type: 'input',
        name: 'deployedUrl',
        message: 'What is your deployed application landing page URL (if different from your already supplied URL)',
        when: function (answers) {
          return (answers.customSpec === "Yes");
        }
      }, {
        type: 'list',
        name: 'sauceSetup',
        choices: ['Yes', 'No'],
        message: 'Would you like to set up SauceLabs to test on mobile browsers?'
      }, {
        type: 'input',
        name: 'sauceUser',
        message: 'What is your SauceLabs username?',
        validate: function (username) {
          if (username !== "") {
            return true;
          }
          return "You need to provide a username.";
        },
        when: function (answers) {
          return (answers.sauceSetup === "Yes");
        }
      }, {
        type: 'input',
        name: 'sauceKey',
        message: 'What is your SauceLabs access key?',
        validate: function (key) {
          if (key !== "") {
            return true;
          }
          return "You need to provide an access key.";
        },
        when: function (answers) {
          return (answers.sauceSetup === "Yes");
        }
      }];

    this.prompt(prompts, function (props) {
      this.baseDirOption = props.baseDirOption;
      this.browserOption = props.browserOption;
      this.customSpec = props.customSpec;
      this.targetBaseUrl = props.targetBaseUrl;
      this.landingPageLocator = props.landingPageLocator;
      this.landingPageText = props.landingPageText;
      this.sauceSetup = props.sauceSetup;
      this.sauceUser = props.sauceUser;
      this.sauceKey = props.sauceKey;
      this.testFramework = props.testFramework;
      this.deployedUrl = (!!props.deployedUrl) ? props.deployedUrl : undefined;
      done();
    }.bind(this));
  },
  editGruntfile: function () {
    var that = this,
      done = this.async(),
      exists = fs.existsSync('Gruntfile.js');
    if (!exists) {
      var gruntContent = 'module.exports = function (grunt) { require(\'grunt-config-dir\')(grunt, {configDir: require(\'path\').resolve(\'tasks\')});};';
      fs.writeFileSync('Gruntfile.js', gruntContent);
    }
    //let's update Gruntfile.js if possible
    var gruntfileData = fs.readFileSync('Gruntfile.js'),
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
    var baseDir = this.baseDirOption,
      utilDir = baseDir + "/util",
      configDir = baseDir + "/config",
      locatorDir = baseDir + "/locator",
      reportDir = baseDir + "/report",
      specDir = baseDir + "/spec",
      featureDir = baseDir + "/features",
      stepDefDir = featureDir + "/step_definitions",
      dataDir = baseDir + "/data",
      flowDir = baseDir + "/flow",
      browserOption = this.browserOption,
      testFrameworkOption = this.testFramework,
      taskDir = "tasks/";
    var done = this.async();
    //base test directory
    this.mkdir(baseDir);
    //console.log("_", this._);
    var _ = this._;
    this._.templateSettings.imports.loscape = function (val) {
      var newval = "<%=" + val + "%>";
      return newval;
    };
    if (this.testFramework === 'mocha') {
      this.template('_loopmocha.js', taskDir + 'loopmocha.js');
    } else if (this.testFramework === 'cucumberjs') {
      this.mkdir(baseDir + "/support");
      this.template('_world.js', baseDir + "/support/" + 'world.js');
      this.template('_cucumberjs.js', taskDir + 'cucumberjs.js');
    }


    //config dir
    this.mkdir(configDir);
    this.template('_config.json', configDir + '/config.json');
    //locator dir
    this.mkdir(locatorDir);

    //report dir
    this.mkdir(reportDir);
    this.copy('test/functional/report/README.md', reportDir + '/README.md');


    if (this.testFramework === 'cucumberjs') {
      this.copy('test/functional/features/step_definitions/hooks.js', featureDir + '/step_definitions/hooks.js');
      this.mkdir(featureDir);
      this.mkdir(stepDefDir);
    } else if (this.testFramework === 'mocha') {
      this.mkdir(utilDir);
      this.copy('test/functional/util/index.js', utilDir + '/index.js');
    }

    if (this.customSpec === "Yes") {
      this.template('test/functional/locator/_landing.json', locatorDir + '/landing.json');
      if (this.testFramework === 'mocha') {
        this.template('test/functional/spec/_landing.js', specDir + '/landing.js');
      } else if (this.testFramework === 'cucumberjs') {
        this.template('test/functional/features/landing.feature', featureDir + '/landing.feature');
        this.copy('test/functional/features/step_definitions/landingStepDefs.js', featureDir + '/step_definitions/landingStepDefs.js');
      }
    } else {
      //data dir
      //this.mkdir(dataDir);
      //this.template('test/functional/data/_setup.js', dataDir + '/setup.js');
      //flow dir
      this.mkdir(flowDir);

      //copy flows

      if (this.testFramework === 'mocha') {
        this.copy('test/functional/flow/bank.js', flowDir + '/bank.js');
        this.copy('test/functional/flow/card.js', flowDir + '/card.js');
        this.copy('test/functional/flow/navigate.js', flowDir + '/navigate.js');
        //spec dir
        this.mkdir(specDir);
        this.copy('test/functional/locator/bank.json', locatorDir + '/bank.json');
        this.copy('test/functional/locator/card.json', locatorDir + '/card.json');
        this.copy('test/functional/locator/login.json', locatorDir + '/login.json');
        this.copy('test/functional/locator/nav.json', locatorDir + '/nav.json');
        //copy specs
        this.template('test/functional/spec/flow-spec.js', specDir + '/flow-spec.js');
        this.template('test/functional/spec/generic-spec.js', specDir + '/generic-spec.js');
        this.template('test/functional/spec/view-spec.js', specDir + '/view-spec.js');
      } else if (this.testFramework === 'cucumberjs') {
        this.copy('test/functional/features/yahooreg.feature', featureDir + '/yahooreg.feature');
        this.copy('test/functional/features/step_definitions/yahooRegStepDefs.js', featureDir + '/step_definitions/yahooRegStepDefs.js');
        this.copy('test/functional/locator/yhooreg.json', locatorDir + '/yhooreg.json');
        this.copy('test/functional/flow/yreg.js', flowDir + '/yreg.js');
      }
    }
    done();
    this.mkdir('app/templates');

    //this.copy('_package.json', 'package.json');
    //this.copy('_bower.json', 'bower.json');
  },
  installThings: function () {
    var listening = false, cmd;
    if (this.testFramework === 'mocha') {
      cmd = this.spawnCommand("npm", ["install", "--save-dev", "nemo@v1.0.0-alpha.1", "nemo-view@v1.0.0-alpha.1", "grunt-loop-mocha@v1.0.0-alpha.7", "nconf@~v0.6.7", "xunit-file@v0.0.4", "grunt-config-dir@^0.3.2"]);
    } else if (this.testFramework === 'cucumberjs') {
      cmd = this.spawnCommand("npm", ["install", "--save-dev", "cucumber@^0.4.4", "nemo@v1.0.0-alpha.1", "nemo-view@v1.0.0-alpha.1", "path@^0.11.14", "grunt-cucumberjs@^v0.5.1", "grunt-config-dir@^0.3.2"]);
    }
    var done = this.async();
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
    //if the browser is phantomjs or chrome, check for phantomjs or chromedriver
    //if (browser === "phantomjs" || browser === "chrome") {
    //  var myBrowser = (browser === "phantomjs") ? ["PhantomJS", "PhantomJS"] : ["Chrome", "chromedriver"];
    //  this.log(chalk.green("You selected " + myBrowser[0] + " as your browser. If you haven't already, please install " + myBrowser[1] + " to run tests locally."));
    //  this.log(chalk.green("Please see"), chalk.underline.bold("https://github.com/paypal/nemo-docs/blob/master/driver-setup.md"), chalk.green("for more details."));
    //}
    if (this.testFramework === 'mocha') {
      var tryRunning = "Now try running 'grunt auto'";
      tryRunning += (this.sauceSetup === "Yes") ? "or 'grunt auto:mobile'" : "";
      this.log(chalk.green(tryRunning));
    } else if (this.testFramework === 'cucumberjs') {
      this.log(chalk.green("Now try running 'grunt cucumberjs'"));
    }
    done();
  }
});

module.exports = NemoGenerator;
