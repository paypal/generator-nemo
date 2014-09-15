'use strict';
module.exports = function lifeStory(nemo) {
  return {
    'tellLifeStory': function () {
      var formExample = nemo.view.addView('formExample');
      formExample.blueCheckbox().click();
      formExample.lifeStoryText().sendKeys('I grew up in Swindon and was the fifth member of The Beatles.');
      return formExample.citySelectOptionText('Swindon');
    }
  };
};

