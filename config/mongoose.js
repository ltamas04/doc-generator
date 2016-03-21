var config = require('./config'),
  mongoose = require('mongoose');

module.exports = function() {
  var db = mongoose.connect(config.db, function() {
  	console.log('we are local');
  });

  require('../app/models/document.model.js');

  return db;
};
