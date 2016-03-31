var SzalloRost = require('mongoose').model('SzalloRost');
var SzalloPor = require('mongoose').model('SzalloPor');
var SzilardAnyag = require('mongoose').model('SzilardAnyag');
var NedvessegMintak = require('mongoose').model('NedvessegMintak');
var AtadottMintak = require('mongoose').model('AtadottMintak');
var GepNaplo = require('mongoose').model('GepNaplo');
var EgyebGep = require('mongoose').model('EgyebGep');  
var Horiba = require('mongoose').model('Horiba');  

exports.szalloRost = function(req, res) {
    SzalloRost.find({}, function(err, docs) {
    	if(err) {
            res.json(err);
        } else {
        	console.log(docs);
            res.render('szures-szallorost', { docs: docs });
    	}
	});
}

exports.szalloPor = function(req, res) {
    SzalloPor.find({}, function(err, docs) {
    	if(err) {
            res.json(err);
        } else {
        	console.log(docs);
            res.render('szures-szallopor', { docs: docs });
    	}
	});
}

exports.szalloPorParam = function(req, res, next, id) {
  SzalloPor.findOne({
    _id:id
  }, function(err, doc) {
    if(err) {
      return next(err);
    } else {
      req.docx = doc;
      next();
    }
  });
};

exports.szalloPorEndPoint = function(req, res) {
  res.render('doc-vegoldal', {docs: req.docx});
}


exports.szalloPorSave = function(req, res, next) {
    SzalloPor.findOne({_id: req.body.azon}, function(err, doc){
      if (err) { return next(err); }
      doc.respir_bemeres  = req.body.resp_be;
      doc.respir_visszameres  = req.body.resp_ki;
      doc.durva_bemeres  = req.body.durva_be;
      doc.durva_visszameres  = req.body.durva_ki;
      doc.save(function(err) {
        if (err) { return next(err); }
      });
    });
};


exports.szilard = function(req, res) {
    SzilardAnyag.find({}, function(err, docs) {
      if(err) {
            res.json(err);
        } else {
          console.log(docs);
            res.render('szures-szilard', { docs: docs });
      }
  });
}

exports.szilardEndPoint = function(req, res) {
  console.log(req.docs);
  res.render('szilard-vegoldal', {docs: req.docs});
}

exports.szilardParam = function(req, res, next, id) {
  SzilardAnyag.findOne({
    _id:id
  }, function(err, doc) {
    if(err) {
      return next(err);
    } else {
      req.docs = doc;
      next();
    }
  });
};

exports.szilardSave =  function(req, res) {
    SzilardAnyag.findOne({_id:req.body.azon}, function(err, doc){
      doc.minta_bemerese  = req.body.mintabe;
      doc.minta_visszamerese  = req.body.mintaki;
      doc.save(function(err) {
    });
  });
};

exports.nedvesseg = function(req, res) {
    NedvessegMintak.find({}, function(err, docs) {
      if(err) {
            res.json(err);
        } else {
            res.render('szures-nedvesseg', { docs: docs });
      }
  });
}

exports.nedvessegEndPoint = function(req, res) {
  res.render('nedves-vegoldal', {docs: req.docs});
}

exports.nedvessegParam = function(req, res, next, id) {
  NedvessegMintak.findOne({
    _id:id
  }, function(err, doc) {
    if(err) {
      return next(err);
    } else {
      req.docs = doc;
      next();
    }
  });
};

exports.nedvessegSave =  function(req, res) {
    NedvessegMintak.findOne({_id:req.body.azon}, function(err, doc){
      doc.minta_bemerese  = req.body.mintabe;
      doc.minta_visszamerese  = req.body.mintaki;
      doc.save(function(err) {
      });
    });
};

exports.atadott = function(req, res) {
    AtadottMintak.find({}, function(err, docs) {
      if(err) {
            res.json(err);
        } else {
            res.render('szures-vizsgalat', { docs: docs });
      }
  });
}

exports.gepNaplo = function(req, res) {
    GepNaplo.find({}, function(err, docs) {
      if(err) {
            res.json(err);
        } else {
          console.log(docs);
            res.render('szures-gepnaplo', { docs: docs });
      }
  });
}

exports.egyebGep = function(req, res) {
    EgyebGep.find({}, function(err, docs) {
      if(err) {
            res.json(err);
        } else {
          console.log(docs);
            res.render('szures-egyeb', { docs: docs });
      }
  });
}

exports.horiba = function(req, res) {
    Horiba.find({}, function(err, docs) {
      if(err) {
            res.json(err);
        } else {
          console.log(docs);
            res.render('szures-horiba', { docs: docs });
      }
  });
}
