'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');


var PluginGenerator = yeoman.generators.Base.extend({
  init: function() {
    var done = this.async();
    var prompts = [{
      type: 'input',
      name: 'baseDirOption',
      message: 'What is the base directory for your functional tests, starting from your app root directory?',
      default: "test/functional"
    }, {
      type: 'input',
      name: 'pluginName',
      message: 'Which Nemo plugin would you like to install?',
      validate: function(plugin) {
        if (plugin.constructor !== String || plugin === "") {
          return "Please provide the name of an npm published nemo plugin"
        } else {
          return true;
        }
      }
    }, {
      type: 'list',
      name: 'pluginVersion',
      choices: ['^v0.1.0', '*'],
      message: 'Which version would you like to install?'
    }, {
      type: 'list',
      name: 'autoRegister',
      choices: ['Yes', 'No'],
      message: 'Does this plugin require auto-registration? (consult the plugin docs if you are not sure)'
    }];

    this.prompt(prompts, function(props) {
      this.baseDirOption = props.baseDirOption;
      this.pluginName = props.pluginName;
      this.pluginVersion = props.pluginVersion;
      this.autoRegister = props.autoRegister;
      done();
    }.bind(this));
  },
  installPlugin: function() {
    var cmd = this.spawnCommand("npm", ["install", "--save-dev", this.pluginName + "@" + this.pluginVersion]);
    var done = this.async();
    cmd.on('close', function(code) {
      //this.log("Plugin installed.")
      done();
    });
  },
  getRegisterAs: function() {
    var packageJson = require(process.cwd() + '/node_modules/' + this.pluginName + '/package.json');
    this.registerAs = packageJson.registerAs;
    if (!this.registerAs) {
      throw new Error("Unable to register this plugin magically. Please tell the plugin author that he/she has not specified a 'registerAs' property in package.json");
    }
  },
  registerPlugin: function() {
    var done = this.async();
    var that = this;
    var pluginsFile = this.baseDirOption + '/config/nemo-plugins.json';
    //open plugins config
    fs.readFile(pluginsFile, 'utf8', function(err, data) {
      var pluginsJson = JSON.parse(data);
      pluginsJson.plugins[that.registerAs] = {
        "module": that.pluginName
      }
      if (that.autoRegister === "Yes") {
        pluginsJson.plugins[that.registerAs].register = true;
      }
      fs.writeFile(pluginsFile, JSON.stringify(pluginsJson, null, 2), function(err) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
  },
  wrapup: function() {
    this.log("|  || |  ||| | || ||| | | || |");
    this.log("OK, " + this.pluginName + " is installed and registered. Check out the docs and get started!");
  }
});

module.exports = PluginGenerator;
