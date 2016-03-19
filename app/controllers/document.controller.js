var NedvessegMintak = require('mongoose').model('NedvessegMintak');
var SzalloPor = require('mongoose').model('SzalloPor');
var SzilardAnyag = require('mongoose').model('SzilardAnyag');
var SzalloRost = require('mongoose').model('SzalloRost');
var AtadottMintak = require('mongoose').model('AtadottMintak');
var GepNaplo = require('mongoose').model('GepNaplo');

exports.render = function(req, res) {
  res.render('document');
};

exports.save = function(req, res) {
	if(req.body.szallorost_minta_szama) {
    var index = 0;
    req.body.szallorost_minta_szama.forEach(function() {
      console.log('>>>' ,req.body.szallorost_minta_szama[index]);
      if(req.body.szallorost_minta_szama[index]) {
        var szallorost = new SzalloRost({
          mintavetel_datuma: req.body.datum,
          mintavetel_helye: req.body.mintavetel_helye,
          minta_jele: req.body.szallorost_minta_szama[index],
          ellenorzott_mintak: req.body.ellenorzott_minta
        });

        szallorost.save(function(err, thor) {
          if (err) {
            return console.error(err);
          }
        });
        console.log('>>> saved:   ' ,req.body.szallorost_minta_szama[index]);        
      }
      index ++;
    });
  }

  res.redirect('/document');
}
