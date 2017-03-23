var express = require('express'),
  app = express(),
  path = require('path'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './static')));
app.use(express.static(__dirname + '/static'));

mongoose.connect('mongodb://localhost/quoting_dojo');

var QuoteSchema = new mongoose.Schema({
  name: {type: String, required: true},
  quote: {type: String, required: true},
  date: {type: Date, default: Date.now}
});

var Quote = mongoose.model('Quote', QuoteSchema);

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//Routes
app.get('/', function(req, res){
  res.render('index');
})

app.get('/quotes', function(req, res){
  Quote.find({}, function(err, results){
    if(err){
      console.log(err);
    }
    res.render('quotes', {quotes: results});
  }).sort({date: -1});
})

app.post('/quotes', function(req, res){
  console.log("POST DATA", req.body);
  var quote = new Quote({name: req.body.name, quote: req.body.quote});
  quote.save(function(err){
    if(err){
      console.log('error adding to database');
      res.render('index', {errors: quote.errors});
    }
    else{
      console.log('successfully added quote');
      res.redirect('/quotes');
    }
  })
})

app.listen(port, function(){
  console.log('listening on port 8000');
})
