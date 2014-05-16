/*global describe:true, it:true, before:true, after:true */
"use strict";

var assert = require('assert'),
	nemoFactory = require('nemo-mocha-factory'),
	setup = require('../data/setup').lifeStorySpec,
	plugins = require('../config/nemo-plugins');

describe('Nemo @exampleSuite@', function () {

	nemoFactory({"plugins": plugins, "setup": setup});

	it('will tell my life story @lifeStory@', function (done) {
		nemo.driver.get("http://accessify.com/features/tutorials/accessible-forms/form-examples.htm");
		nemo.view.formExample.tellLifeStory();
		nemo.driver.sleep(1000).then(function () {
				nemo.screenshot.done("lifeStorySuccess", done);
			}, function (err) {
				nemo.screenshot.doneError("lifeStoryError", err, done);
			});

	});

});