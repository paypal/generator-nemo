'use strict';
var nconf = require('nconf');

module.exports = function(grunt) {
    nconf.env()
        .argv();
    grunt.initConfig({

        //for js functional testing
        "loopmocha": {
            "basedir": process.cwd() + "/" + "test/functional",
            "src": ["<%=loopmocha.basedir%>/spec/*.js"],
            "options": {
                "reporter": grunt.option("reporter") || "spec",
                "reportLocation": grunt.option("reportLocation") || "<%=loopmocha.basedir%>/report",
                "timeout": grunt.option("timeout") || 60000,
                "grep": grunt.option("grep") || "@exampleSuite@",
                "debug-brk": grunt.option("debug") || 0,
                'parallel': nconf.get('parallel') || 0,
                'noFail': nconf.get('noFail') || 'false',
                "AUTO_BASE_DIR": "<%=loopmocha.basedir%>",
                "TARGET_BROWSER": nconf.get("TARGET_BROWSER") || "firefox",
                "TARGET_BASE_URL": nconf.get("TARGET_BASE_URL") || "https://www.paypal.com",
                "TARGET_SERVER": nconf.get("TARGET_SERVER") || "localhost",
                "SELENIUM_JAR": nconf.get("SELENIUM_JAR") || "/usr/local/bin/selenium-server-standalone.jar",
                "STAGE": nconf.get("STAGE") || 0,
                "SERVER_PROPS": '{"port": 4444}',
                "iterations": [{
                    "description": "default"
                }]
            },
            "all": {
                "src": "<%=loopmocha.src%>"
            }
        }

    });


    grunt.loadNpmTasks('grunt-loop-mocha');
    grunt.registerTask('automation', ['loopmocha:all']);

};