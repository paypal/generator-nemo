'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var banner = require('./lib/banner');
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
    var done = this.async();

    //Nemo banner
    banner();

    var prompts = [{
      type: 'confirm',
      name: 'existingServer',
      message: 'Write into existing app?'
    }, {
      type: 'input',
      name: 'newAppDir',
      message: 'Name your app (creates directory beneath current one)',
      when: function (answers) {
        return !answers.existingServer;
      }
    }, {
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
      //calculate and set base directory. e.g. generator.destinationRoot('new/path')
      var destRoot = (props.existingServer) ? path.resolve(process.cwd()) : path.resolve(process.cwd(), props.newAppDir);
      this.destinationRoot(destRoot);
      this.baseDirOption = props.baseDirOption;
      this.browserOption = props.browserOption;
      this.testFramework = props.testFramework;
      this.existingServer = props.existingServer;
      this.newAppDir = props.newAppDir;
      this.deployedUrl = (!!props.deployedUrl) ? props.deployedUrl : undefined;
      this.baseUrl = (props.existingServer) ? 'https://fast-castle-8102.herokuapp.com' : 'http://localhost:3000';
      //console.log(this.user);
      this.gitName = this.user.git.username;
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
      flowDir = baseDir + "/flow",
      taskDir = "tasks/";
    var done = this.async();
    //base test directory
    this.mkdir(baseDir);
    var _ = this._;
    this._.templateSettings.imports.loscape = function (val) {
      var newval = "<%=" + val + "%>";
      return newval;
    };
    if (!this.existingServer) {
      this.template('_package.json', 'package.json');
      this.mkdir('public');
      this.copy('_index.html', 'public/index.html');
      this.copy('_app.css', 'public/app.css');
      this.copy('_app.js', 'public/app.js');
      this.copy('_server.js', 'server.js');

    }
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

    done();
    this.mkdir('app/templates');

  },
  installThings: function () {
    var done = this.async();
    var self = this;
    var finish = function () {
      var browser = self.browserOption;
      if(self.testFramework === 'mocha') {
        var tryRunning = "Now try running 'grunt auto'";
        tryRunning += (self.sauceSetup === "Yes") ? "or 'grunt auto:mobile'" : "";
        self.log(chalk.green(tryRunning));
      } else if(self.testFramework === 'cucumberjs') {
        self.log(chalk.green("Now try running 'grunt cucumberjs'"));
      }
      done();
    };

    var installServer = function () {
      self.npmInstall(["express"], {save: true}, finish);
    };
    var devDeps = ["grunt@^v1.0.1", "nemo@^v2.3.1", "nemo-view@^v2.1.1", "grunt-config-dir"];
    if (this.testFramework === 'mocha') {
      devDeps = devDeps.concat(["grunt-loop-mocha", "nconf", "xunit-file"]);
    } else {
      devDeps = devDeps.concat(["cucumber@^0.4.4", "path@^0.11.14", "grunt-cucumberjs@^v0.5.1"]);
    }
    this.npmInstall(devDeps, {saveDev: true}, function () {
      if (!this.existingServer) {
        return installServer();
      }
      return finish();
    }.bind(this));

  }

});

module.exports = NemoGenerator;
