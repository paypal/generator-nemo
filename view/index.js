'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var locators = {};
var fs = require('fs');


var ViewGenerator = yeoman.generators.NamedBase.extend({
  init: function() {
    var done = this.async();
    var prompts = [{
      type: 'input',
      name: 'baseDirOption',
      message: 'What is the base directory for your functional tests, starting from your app root directory?',
      default: "test/functional"
    }];

    this.prompt(prompts, function(props) {
      this.baseDirOption = props.baseDirOption;
      done();
    }.bind(this));
  },
  locatorLoop: function() {
    var done = this.async();
    var that = this;
    //ask for additional locators
    var prompts = [{
      type: 'input',
      message: 'name this locator',
      name: 'locatorName',
      validate: function(locatorName) {
        if (locatorName.constructor === String && locatorName !== "" && /^[a-zA-Z]+$/.test(locatorName)) {
          return true
        } else {
          return "Please provide a valid locator name (letters only, no spaces)"
        }
      }
    }, {
      type: 'list',
      message: 'choose locator strategy',
      name: 'locatorStrategy',
      choices: ['id', 'css', 'name', 'js', 'xpath', 'linkText', 'partialLinkText', 'tagName'],
    }, {
      type: 'input',
      message: 'enter locator',
      name: 'locatorValue',
      validate: function(locatorValue) {
        if (locatorValue.constructor === String && locatorValue !== "") {
          return true;
        }
        return "Please enter a locator";
      }
    }, {
      type: 'list',
      message: 'Enter another one?',
      name: 'anotherLocator',
      choices: ['Yes', 'No'],
    }];

    (function locatorPrompt() {
      that.prompt(prompts, function(props) {
        //save this locator to the locators Object
        locators[props.locatorName] = {
          'locator': props.locatorValue,
          'type': props.locatorStrategy
        }
        if (props.anotherLocator === "Yes") {
          locatorPrompt();
        } else {
          done();
        }
      }.bind(that));
    })();
  },
  createLocator: function() {
    var done = this.async();
    //create locator file [this.name].json
    fs.writeFile(this.baseDirOption + "/locator/" + this.name + ".json", JSON.stringify(locators, null, 2), function(err) {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  }
});

module.exports = ViewGenerator;
