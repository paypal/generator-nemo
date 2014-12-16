
var Nemo = require('nemo'),
  plugins = require('../config/nemo-plugins'),
  config = {
    "view": ['yhooreg'] //optionally add your json views here from locator folder
  };
process.env.nemoData = JSON.stringify({
  targetBrowser: "firefox",
  targetServer: "localhost",
  serverProps: {"port": 4444},
  seleniumJar: "/usr/local/bin/selenium-server-standalone.jar",
  targetBaseUrl: "https://edit.yahoo.com/registration",
  autoBaseDir:process.cwd() + "/" + "test/functional"
});

var WorldConstructor = function WorldConstructor(callback) {
  var that = this;
  (new Nemo(plugins)).setup(config).then(function (cb_nemo) {
    that.nemo = cb_nemo;
    callback();
  })
};
exports.World = WorldConstructor;
