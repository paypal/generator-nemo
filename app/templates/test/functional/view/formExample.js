"use strict";

var assert = require('assert'),
	loc = {
		"formExample": require("../locator/formExample")
	},
	driver,
	drivex,
	wd;

function FormExample(config) {
	assert(config.drivex, "view:FormExample, drivex is not set!");
	drivex = config.drivex;
	driver = config.driver;
	wd = config.wd;
}

FormExample.prototype = {
	tellLifeStory: function () {
		//select blue as your favorite color
		var blueCheckbox = drivex.find(loc.formExample.blueCheckbox);//driver.findElement(wd.By.id("chk2_2"));
		blueCheckbox.click();
		//type in something to the textarea
		var textareaBox = drivex.find(loc.formExample.lifeStoryText);//driver.findElement(wd.By.id("txtLifeStory"));
		textareaBox.sendKeys("I grew up in Swindon and was the fifth member of The Beatles.");

		//select Swindon as your favorite town
		drivex.find(loc.formExample.swindonOption).click();//driver.findElement(wd.By.css("select[name='ddlTown'] option[value='Swindon']")).click();

	}

};

module.exports = FormExample;