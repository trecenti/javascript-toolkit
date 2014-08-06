var Metalsmith = require('metalsmith');
var render = require('consolidate').handlebars;

var json = {
  categories: [
    { "title" : "Banana", "categories": [{ "title": "updated" }] }
  ]
};

var index = function(files, metalsmith, done) {
  var metadata = metalsmith.metadata();

  render('templates/index.html', metadata, function (error, content) {
    if (error) { done(error); }
    files['index.html'] = { contents: content }
    done();
  });
};

Metalsmith(__dirname)
  .destination('./build')
  .metadata(json)
  .use(index)
  .build(function (error, files ) {
    if (error) { console.log(arguments); }
  });
