module.exports = function Route(app){
  app.get('/', function(req, res){
    res.render('index');
  })

  app.post('/result', function(req, res){
    submitted_info = {
      name: req.body.name,
      location: req.body.location,
      language: req.body.language,
      comment: req.body.comment
    };
    res.render('result', {user_data: submitted_info});
  })
};
