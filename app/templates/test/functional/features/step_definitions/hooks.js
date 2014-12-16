/**
 * Created by nikulkarni on 11/2/14.
 */
/*global describe:false, it:false, beforeEach:false, afterEach:false*/
'use strict';

var myHooks = function () {

    this.World = require('../../support/world.js').World;
    this.Before(function (scenario, callback) {
        this.scenario = scenario;
        callback();
    });

    this.After(function (scenario, callback) {
        this.nemo.driver.quit().then(function () {
            callback();
        });
    });

    this.registerHandler('AfterFeatures', function (event, callback) {
        callback();
    });

    this.registerHandler('BeforeFeatures', function (event, callback) {
        callback();
    });
};
module.exports = myHooks;
