'use strict';

var nconf = require('nconf');

module.exports = function loopmocha(grunt) {
  nconf.env()
    .argv();
  // Load task
  grunt.loadNpmTasks('grunt-loop-mocha');
  // Options
  return {
    "src": ["<%=loopmocha.basedir%>/spec/*.js"],
    "basedir": process.cwd() + "/" + "test/functional",
    "options": {
      "mocha": {
        "reportLocation": grunt.option("reportLocation") || "<%=loopmocha.basedir%>/report",
        "timeout": grunt.option("timeout") || 600000,
        "grep": grunt.option("grep") || 0,
        "debug": grunt.option("debug") || 0,
        "reporter": grunt.option("reporter") || "spec"
      },
      "nemoData": {
        "autoBaseDir": "<%=loopmocha.basedir%>",
        "targetBrowser": nconf.get("TARGET_BROWSER") || "firefox",
        "targetServer": nconf.get("TARGET_SERVER") || "localhost",
        "targetBaseUrl": "http://localhost:8000",
        "seleniumJar": nconf.get("SELENIUM_JAR") || "/usr/local/bin/selenium-standalone.jar",
        "serverProps": {
          "port": 4444
        },
        "stage": nconf.get("STAGE") || "STAGE2P1971"
      },
      "iterations": [{
        "description": "default"
      }]
    },
    "local": {
      "src": "<%=loopmocha.src%>"
    }
  };
};
