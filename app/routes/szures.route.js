module.exports = function(app) {
  var szures = require('../controllers/szures.controller'); 

  app.get('/szures-szallorost', szures.szalloRost);

  app.get('/szures-szallopor', szures.szalloPor);
  app.get('/szallopor/:Id', szures.szalloPorEndPoint);
  app.param('Id', szures.szalloPorParam);
  app.post('/szallorost-save', szures.szalloPorSave);

  app.get('/szures-szilard', szures.szilard);
  app.get('/szilard/:Id', szures.szilardEndPoint);
  app.param('Id', szures.szilardParam);
  app.post('/szilard-save', szures.szilardSave);

  app.get('/szures-nedvesseg', szures.nedvesseg);
  app.get('/nedvesseg/:Id', szures.nedvessegEndPoint);
  app.param('Id', szures.nedvessegParam);
  app.post('/nedvesseg-save', szures.nedvessegSave);


  app.get('/szures-vizsgalat', szures.atadott);
  //app.get('/nedvesseg/:Id', szures.nedvessegEndPoint);
  //app.param('Id', szures.nedvessegParam);
  //app.post('/nedvesseg-save', szures.nedvessegSave);
};
