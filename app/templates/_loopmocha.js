'use strict';

var nconf = require('nconf');

module.exports = function loopmocha(grunt) {
  nconf.env()
    .argv();
  // Load task
  grunt.loadNpmTasks('grunt-loop-mocha');
  // Options
  return {
    "src": ["<%= loopmocha.options.basedir %>/spec/*.js"],
    "options": {
      "mocha": {
        "timeout": grunt.option("timeout") || 600000,
        "grep": grunt.option("grep") || 0,
        "debug": grunt.option("debug") || 0,
        "reporter": grunt.option("reporter") || "spec"
      },
      "basedir": process.cwd() + "/" + "<☃= baseDirOption ☃>",
      "nemoBaseDir": "<%= loopmocha.options.basedir %>",
      "loop": {
        "reportLocation": grunt.option("reportLocation") || "<%=loopmocha.options.basedir %>/report",
        "parallel": {
          "type": "file"
        }
      },
      "iterations": [{
        "description": "default"
      }]

    }
  };
};
