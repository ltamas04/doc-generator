var config = require('./config'),
  mongoose = require('mongoose');

module.exports = function() {
  var db = mongoose.connect(config.remoteDb, function() {
  	console.log('we are remote');
  });

  require('../app/models/document.model.js');

  return db;
};
