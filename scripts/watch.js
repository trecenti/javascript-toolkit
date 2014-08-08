var watch = require('node-watch')
  , exec = require('child_process').exec;

watch(['./scripts/build.js', './templates', './src'], function () {
  exec('node scripts/build.js', function (err) {
    if (err) {
      console.error(err);
    } else {
      console.info('built');
    }
  });
});
