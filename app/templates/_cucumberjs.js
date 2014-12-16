'use strict';

module.exports = function cucumberjs(grunt) {

  grunt.loadNpmTasks('grunt-cucumberjs');

  return {
      options: {
        format: 'html',
        output: '<%= baseDirOption %>/report/cucumber_report.html',
        theme: 'bootstrap',
        tags: grunt.option('tags'),
        saveJson: true,
        debug: true
      },
      src: ['<%= baseDirOption %>/features/']
  };
};
