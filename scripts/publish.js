'use strict';

var ghpages = require('gh-pages');
var path = require('path');

ghpages.publish(path.join(__dirname, '../build'), {
  logger: function(message) {
    //console.log(message);
    // what logger are we using?
  }
}, function(err) { 
  if (err)
    console.log('Error publishing to gh-pages', err);
  else
    console.log('Successfully published to gh-pages');
});
