var NedvessegMintak = require('mongoose').model('NedvessegMintak');
var SzalloPor = require('mongoose').model('SzalloPor');
var SzilardAnyag = require('mongoose').model('SzilardAnyag');
var SzalloRost = require('mongoose').model('SzalloRost');
var AtadottMintak = require('mongoose').model('AtadottMintak');
var GepNaplo = require('mongoose').model('GepNaplo');

exports.render = function(req, res) {
  res.render('document');
};