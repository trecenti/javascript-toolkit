var Metalsmith = require('metalsmith');
var render = require('consolidate').handlebars;

var index = function(files, metalsmith, done) {
  var metadata = metalsmith.metadata();

  render('templates/index.html', metadata, function (error, content) {
    if (error) { done(error); }
    files['index.html'] = { contents: content }
    done();
  });
};

var project = function(files, metalsmith, done) {
  var metadata = metalsmith.metadata();

  Object.keys(metadata.categories).forEach(function (category) {
    Object.keys(metadata.categories[category]).forEach(function (subcategory) {
      Object.keys(metadata.categories[category][subcategory]).forEach(function (project) {
        var entry = metadata.categories[category][subcategory][project];
        var output = category.replace(' ','-') + '/' + subcategory.replace(' ','-') + '/' + project + '.html';

        render('templates/project.html', entry, function (error, content) {
          if (error) { done(error); }
          files[output] = { contents: content };
          done();
        });
      });
    });
  });
};

var convertToMetadata = function (files, metalsmith, done) {
  var metadata = metalsmith.metadata();
  metadata.categories = metadata.categories || {};

  Object.keys(files).forEach(function (filePath) {
    var content = files[filePath].contents.toString();
    var fileData = JSON.parse(content);

    var tags = filePath.split('/');
    var category = tags[0].replace('-',' ');
    var subcategory = tags[1].replace('-', ' ');
    var entry = tags[2].split('.')[0];

    metadata.categories[category] = metadata.categories[category] || {};
    metadata.categories[category][subcategory] = metadata.categories[category][subcategory] || {};
    metadata.categories[category][subcategory][entry] = fileData;

    delete files[filePath];
  });

  done();
};

Metalsmith(__dirname)
.destination('./build')
.use(convertToMetadata)
.use(index)
.use(project)
.build(function (error, files ) {
  if (error) { console.log(arguments); }
});
