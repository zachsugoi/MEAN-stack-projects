var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  path = require('path'),
  port = 8000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./server/config/mongoose.js');

var routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.listen(port, function(){
  console.log('Running on port', port);
});
