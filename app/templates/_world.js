

var Nemo = require('nemo'),
  path = require('path'),
  __dirname = path.resolve(process.cwd(), "<%= baseDirOption %>");

var WorldConstructor = function WorldConstructor(callback) {
  this.nemo = Nemo(__dirname,function(err){
    if(err){
      callback(err);
    }
    callback();
  });
};
exports.World = WorldConstructor;
