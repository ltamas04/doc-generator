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
  if (req.body.szallorost_minta_szama) {
    var szallorostIndex = 0;
    req.body.szallorost_minta_szama.forEach(function() {
      if (req.body.szallorost_minta_szama[szallorostIndex]) {

          var szallorost = new SzalloRost({
              mintavetel_datuma: req.body.datum[0],
              mintavetel_helye: req.body.mintavetel_helye[0],
              minta_jele: req.body.szallorost_minta_szama[szallorostIndex]
          });

          szallorost.save();
          szallorostIndex++;
      };
  });
  }
  if (req.body.szallopor_minta_szama) {
    var szalloporIndex = 0;
    console.log('>>> called');
    req.body.szallopor_minta_szama.forEach(function() {
      console.log('loop hit');
      if (req.body.szallopor_minta_szama[szalloporIndex]) {
        console.log('logic hit');
        var szallopor = new SzalloPor({
            mintavetel_datuma: req.body.datum[0],
            mintavetel_helye: req.body.mintavetel_helye[0],
            minta_jele: req.body.szallopor_minta_szama[szalloporIndex],
            respir_bemeres: req.body.respir_bemeres[szalloporIndex],
            respir_visszameres: req.body.respir_visszameres[szalloporIndex],
            durva_bemeres: req.body.durva_bemeres[szalloporIndex],
            durva_visszameres: req.body.durva_visszameres[szalloporIndex]
        });
        szallopor.save();
        szalloporIndex++;
      }
    });
  }

  if (req.body.szilard_minta_szama) {
    var szilardIndex = 0;
    console.log('>>> called');
    req.body.szilard_minta_szama.forEach(function() {
      if (req.body.szilard_minta_szama[szilardIndex]) {
        var szilard = new SzilardAnyag ({
            mintavetel_datuma: request.body.datum[0],
            mintavetel_helye: request.body.intavetel_helye[0],
            minta_jele: request.body.szilard_minta_jele[szilardIndex]
        });
        szilard.save();
        szilardIndex++;
      }
    });
  } 

  res.redirect('/document');
}
