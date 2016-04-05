process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongoose = require('./config/mongoose'),
  remoteMongoose = require('./config/remoteMongoose'),
  express = require('./config/express');

var db = mongoose();
//var remoteDb = remoteMongoose();
var app = express();


app.listen(3001);

module.exports = app;

var spawn = require('child_process').spawn,
ls    = spawn('cmd.exe', ['/c', 'my.bat']);

ls.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

ls.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

ls.on('exit', function (code) {
  console.log('child process exited with code ' + code);
});
