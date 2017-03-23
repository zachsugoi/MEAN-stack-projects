var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  path = require('path'),
  bodyParser = require('body-parser'),
  port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/message_board_db', function(err, db){
  if(err){
    console.log('****************************');
    console.log(err);
  }
});

//Routes
app.get('/', function(req, res){
  Message.find({}, false, true).populate('_comments').exec(function(err, messages){
    if(err){
      console.log(err);
    }
    res.render('index', {messages: messages});
  });
});

app.post('/message', function(req, res){
  var newMessage = new Message({name: req.body.name, message: req.body.message});
  newMessage.save(function(err){
    if(err){
      console.log(err);
      res.render('index', {errors: newMessage.errors});
    }
    else{
      console.log('Message creation successful');
      res.redirect('/');
    }
  });
});

app.post('/comment/:id', function(req, res){
  var message_id = req.params.id;
  Message.findOne({_id: message_id}, function(err, message){
    var newComment = new Comment({name: req.body.name, comment: req.body.comment});
    newComment._message = message._id;
    message._comments.push(newComment);
  });
  newComment.save(function(err){
    if(err){
      console.log(err);
      res.render('index', {errors: newComment.errors});
    }
    else{
      console.log('Comment added successfully');
      res.redirect('/');
    }
  });
});

app.listen(port, function(){
  console.log('Server running on port', port);
});


//Models
var Schema = mongoose.Schema;
var MessageSchema = new mongoose.Schema({
  name: {type: String, required: 'Name cannot be blank'},
  message: {type: String, required: 'Message cannot be blank'},
  _comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

var CommentSchema = new mongoose.Schema({
  name: {type: String, required: 'Name cannot be blank'},
  comment: {type: String, required: 'Comment cannot be blank'},
  _message: {type: Schema.Types.ObjectId, ref: 'Message'}
});

var comm = new Comment({name: 'Zach', comment: 'Hey there'});
comm.save();
console.log(Comment.find({}));

mongoose.model('Message', MessageSchema);
mongoose.model('Comment', CommentSchema);

var Message = mongoose.model('Message', MessageSchema);
var Comment = mongoose.model('Comment', CommentSchema);
