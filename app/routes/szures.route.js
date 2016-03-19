module.exports = function(app) {
  var szures = require('../controllers/szures.controller'); 

  app.get('/szures-szallorost', szures.szalloRost);
};