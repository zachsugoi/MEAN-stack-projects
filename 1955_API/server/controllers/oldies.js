var mongoose = require('mongoose');
var Oldie = mongoose.model('Oldie');

module.exports = {
  index: function(req, res){
    Oldie.find({}, function(err, results){
      if(err){
        console.log(err);
      }
      res.json(results);
    })
  },
  create: function(req, res){
    console.log(req.params.name);
    Oldie.create({name: req.params.name}, function(err, result){
      if(err){
        console.log(err);
      }
      res.redirect('/');
    })
  },
  remove: function(req, res){
    Oldie.remove({name: req.params.name}, function(err, result){
      if(err){
        console.log(err);
      }
      res.redirect('/');
    })
  },
  show: function(req, res){
    Oldie.findOne({name: req.params.name}, function(err, result){
      if(err){
        console.log(err);
      }
      res.json(result);
    })
  }
}
