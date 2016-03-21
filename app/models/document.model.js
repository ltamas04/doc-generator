var mongoose = require('mongoose');

var szalloPor = new mongoose.Schema ({
    mintavetel_datuma: String,
    mintavetel_helye: String,
    minta_jele: String,
    mintak_szama: {type: Number, default: 1},
    respir_bemeres: String,
    respir_visszameres: String,
    durva_bemeres: String,
    durva_visszameres: String,
    created_at    : { type: Date }
  , updated_at    : { type: Date }
}); 

var szilardAnyag = new mongoose.Schema ({
    mintavetel_datuma: String,
    mintavetel_helye: String,
    minta_jele: String,
    minta_bemerese: {type: String, default: "nincs"},
    minta_visszamerese: {type: String, default: "nincs"},
    created_at    : { type: Date }
  , updated_at    : { type: Date }
}); 

var szalloRost = new mongoose.Schema ({
    mintavetel_datuma: String,
    mintavetel_helye: String,
    minta_jele: String,
    mintak_szama: {type: Number, default: 1},
    ellenorzott_mintak: String,
    created_at    : { type: Date }
  , updated_at    : { type: Date }
});

var atadottMintak = new mongoose.Schema ({
    mintavetel_datuma: String,
    mintavetel_helye: String,
    minta_jele: String,
    vizsgalo_laboratorium: String,
    vizsgalt_komponensek: String,
    created_at    : { type: Date }
  , updated_at    : { type: Date }
}); 

var nedvessegMintak = new mongoose.Schema ({
    mintavetel_datuma: String,
    mintavetel_helye: String,
    minta_jele: String,
    minta_bemerese: {type: String, default: "nincs"},
    minta_visszamerese: {type: String, default: "nincs"},
    created_at    : { type: Date }
  , updated_at    : { type: Date }
}); 

var gepNaplo = new mongoose.Schema ({
    mintavetel_gep: String,
    sorszam: String,
    mintavetel_datuma: String,
    mintavetel_helye: String,
    karbantartva: {type: String, default: "karbantartva"},
    alairas: String,
    created_at    : { type: Date }
  , updated_at    : { type: Date }
});

szalloRost.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

nedvessegMintak.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

mongoose.model('NedvessegMintak', nedvessegMintak);
mongoose.model('SzalloPor', szalloPor);
mongoose.model('SzilardAnyag', szilardAnyag);
mongoose.model('SzalloRost', szalloRost);
mongoose.model('AtadottMintak', atadottMintak);
mongoose.model('GepNaplo', gepNaplo);
