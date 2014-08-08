'use strict';

var ghpages = require('gh-pages');
var path = require('path');

ghpages.publish(path.join(__dirname, '../build'), {
  logger: function(message) {
    
  }
}, function(err) { 
  if (err) {
    console.error('Error publishing to gh-pages', err);
  } else {
     console.log('Successfully published to gh-pages');
  }
});
