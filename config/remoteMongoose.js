var config = require('./config'),
  mongoose = require('mongoose');

module.exports = function() {
  console.log('napasztmek');
  
  var db = mongoose.connect(config.remoteDb, function() {
  	console.log('>>>>>>>>>>> we are REMOTE');
  });

  require('../app/models/document.model.js');

  return db;
};
