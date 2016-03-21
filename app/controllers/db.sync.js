exports.sync = function(req, res) {
    var mongoose = require('mongoose');
    var SzalloRost = require('mongoose').model('SzalloRost');
    var conn      = mongoose.createConnection('mongodb://admin:asdf@ds035975.mlab.com:35975/korker');

    // stored in 'testB' database
    var ModelB = conn.model('SzalloRost', new mongoose.Schema({ 
        mintavetel_datuma: String,
        mintavetel_helye: String,
        minta_jele: String,
        mintak_szama: {type: Number, default: 1},
        ellenorzott_mintak: String,
        created_at    : { type: Date }
        , updated_at    : { type: Date }
     }, { collection : 'szallorosts' }));

    SzalloRost.find({}, function(err, data) {
      data.forEach(function(item) {
        console.log(item._id);
        ModelB.findOne({
            _id: item._id
        }, function(remoteItem) {
            if(!remoteItem) {
                remoteItem = item;
                var model = new ModelB({
                    mintavetel_datuma: item.mintavetel_datuma
                });
                model.save(function() {
                    console.log('juhuuu');
                });
            }
            else if(remoteItem.updated_at < item.updated_at) {
                console.log('ide amugy valamikor eljutunk?');
                remoteItem = item;
                remoteItem.save();
            } else {
                console.log('vagy ide?');
                item = remoteItem;
                item.save();
            }
        });
      });

        ModelB.find({}, function(data) {
            console.log('>>>ez itt a modelB', data);
        });
    });

    res.redirect('/document');
}
