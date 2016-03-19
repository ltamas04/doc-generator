var SzalloRost = require('mongoose').model('SzalloRost');

exports.szalloRost = function(req, res) {
    SzalloRost.find({}, function(err, docs) {
    	if(err) {
            res.json(err);
        } else {
        	console.log(docs);
            res.render('szallorost-modositas', { docs: 'teszt' });
    	}
	});
}