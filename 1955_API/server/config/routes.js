var oldies = require('../controllers/oldies.js');

module.exports = function(app){
  app.get('/', function(req, res){
    oldies.index(req, res);
  })
  app.get('/new/:name', function(req, res){
    oldies.create(req, res);
  })
  app.get('/remove/:name', function(req, res){
    oldies.remove(req, res);
  })
  app.get('/:name', function(req, res){
    oldies.show(req, res);
  })
}
