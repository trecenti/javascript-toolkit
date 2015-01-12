var Metalsmith = require('metalsmith')
  , beautify = require('metalsmith-beautify')
  , ejs = require('ejs')
  , fs = require('fs')
  , sass = require('node-sass')
  ;

ejs.filters.id = function (text) {
  return text.toLowerCase().replace(/\s/g, '-');
}

var templates = {};

templates.home = ejs.compile(
  fs.readFileSync('./templates/home.ejs', 'UTF-8'),
  { filename: './templates/home.ejs' }
);

templates.category = ejs.compile(
  fs.readFileSync('./templates/category.ejs', 'UTF-8'),
  { filename: './templates/category.ejs' }
);

function createFileFromTemplate(data, template) {
  return { contents: template(data) };
}

function byJson(file) {
  return /\.json$/.test(file);
}

function onlyIndex(file) {
  return file === 'index.json';
}

function byCategoryFiles(file) {
  return (file.split('/').length === 3 && /.*index\.json$/.test(file));
}

function samePath(file) {
  var path = file.replace(/index\.json$/, '');

  return function (anotherFile) {
    return anotherFile.indexOf(path) >= 0;
  };
}

function notSame(file) {
  return function (anotherFile) {
    return anotherFile !== file;
  };
}

function buildHtml(files, file) {
  return {
    data: JSON.parse(files[file].contents),
    htmlFile: file.replace(/\.json$/, '.html'),
    file: file
  }
}

function ejsTemplates(files, metalsmith, done) {
  var jsonFiles = Object.keys(files).filter(byJson);

  jsonFiles
    .filter(onlyIndex)
    .map(buildHtml.bind(buildHtml, files))
    .forEach(function (info) {
      files[info.htmlFile] = createFileFromTemplate(info.data, templates.home);
    });

  jsonFiles
    .filter(byCategoryFiles)
    .map(buildHtml.bind(buildHtml, files))
    .map(function (info) {
      info.data.tools = Object.keys(files)
        .filter(byJson)
        .filter(notSame(info.file))
        .filter(samePath(info.file))
        .map(buildHtml.bind(buildHtml, files))
        .map(function (info) {
          return info.data;
        });
      return info;
    }).forEach(function (info) {
      files[info.htmlFile.split('/').slice(1).join('/')] = createFileFromTemplate(info.data, templates.category);
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
  var allowedFiles, regex;

  allowedFiles = [
    '\\.html$',
    '\\.css$',
    'CNAME$',
    '^images\\/',
    'favicon.ico'
  ];

  regex = new RegExp(allowedFiles.join('|'));

  Object.keys(files).forEach(function (file) {
    if (!regex.test(file)) {;
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
