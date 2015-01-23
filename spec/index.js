'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var locators = {};
var fs = require('fs');


var SpecGenerator = yeoman.generators.NamedBase.extend({
  init: function() {
    var done = this.async();
    var prompts = [{
      type: 'input',
      name: 'baseDirOption',
      message: 'What is the base directory for your functional tests, starting from your app root directory?',
      default: "test/functional"
    }, {
      type: 'input',
      name: 'viewsOption',
      message: 'Which views will this spec use? (seperate multiple views with a comma)',
      validate: function(viewsVal) {
        return true;
      }
    }];

    this.prompt(prompts, function(props) {
      this.baseDirOption = props.baseDirOption;
      this.views = "'" + props.viewsOption.replace(/,/g, "','") + "'";
      done();
    }.bind(this));
  },
  createSpec: function() {
    var done = this.async();
    this.template('_spec.js', this.baseDirOption + '/spec/' + this.name + '.js');
    this.log('Created ' + this.name + '.js' + ' in your spec directory');
    done();
    //create locator file [this.name].json
    // fs.writeFile(this.baseDirOption + "/spec/" + this.name + ".js", JSON.stringify(locators, null, 2), function(err) {
    //   if (err) {
    //     done(err);
    //   } else {
    //     done();
    //   }
    // });
  }
});

module.exports = SpecGenerator;
