'use strict';
module.exports = function lifeStory(nemo) {
  return {
    "tellLifeStory": function () {
      nemo.view.formExample.blueCheckbox().click();
      nemo.view.formExample.lifeStoryText().sendKeys("I grew up in Swindon and was the fifth member of The Beatles.");
      return nemo.view.formExample.swindonOption().click();
    }
  };
};

