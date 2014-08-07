var express = require('express')
  , logger = require('morgan')
  , path = require('path')
  , app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '..', 'build')));
app.listen(process.env.PORT || 4000);
