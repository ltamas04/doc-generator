module.exports = function(app) {
  var document = require('../controllers/document.controller');
  var sync =  require('../controllers/db.sync');
  app.get('/', function(req, res){
    res.render('index');
  });

  app.get('/document', document.render);
  app.post('/document', document.save);
  app.post('/szallorost-save', document.szallorostSave);
};
