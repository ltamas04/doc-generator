var SzalloRost = require('mongoose').model('SzalloRost');
var SzalloPor = require('mongoose').model('SzalloPor');

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
      req.doc = doc;
      next();
    }
  });
};

exports.szalloPorEndPoint = function(req, res) {
  res.render('doc-vegoldal', {docs: req.doc});
}


exports.szalloPorSave = function(req, res, next) {
	console.log('start, ', req.body.azon );	
    SzalloPor.findOne({_id: req.body.azon}, function(err, doc){
      if (err) { return next(err); }
      console.log('>>> document: ', doc);
      doc.respir_bemeres  = req.body.resp_be;
      console.log('respbe: ', req.body.resp_be);
      doc.respir_visszameres  = req.body.resp_ki;
      doc.durva_bemeres  = req.body.durva_be;
      doc.durva_visszameres  = req.body.durva_ki;
      doc.save(function(err) {
        if (err) { return next(err); }
      });
    });
};
