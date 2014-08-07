var watch = require('node-watch')
  , exec = require('child_process').exec;

watch(['./build.js', './templates', './src'], function () {
  console.log("Triggering build");
  exec('node scripts/build.js');
});
