module.exports = function(app) {
  var document = require('../controllers/document.controller'); 
  app.get('/', function(req, res){
    res.render('index');
  });

  app.get('/document', document.render);
  app.post('/document', document.save);
};