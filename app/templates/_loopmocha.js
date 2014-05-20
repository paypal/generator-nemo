'use strict';

var nconf = require('nconf');

module.exports = function loopmocha(grunt) {
  nconf.env()
    .argv();
  // Load task
  grunt.loadNpmTasks('grunt-loop-mocha');
  // Options
  return {
    "src": ["<%= loscape('loopmocha.basedir') %>/spec/*.js"],
    "basedir": process.cwd() + "/" + "<%= baseDirOption %>",
    "options": {
      "mocha": {
        "reportLocation": grunt.option("reportLocation") || "<%= loscape('loopmocha.basedir') %>/report",
        "timeout": grunt.option("timeout") || 600000,
        "grep": grunt.option("grep") || 0,
        "debug": grunt.option("debug") || 0,
        "reporter": grunt.option("reporter") || "spec"
      },
      "nemoData": {
        "autoBaseDir": "<%= loscape('loopmocha.basedir') %>",
        "targetBrowser": nconf.get("TARGET_BROWSER") || "<%= browserOption %>"
        <% if (seleniumJarPath) { %>
        ,"targetServer": nconf.get("TARGET_SERVER") || "localhost",
        "seleniumJar": nconf.get("SELENIUM_JAR") || "<%= seleniumJarPath %>",
        "serverProps": {
          "port": 4444
        }
        <% } %>
        <% if (customSpec === "Yes") { %>
        ,"targetBaseUrl": "<%= targetBaseUrl %>"
        <% } %>
      },
      "iterations": [{
        "description": "default"
      }]
    },
    "local": {
      "src": "<%= loscape('loopmocha.src') %>"
    }
  };
};
