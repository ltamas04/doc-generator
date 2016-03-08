module.exports = function(app) {
  var company = require('../controllers/company.controller');
  
  app.get('/new-company', company.render);
}
