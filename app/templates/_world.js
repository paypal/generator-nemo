

var Nemo = require('nemo'),
  plugins = require('../config/nemo-plugins'),
  config = {
    //"view": ['yhooreg'] //optionally add your json views here from locator folder
  },
  nconf = require('nconf');

nconf.argv()
  .env();
process.env.nemoData = JSON.stringify({
  "autoBaseDir": process.cwd() +"/"+ "<%= baseDirOption %>",
  "targetBrowser": "<%= browserOption %>"
 <% if (seleniumJarPath && sauceSetup === "No") { %>
  ,"targetServer": nconf.get("TARGET_SERVER") || "localhost"
  ,"seleniumJar": nconf.get("SELENIUM_JAR") || "<%= seleniumJarPath %>"
  ,"serverProps": {
     "port": 4444
  }
  <% }%>
  <% if (sauceSetup === "No" && customSpec === "Yes") { %>
    ,"targetBaseUrl": "<%= targetBaseUrl %>"
    <% } %>
   <% if (sauceSetup === "Yes") { %>
           ,"targetServer": "http://<%= sauceUser %>:<%= sauceKey %>"+"@ondemand.saucelabs.com:80/wd/hub"
           ,"serverCaps": {
            "username": "<%= sauceUser %>",
            "accessKey": "<%= sauceKey %>"
         }
         <% if (deployedUrl) { %>
            ,"targetBaseUrl": "<%= deployedUrl %>"
         <% } %>
    <% } %>
});

var WorldConstructor = function WorldConstructor(callback) {
  var that = this;
  (new Nemo(plugins)).setup(config).then(function (cb_nemo) {
    that.nemo = cb_nemo;
    callback();
  })
};
exports.World = WorldConstructor;
