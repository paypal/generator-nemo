module.exports = function assertGruntTasks(tasks) {
  var api = require('gruntfile-api'),
    fs = require('fs'),
    assert = require('assert'),
    gruntfileData = fs.readFileSync('Gruntfile.js'),
    output = api.init(gruntfileData);

  tasks.forEach(function (task) {
    assert.equal(output.hasTaskRegistered(task), true, task + ' task was not found');
  });
};
