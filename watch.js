var watch = require('node-watch');
var exec = require('child_process').exec;


watch(['build.js', 'templates'], function () {
  console.log("Triggering build");
  exec('node build.js');
});
