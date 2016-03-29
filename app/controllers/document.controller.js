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
      };
      szallorostIndex++;
    });
  }

  if(req.body.viz_minta_jele) {
    var vizIndex = 0;
    req.body.viz_minta_jele.forEach(function() {
      if (req.body.viz_minta_jele[vizIndex]) {      
        var atadott = new AtadottMintak({
            mintavetel_datuma: req.body.datum,
            mintavetel_helye: req.body.mintavetel_helye,
            minta_jele: req.body.viz_minta_jele[vizIndex]
        });
      atadott.save();
      }

      vizIndex++;
    });
  }

  if (req.body.szallopor_minta_szama) {
    var szalloporIndex = 0;
    req.body.szallopor_minta_szama.forEach(function() {
      if (req.body.szallopor_minta_szama[szalloporIndex]) {
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
      }
        szalloporIndex++;
    });

    var szalloporAtadott = 0;
    req.body.szallopor_minta_szama.forEach(function() {
      console.log('###', req.body.szallopor_minta_szama[szalloporAtadott]);
      if (req.body.szallopor_minta_szama[szalloporAtadott]) {
        console.log('logic hit');

        var atadott = new AtadottMintak({
            mintavetel_datuma: req.body.datum[0],
            mintavetel_helye: req.body.mintavetel_helye[0],
            minta_jele: req.body.szallopor_minta_szama[szalloporAtadott]
        });
        atadott.save(); 
      }
        szalloporAtadott++;
    });
    
  }

  if (req.body.szilard_minta_jele) {
    var szilardIndex = 0;
    console.log('>>> called');
    req.body.szilard_minta_jele.forEach(function() {
      if (req.body.szilard_minta_jele[szilardIndex]) {
        var szilard = new SzilardAnyag ({
            mintavetel_datuma: req.body.datum,
            mintavetel_helye: req.body.mintavetel_helye,
            minta_jele: req.body.szilard_minta_jele[szilardIndex]
        });
        szilard.save();
      }
        szilardIndex++;
    });

    var szilardAtadott = 0;
    req.body.szilard_minta_jele.forEach(function() {
      if (req.body.szilard_minta_jele[szilardAtadott]) {

        var atadott = new AtadottMintak({
            mintavetel_datuma: req.body.datum[0],
            mintavetel_helye: req.body.mintavetel_helye[0],
            minta_jele: req.body.szilard_minta_jele[szilardAtadott]
        });
        atadott.save(); 
      }
        szilardAtadott++;
    });
  }

  if (req.body.adabem_minta_jele) {
    var adabemAtadott = 0;
      console.log('>>>', req.body.adabem_minta_jele);
      req.body.adabem_minta_jele.forEach(function() {
        if (req.body.adabem_minta_jele[adabemAtadott]) {

          var atadott = new AtadottMintak({
              mintavetel_datuma: req.body.datum[0],
              mintavetel_helye: req.body.mintavetel_helye[0],
              minta_jele: req.body.adabem_minta_jele[adabemAtadott]
          });
          atadott.save(); 
        }
          adabemAtadott++;
    });
  }

  if (req.body.adabmun_minta_jele) {
    var adabmunAtadott = 0;
      console.log('>>> function is reached');
      req.body.adabmun_minta_jele.forEach(function() {
        if (req.body.adabmun_minta_jele[adabmunAtadott]) {

          var atadott = new AtadottMintak({
              mintavetel_datuma: req.body.datum[0],
              mintavetel_helye: req.body.mintavetel_helye[0],
              minta_jele: req.body.adabmun_minta_jele[adabmunAtadott]
          });
          atadott.save(); 
        }
          adabmunAtadott++;
    });
  }

  if(req.body.n_minta_jele) {
    var nedvessegIndex = 0;
    req.body.n_minta_jele.forEach(function() {
      if (req.body.n_minta_jele[nedvessegIndex]) {
        var nedvesseg = new NedvessegMintak({
            mintavetel_datuma: req.body.datum[0],
            mintavetel_helye: req.body.mintavetel_helye[0],
            minta_jele: req.body.n_minta_jele[nedvessegIndex++],
        });

        nedvesseg.save();
      } 
        nedvessegIndex++;
    });
  }

  if(req.body.mintavetel_gep) {
    var gepIndex = 0;
    req.body.mintavetel_gep.forEach(function() {
      if (req.body.mintavetel_gep[gepIndex]) {
        var gep = new GepNaplo({
            mintavetel_gep: req.body.mintavetel_gep[gepIndex],
            sorszam: req.body.sorszam[gepIndex],
            mintavetel_datuma: req.body.datum[0],
            mintavetel_helye: req.body.mintavetel_helye[0],
        });

        gep.save();
      } 
        gepIndex++;
    });
  }

  res.redirect('/document');
}
