var Metalsmith = require('metalsmith')
  , beautify = require('metalsmith-beautify')
  , ejs = require('ejs')
  , fs = require('fs')
  , sass = require('node-sass')
  ;

var templates = {};

templates.home = ejs.compile(
  fs.readFileSync('./templates/home.ejs', 'UTF-8'),
  { filename: './templates/home.ejs' }
);

templates.category = ejs.compile(
  fs.readFileSync('./templates/category.ejs', 'UTF-8'),
  { filename: './templates/category.ejs' }
);

templates.tool = ejs.compile(
  fs.readFileSync('./templates/tool.ejs', 'UTF-8'),
  { filename: './templates/tool.ejs' }
);

function createFileFromTemplate(data, template) {
  return { contents: template(data) };
}

function ejsTemplates(files, metalsmith, done) {
  Object.keys(files).forEach(function (file) {
    var data, htmlFile;

    if (!/\.json$/.test(file)) {
      return;
    }

    data = JSON.parse(files[file].contents);
    htmlFile = file.replace(/\.json$/, '.html');

    if (file === 'index.json') {
      files[htmlFile] = createFileFromTemplate(data, templates.home);
    } else if (file.split('/').length === 2) {
      files[htmlFile] = createFileFromTemplate(data, templates.category);
    } else {
      files[htmlFile] = createFileFromTemplate(data, templates.tool);
    }
  });

  done();
};

function sassProcessor(files, metalsmith, done) {
  Object.keys(files).forEach(function (file) {
    var scss;

    if (!/\.scss$/.test(file) || /\/_.*\.scss$/.test(file)) {
      return;
    }

    scss = files[file].contents;
    var newFile = file.replace(/\.scss$/, '.css').replace(/sass/, 'stylesheets');
    files[newFile] = {
      contents: sass.renderSync({ data: scss, includePaths: ['./src/sass'] })
    };
  });

  done();
}

function cleaner(files, metalsmith, done) {
  Object.keys(files).forEach(function (file) {
    if (!/\.html$|\.css$/.test(file)) {;
      delete files[file];
    }
  });

  done();
}

Metalsmith(__dirname + '/..')
  .source('./src')
  .destination('./build')
  .use(ejsTemplates)
  .use(sassProcessor)
  .use(cleaner)
  .use(beautify({ css: true, html: true, indent_size: 2, indent_char: ' ', preserve_newlines: false }))
  .build(function (error, files ) {
    if (error) { console.log(error, files); }
  });
