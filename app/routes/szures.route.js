module.exports = function(app) {
  var szures = require('../controllers/szures.controller'); 

  app.get('/szures-szallorost', szures.szalloRost);
  app.get('/szures-szallopor', szures.szalloPor);
  app.get('/szallopor/:Id', szures.szalloPorEndPoint);
  app.param('Id', szures.szalloPorParam);
  app.post('/szallorost-save', szures.szalloPorSave);
};
