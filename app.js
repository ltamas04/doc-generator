var express = require('express');
var app = express();
var hbs = require('express3-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var db = mongoose.connection;
mongoose.connect('mongodb://127.0.0.1:27017/korker');

db.on('error', console.error);
db.once('open', function() {});


var docSchema = new mongoose.Schema({
  mintavetel_kodja: String,
  mintavetel_celja: String,
  mintavetel_hely: String,
  datum: String,
  mintavetel_modszere: String,
  pontminta: String,
  ido_atlag: String,
  hozam_atlag: String,
  alkalmazott: String,
  mintak_kozott: String,
  minta_terfogata: String,
  minta_kezdete: String,
  minta_vege: String,
  minta_jele: String,
  komponensek: String,
  vezetokepesseg: String,
  vizhomerseklet: String,
  megjegyzesek: String
});

var Doc = mongoose.model('Doc', docSchema);

app.engine('hbs', hbs({extName: 'hbs', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/output', {
    setHeaders: function(res, path) {
        res.set('Content-Disposition', 'attachment; filename="output.docx"');
        res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    }
}));


app.get('/', function(req, res){
  res.render('index');
});

app.get('/szallorostkonc', function(req, res){
  res.render('szallorostkonc');
});

app.get('/download', function(req, res){
  res.render('download');
});

app.get('/szenny', function(req, res){
  res.render('szenny');
});

app.get('/szallorost', function(req,res){
  res.render('szallorost');
});

app.get('/adabmun', function(req,res){
  res.render('adabmun');
});

app.get('/ivoviz', function(req,res){
  res.render('ivoviz');
});

app.get('/szures', function(req, res){
  Doc.find({}, function(err,docs) {
    if(err) {
      res.json(err);
    } else {
      console.log('->>>>' + docs);
      res.render('szures', {docs: docs});
    }  
  });
});

app.get('/felszinalatt', function(request, response) {
  response.render('felszinalatt');
});

app.get('/modify', function(req, res) {
  res.render('modify');
})

app.get('/szilard', function(req, res) {
    res.render('szilard');
})

app.get('/szallopor', function(req, res) {
    res.render('szallopor');
})

app.get('/adabem', function(req, res) {
    res.render('adabem');
})

app.get('/fustgaz', function(req, res) {
    res.render('fustgaz');
})

app.use(bodyParser());

app.post('/szallorostkonc', function(request, response){
    fs=require('fs')
    Docxtemplater = require('docxtemplater');

    content = fs
        .readFileSync(__dirname+"/input/23.docx","binary")

    doc=new Docxtemplater(content);

    //set the templateVariables
    doc.setData({
        "mintavetel_helyszine": request.body.mintavetel_helyszine + "   ",
        "mintavetel_helye": request.body.mintavetel_helye + "   ",
        "mintavevo_tipusa": request.body.mintavevo_tipusa + "   ",
        "mintavetel_modja": request.body.mintavetel_modja + "   ",
        "levego_terfogata": request.body.levego_terfogata,
        "mintavetel_kezdete":  request.body.mintavetel_kezdete, 
        "mintavetel_vege":  request.body.mintavetel_vege, 
        "datum": request.body.datum,
        "minta_szama": request.body.minta_szama,
        "mintavevo_szama": request.body.mintavevo_szama,
        "idotartam": request.body.idotartam,
        "ido1": request.body.meterologia_ido_1,
        "ido2": request.body.meterologia_ido_2,
        "ido3": request.body.meterologia_ido_3,
        "ido4": request.body.meterologia_ido_4,
        "legnyomas1": request.body.legnyomas_1,
        "legnyomas2": request.body.legnyomas_2,
        "legnyomas3": request.body.legnyomas_3,
        "legnyomas4": request.body.legnyomas_4,
        "homerseklet1": request.body.homerseklet_1,
        "homerseklet2": request.body.homerseklet_2,
        "homerseklet3": request.body.homerseklet_3,
        "homerseklet4": request.body.homerseklet_4,
        "paratartalom1": request.body.paratartalom_1,
        "paratartalom2": request.body.paratartalom_2,
        "paratartalom3": request.body.paratartalom_3,
        "paratartalom4": request.body.paratartalom_4,
        "legsebesseg1": request.body.legsebesseg_1,
        "legsebesseg2": request.body.legsebesseg_2,
        "legsebesseg3": request.body.legsebesseg_3,
        "legsebesseg4": request.body.legsebesseg_4,
        "behatas": request.body.behatas,
        "rotameter": request.body.rotameter,
        "mikroszkop": request.body.mikroszkop,
        "homerseklet_paratartalom": request.body.paratartalom_mero,
        "barometer": request.body.barometer,
        "megjegyzes": request.body.megjegyzes,
        "uzemviteli": request.body.uzemviteli,
        "mellekletek": request.body.mellekletek,
        "keszitette_nev": request.body.keszitette_nev
    });

    doc.render();

    var buf = doc.getZip()
                 .generate({type:"nodebuffer"});

    fs.writeFileSync(__dirname+"/output/output.docx",buf);
    response.redirect('/download');
});

app.post('/szallopor', function(request, response){
    fs=require('fs')
    Docxtemplater = require('docxtemplater');

    content = fs
        .readFileSync(__dirname+"/input/25.docx","binary")

    doc=new Docxtemplater(content);

    //set the templateVariables
    doc.setData({
        "mintavetel_helyszine": request.body.mintavetel_helyszine,
        "telephely": request.body.telephely,
        "mintavetel_helye": request.body.mintavetel_helye,
        "dolgozo_neve": request.body.dolgozo_neve,
        "vizsgalt_legszeny": request.body.vizsgalt_legszenny,
        "datum": request.body.datum,
        "kezd": request.body.mintavetel_kezdete,
        "veg": request.body.mintavetel_vege,
        "mintavevo_tipusa": request.body.mintavevo_tipusa,
        "mintavevo_szama": request.body.mintavevo_szama,
        "minta_szama": request.body.minta_szama,
        "ido1": request.body.meterologia_ido_1,
        "ido2": request.body.meterologia_ido_2,
        "ido3": request.body.meterologia_ido_3,
        "ido4": request.body.meterologia_ido_4,
        "legnyomas1": request.body.legnyomas_1,
        "legnyomas2": request.body.legnyomas_2,
        "legnyomas3": request.body.legnyomas_3,
        "legnyomas4": request.body.legnyomas_4,
        "homerseklet1": request.body.homerseklet_1,
        "homerseklet2": request.body.homerseklet_2,
        "homerseklet3": request.body.homerseklet_3,
        "homerseklet4": request.body.homerseklet_4,
        "paratartalom1": request.body.paratartalom_1,
        "paratartalom2": request.body.paratartalom_2,
        "paratartalom3": request.body.paratartalom_3,
        "paratartalom4": request.body.paratartalom_4,
        "legsebesseg1": request.body.legsebesseg_1,
        "legsebesseg2": request.body.legsebesseg_2,
        "legsebesseg3": request.body.legsebesseg_3,
        "legsebesseg4": request.body.legsebesseg_4,
        "rotameter": request.body.rotameter,
        "mikroszkop": request.body.mikroszkop,
        "homerseklet_paratartalom": request.body.paratartalom_mero,
        "barometer": request.body.barometer,
        "megjegyzes": request.body.megjegyzes,
        "uzemviteli": request.body.uzemviteli,
        "mellekletek": request.body.mellekletek,
        "keszitette_nev": request.body.keszitette_keszitette
    });

    doc.render();

    var buf = doc.getZip()
                 .generate({type:"nodebuffer"});

    fs.writeFileSync(__dirname+"/output/output.docx",buf);
    response.redirect('/download');
});

app.post('/szallor', function(request, response){
  fs=require('fs')
    Docxtemplater = require('docxtemplater');

  content = fs
        .readFileSync(__dirname+"/input/24.docx","binary")

    doc=new Docxtemplater(content);

    //set the templateVariables
    doc.setData({
        "mintavetel_helyszine": request.body.mintavetel_helyszine,
        "mintavetel_helye": request.body.mintavetel_helye,
        "mintavevo_tipusa": request.body.mintavevo_tipusa,
        "datum": request.body.datum,
        "mintak_szama": request.body.mintak_szama,
        "mintavevo_szama": request.body.mintavevo_szama,
        "mintavetel_modja": request.body.mintavetel_modja,
        "sz1": request.body.minta_szama_1,
        "sz2": request.body.minta_szama_2,
        "sz3": request.body.minta_szama_3,
        "sz3": request.body.minta_szama_3,
        "sz4": request.body.minta_szama_4,
        "sz5": request.body.minta_szama_5,
        "sz6": request.body.minta_szama_6,
        "sz7": request.body.minta_szama_7,
        "mintavetel_hely1": request.body.mintavetel_hely_1,
        "mintavetel_hely2": request.body.mintavetel_hely_2,
        "mintavetel_hely3": request.body.mintavetel_hely_3,
        "mintavetel_hely4": request.body.mintavetel_hely_4,
        "mintavetel_hely5": request.body.mintavetel_hely_5,
        "mintavetel_hely6": request.body.mintavetel_hely_6,
        "mintavetel_hely7": request.body.mintavetel_hely_7,
        "ke1": request.body.mintavetel_kezdete_1,
        "ke2": request.body.mintavetel_kezdete_2,
        "ke3": request.body.mintavetel_kezdete_3,
        "ke4": request.body.mintavetel_kezdete_4,
        "ke5": request.body.mintavetel_kezdete_5,
        "ke6": request.body.mintavetel_kezdete_6,
        "ke7": request.body.mintavetel_kezdete_7,
        "ve1": request.body.mintavetel_vege_1,
        "ve2": request.body.mintavetel_vege_2,
        "ve3": request.body.mintavetel_vege_3,
        "ve4": request.body.mintavetel_vege_4,
        "ve5": request.body.mintavetel_vege_5,
        "ve6": request.body.mintavetel_vege_6,
        "ve7": request.body.mintavetel_vege_7,
        "terfogataram1": request.body.terfogataram_1,
        "terfogataram2": request.body.terfogataram_2,
        "terfogataram3": request.body.terfogataram_3,
        "terfogataram4": request.body.terfogataram_4,
        "terfogataram5": request.body.terfogataram_5,
        "terfogataram6": request.body.terfogataram_6,
        "terfogataram7": request.body.terfogataram_7,
        "munkafolyamat1": request.body.munkafolyamat_1,
        "munkafolyamat2": request.body.munkafolyamat_2,
        "munkafolyamat3": request.body.munkafolyamat_3,
        "munkafolyamat4": request.body.munkafolyamat_4,
        "munkafolyamat5": request.body.munkafolyamat_5,
        "munkafolyamat6": request.body.munkafolyamat_6,
        "munkafolyamat7": request.body.munkafolyamat_7,
        "ido1": request.body.meterologia_ido_1,
        "ido2": request.body.meterologia_ido_2,
        "ido3": request.body.meterologia_ido_3,
        "ido4": request.body.meterologia_ido_4,
        "legnyomas1": request.body.legnyomas_1,
        "legnyomas2": request.body.legnyomas_2,
        "legnyomas3": request.body.legnyomas_3,
        "legnyomas4": request.body.legnyomas_4,
        "homerseklet1": request.body.homerseklet_1,
        "homerseklet2": request.body.homerseklet_2,
        "homerseklet3": request.body.homerseklet_3,
        "homerseklet4": request.body.homerseklet_4,
        "paratartalom1": request.body.paratartalom_1,
        "paratartalom2": request.body.paratartalom_2,
        "paratartalom3": request.body.paratartalom_3,
        "paratartalom4": request.body.paratartalom_4,
        "legsebesseg1": request.body.legsebesseg_1,
        "legsebesseg2": request.body.legsebesseg_2,
        "legsebesseg3": request.body.legsebesseg_3,
        "legsebesseg4": request.body.legsebesseg_4,
        "behatas": request.body.behatas,
        "rotameter": request.body.rotameter,
        "mikroszkop": request.body.mikroszkop,
        "homerseklet_paratartalom": request.body.paratartalom_mero,
        "barometer": request.body.barometer,
        "megjegyzes": request.body.megjegyzes,
        "uzemviteli": request.body.uzemviteli,
        "mellekletek": request.body.mellekletek,
        "keszitette_nev": request.body.keszitette
    });

    doc.render();

    var buf = doc.getZip()
                 .generate({type:"nodebuffer"});

    fs.writeFileSync(__dirname+"/output/output.docx",buf);
    response.redirect('/download');
});

app.post('/felszina', function(request, response){
  fs=require('fs')
    Docxtemplater = require('docxtemplater');

  content = fs
        .readFileSync(__dirname+"/input/33.docx","binary")

    doc=new Docxtemplater(content);

    //set the templateVariables
    doc.setData({
        "mintavetel_helyszine": request.body.mintavetel_helyszine,
        "mintavetel_helye": request.body.mintavetel_helye,
        "mintaveteli_hely": request.body.mintaveteli_hely,
        "mintavetel_ideje": request.body.datum,
        "szurozes_adatai": request.body.szurozes_adatai,
        "kutanyag": request.body.kutanyag,
        "talpmelyseg": request.body.talpmelyseg,
        "mbf": request.body.mbf,
        "vizsgalando_komponensek": request.body.komponensek,
        "tartositas_modja": request.body.tartositas_modja,
        "vizmintakod": request.body.vizmintakod,
        "szivattyuzas": request.body.szivattyuzas,
        "vizoszlop": request.body.vizoszlop,
        "csoatmero": request.body.csoatmero,
        "szamitassal_meghatarozott": request.body.szamitassal_meghatarozott,
        "kitermelt_viz_terfogata": request.body.kitermelt_viz,
        "ido1": request.body.ido1,
        "ido2": request.body.ido2,
        "ido3": request.body.ido3,
        "hozam1": request.body.hozam1,
        "hozam2": request.body.hozam2,
        "hozam3": request.body.hozam3,
        "vizszint1": request.body.vizszint1,
        "vizszint2": request.body.vizszint2,
        "vizszint3": request.body.vizszint3,
        "vezeto1": request.body.vezeto1,
        "vezeto2": request.body.vezeto2,
        "vezeto3": request.body.vezeto3,
        "vizho1": request.body.vizho1,
        "vizho2": request.body.vizho2,
        "vizho3": request.body.vizho3,
        "ph1": request.body.ph1,
        "ph2": request.body.ph2,
        "ph3": request.body.ph3,
        "keszitette_nev": request.body.keszitette
    });

    doc.render();

    var buf = doc.getZip()
                 .generate({type:"nodebuffer"});

    fs.writeFileSync(__dirname+"/output/output.docx",buf);
    response.redirect('/download');
});

app.post('/ivoviz', function(request, response){
  fs=require('fs')
    Docxtemplater = require('docxtemplater');

  content = fs
        .readFileSync(__dirname+"/input/31.docx","binary")

    doc=new Docxtemplater(content);

    //set the templateVariables
    doc.setData({
        "mintavetel_helyszine": request.body.mintavetel_helyszine,
        "mintavetel_helye": request.body.mintavetel_helye,
        "mintaveteli_hely": request.body.mintaveteli_hely,
        "datum": request.body.datum,
        "mintak_jele": request.body.mintak_jele,
        "ph": request.body.ph,
        "vezetokep": request.body.vezetokep,
        "vizhomersek": request.body.vizhomersek,
        "keszitette_nev": request.body.keszitette
    });

    doc.render();

    var buf = doc.getZip()
                 .generate({type:"nodebuffer"});

    fs.writeFileSync(__dirname+"/output/output.docx",buf);
    response.redirect('/download');
});

app.post('/szennyes', function(request, response){
    fs=require('fs')
    Docxtemplater = require('docxtemplater');

    content = fs
        .readFileSync(__dirname+"/input/34.docx","binary")

    doc=new Docxtemplater(content);

    //set the templateVariables
    doc.setData({
        "mintavetel_kodja": request.body.mintavetel_kodja,
        "mintavetel_celja": request.body.mintavetel_celja,
        "mintavetel_hely": request.body.mintavetel_helye,
        "datum": request.body.datum,
        "mintavetel_modszere": request.body.mintavetel_modszere,
        "pontminta": request.body.pontminta,
        "ido_atlag": request.body.ido_atlag || " - ",
        "hozam_atlag": request.body.hozam_atlag,
        "alkalmazott": request.body.alkalmazott,
        "mintak_kozott": request.body.mintak_kozott,
        "minta_terfogata": request.body.minta_terfogat,
        "minta_kezdete": request.body.minta_kezdete,
        "minta_vege": request.body.minta_vege,
        "minta_jele": request.body.minta_jele,
        "komponensek": request.body.komponensek,
        "vezetokepesseg": request.body.vezetokepesseg,
        "vizhomerseklet": request.body.vizhomerseklet,
        "megjegyzesek": request.body.megjegyzesek
    });


    var szenny = new Doc({
      mintavetel_kodja: request.body.mintavetel_kodja,
      mintavetel_celja: request.body.mintavetel_celja,
      mintavetel_hely: request.body.mintavetel_helye,
      datum: request.body.datum,
      mintavetel_modszere: request.body.mintavetel_modszere,
      pontminta: request.body.pontminta,
      ido_atlag: request.body.ido_atlag,
      hozam_atlag: request.body.hozam_atlag,
      alkalmazott: request.body.alkalmazott,
      mintak_kozott: request.body.mintak_kozott,
      minta_terfogata: request.body.minta_terfogat,
      minta_kezdete: request.body.minta_kezdete,
      minta_vege: request.body.minta_vege,
      minta_jele: request.body.minta_jele,
      komponensek: request.body.komponensek,
      vezetokepesseg: request.body.vezetokepesseg,
      vizhomerseklet: request.body.vizhomerseklet,
      megjegyzesek: request.body.megjegyzesek
    });

    szenny.save(function(err, thor) {
      if (err) return console.error(err);
      console.dir("juhhu");
    });

    doc.render();

    var buf = doc.getZip()
                 .generate({type:"nodebuffer"});

    fs.writeFileSync(__dirname+"/output/output.docx",buf);
    response.redirect('/download');
});

app.post('/szilard', function(request, response){
     fs=require('fs')
    Docxtemplater = require('docxtemplater');

    content = fs
        .readFileSync(__dirname+"/input/26.docx","binary")

    doc=new Docxtemplater(content);

    //set the templateVariables
    doc.setData({
        "ceg_neve": request.body.ceg_neve,
        "telephely": request.body.telephely,
        "meres_helye": request.body.meres_helye,
        "datum": request.body.datum,
        "legnyomas": request.body.legnyomas,
        "para": request.body.para,
        "homerseklet": request.body.homerseklet,
        "hordozogaz": request.body.hordozogaz,
        "statikus_nyomasa": request.body.statikus_nyomasa,
        "I1": request.body.n1_1,
        "I2": request.body.n1_2,
        "I3": request.body.n1_3,
        "I4": request.body.n1_7,
        "I5": request.body.n1_8,
        "I6": request.body.n1_9,
        "I7": request.body.n1_13,
        "I8": request.body.n1_14,
        "I9": request.body.n1_15,
        "I10": request.body.n1_19,
        "I11": request.body.n1_20,
        "I12": request.body.n1_21,
        "I13": request.body.n1_25,
        "I14": request.body.n1_26,
        "I15": request.body.n1_27,
        "I16": request.body.n1_31,
        "I17": request.body.n1_32,
        "I18": request.body.n1_33,
        "I19": request.body.n1_4,
        "I20": request.body.n1_5,
        "I21": request.body.n1_6,
        "I22": request.body.n1_10,
        "I23": request.body.n1_11,
        "I24": request.body.n1_12,
        "I25": request.body.n1_16,
        "I26": request.body.n1_17,
        "I27": request.body.n1_18,
        "I28": request.body.n1_22,
        "I29": request.body.n1_23,
        "I30": request.body.n1_24,
        "I31": request.body.n1_28,
        "I32": request.body.n1_29,
        "I33": request.body.n1_30,
        "I34": request.body.n1_34,
        "I35": request.body.n1_35,
        "I36": request.body.n1_36,
        "II1": request.body.n2_1,
        "II2": request.body.n2_2,
        "II3": request.body.n2_3,
        "II4": request.body.n2_7,
        "II5": request.body.n2_8,
        "II6": request.body.n2_9,
        "II7": request.body.n2_13,
        "II8": request.body.n2_14,
        "II9": request.body.n2_15,
        "II10": request.body.n2_19,
        "II11": request.body.n2_20,
        "II12": request.body.n2_21,
        "II13": request.body.n2_25,
        "II14": request.body.n2_26,
        "II15": request.body.n2_27,
        "II16": request.body.n2_31,
        "II17": request.body.n2_32,
        "II18": request.body.n2_33,
        "II19": request.body.n2_4,
        "II20": request.body.n2_5,
        "II21": request.body.n2_6,
        "II22": request.body.n2_10,
        "II23": request.body.n2_11,
        "II24": request.body.n2_12,
        "II25": request.body.n2_16,
        "II26": request.body.n2_17,
        "II27": request.body.n2_18,
        "II28": request.body.n2_22,
        "II29": request.body.n2_23,
        "II30": request.body.n2_24,
        "II31": request.body.n2_28,
        "II32": request.body.n2_29,
        "II33": request.body.n2_30,
        "II34": request.body.n2_34,
        "II35": request.body.n2_35,
        "II36": request.body.n2_36,
        "III1": request.body.n3_1,
        "III2": request.body.n3_2,
        "III3": request.body.n3_3,
        "III4": request.body.n3_7,
        "III5": request.body.n3_8,
        "III6": request.body.n3_9,
        "III7": request.body.n3_13,
        "III8": request.body.n3_14,
        "III9": request.body.n3_15,
        "III10": request.body.n3_19,
        "III11": request.body.n3_20,
        "III12": request.body.n3_21,
        "III13": request.body.n3_25,
        "III14": request.body.n3_26,
        "III15": request.body.n3_27,
        "III16": request.body.n3_31,
        "III17": request.body.n3_32,
        "III18": request.body.n3_33,
        "III19": request.body.n3_4,
        "III20": request.body.n3_5,
        "III21": request.body.n3_6,
        "III22": request.body.n3_10,
        "III23": request.body.n3_11,
        "III24": request.body.n3_12,
        "III25": request.body.n3_16,
        "III26": request.body.n3_17,
        "III27": request.body.n3_18,
        "III28": request.body.n3_22,
        "III29": request.body.n3_23,
        "III30": request.body.n3_24,
        "III31": request.body.n3_28,
        "III32": request.body.n3_29,
        "III33": request.body.n3_30,
        "III34": request.body.n3_34,
        "III35": request.body.n3_35,
        "III36": request.body.n3_36,
        "homerseklet_a_g": request.body.homerseklet_gazoraban,        
        "nyomas_a_g": request.body.nyomas_gazoraban,
        "beszivocso_merete":  request.body.beszivocso_merete, 
        "reszgazaram":  request.body.reszgazaram,
        "R1": request.body.R1, 
        "R2": request.body.R2, 
        "R3": request.body.R3, 
        "R4": request.body.R4, 
        "R5": request.body.R5, 
        "R6": request.body.R6, 
        "n_minta_jele": request.body.n_minta_jele, 
        "mintavetel_kezdete1": request.body.mintavetel_kezdete1, 
        "mintavetel_vege1": request.body.mintavetel_vege1, 
        "mintavetel_vege1": request.body.mintavetel_vege1, 
        "n_kezd": request.body.gazora_kezd1, 
        "n_veg": request.body.gazora_vege1, 
        "n_ho": request.body.nyomas1, 
        "homerseklet1": request.body.homerseklet1, 
        "minta_jele1": request.body.minta_jele1, 
        "i_kezd1": request.body.i_kezd1, 
        "i_veg1": request.body.i_veg1, 
        "g_kezd1": request.body.g_kezd1, 
        "g_veg1": request.body.g_veg1, 
        "ho1": request.body.k_mbar1, 
        "mbar1": request.body.v_mbar1, 
        "terfog1": request.body.homers1,
        "minta_jele2": request.body.minta_jele2, 
        "i_kezd2": request.body.i_kezd2, 
        "i_veg2": request.body.i_veg2, 
        "g_kezd2": request.body.g_kezd2, 
        "g_veg2": request.body.g_veg2, 
        "ho2": request.body.k_mbar2, 
        "mbar2": request.body.v_mbar2, 
        "terfog2": request.body.homers2,  
        "minta_jele3": request.body.minta_jele3, 
        "i_kezd3": request.body.i_kezd3, 
        "i_veg3": request.body.i_veg3, 
        "g_kezd3": request.body.g_kezd3, 
        "g_veg3": request.body.g_veg3, 
        "ho3": request.body.k_mbar3, 
        "mbar3": request.body.v_mbar3, 
        "terfog3": request.body.homers3,  
        "uzemviteli": request.body.uzemviteli,
        "mellekletek": request.body.mellekletek,
        "keszitette_nev": request.body.keszitette,
        "alkalmazott_eszkozok": request.body.alkalmazott_eszkozok
    });

    doc.render();

    var buf = doc.getZip()
                 .generate({type:"nodebuffer"});

    fs.writeFileSync(__dirname+"/output/output.docx",buf);
    response.redirect('/download');
})

app.post('/adabem', function(request, response){
     fs=require('fs')
    Docxtemplater = require('docxtemplater');

    content = fs
        .readFileSync(__dirname+"/input/27.docx","binary")

    doc=new Docxtemplater(content);

    //set the templateVariables
    doc.setData({
        "mintavetel_helyszine": request.body.ceg_neve,
        "telephely": request.body.telephely,
        "meres_helye": request.body.meres_helye,
        "datum": request.body.datum,
        "legnyomas": request.body.legnyomas,
        "para": request.body.para,
        "homerseklet": request.body.homerseklet,
        "hordozogaz": request.body.hordozogaz,
        "statikus_nyomasa": request.body.statikus_nyomasa,
        "I1": request.body.n1_1,
        "I2": request.body.n1_2,
        "I3": request.body.n1_3,
        "I4": request.body.n1_7,
        "I5": request.body.n1_8,
        "I6": request.body.n1_9,
        "I7": request.body.n1_13,
        "I8": request.body.n1_14,
        "I9": request.body.n1_15,
        "I10": request.body.n1_19,
        "I11": request.body.n1_20,
        "I12": request.body.n1_21,
        "I13": request.body.n1_25,
        "I14": request.body.n1_26,
        "I15": request.body.n1_27,
        "I16": request.body.n1_31,
        "I17": request.body.n1_32,
        "I18": request.body.n1_33,
        "I19": request.body.n1_4,
        "I20": request.body.n1_5,
        "I21": request.body.n1_6,
        "I22": request.body.n1_10,
        "I23": request.body.n1_11,
        "I24": request.body.n1_12,
        "I25": request.body.n1_16,
        "I26": request.body.n1_17,
        "I27": request.body.n1_18,
        "I28": request.body.n1_22,
        "I29": request.body.n1_23,
        "I30": request.body.n1_24,
        "I31": request.body.n1_28,
        "I32": request.body.n1_29,
        "I33": request.body.n1_30,
        "I34": request.body.n1_34,
        "I35": request.body.n1_35,
        "I36": request.body.n1_36,
        "II1": request.body.n2_1,
        "II2": request.body.n2_2,
        "II3": request.body.n2_3,
        "II4": request.body.n2_7,
        "II5": request.body.n2_8,
        "II6": request.body.n2_9,
        "II7": request.body.n2_13,
        "II8": request.body.n2_14,
        "II9": request.body.n2_15,
        "II10": request.body.n2_19,
        "II11": request.body.n2_20,
        "II12": request.body.n2_21,
        "II13": request.body.n2_25,
        "II14": request.body.n2_26,
        "II15": request.body.n2_27,
        "II16": request.body.n2_31,
        "II17": request.body.n2_32,
        "II18": request.body.n2_33,
        "II19": request.body.n2_4,
        "II20": request.body.n2_5,
        "II21": request.body.n2_6,
        "II22": request.body.n2_10,
        "II23": request.body.n2_11,
        "II24": request.body.n2_12,
        "II25": request.body.n2_16,
        "II26": request.body.n2_17,
        "II27": request.body.n2_18,
        "II28": request.body.n2_22,
        "II29": request.body.n2_23,
        "II30": request.body.n2_24,
        "II31": request.body.n2_28,
        "II32": request.body.n2_29,
        "II33": request.body.n2_30,
        "II34": request.body.n2_34,
        "II35": request.body.n2_35,
        "II36": request.body.n2_36,
        "III1": request.body.n3_1,
        "III2": request.body.n3_2,
        "III3": request.body.n3_3,
        "III4": request.body.n3_7,
        "III5": request.body.n3_8,
        "III6": request.body.n3_9,
        "III7": request.body.n3_13,
        "III8": request.body.n3_14,
        "III9": request.body.n3_15,
        "III10": request.body.n3_19,
        "III11": request.body.n3_20,
        "III12": request.body.n3_21,
        "III13": request.body.n3_25,
        "III14": request.body.n3_26,
        "III15": request.body.n3_27,
        "III16": request.body.n3_31,
        "III17": request.body.n3_32,
        "III18": request.body.n3_33,
        "III19": request.body.n3_4,
        "III20": request.body.n3_5,
        "III21": request.body.n3_6,
        "III22": request.body.n3_10,
        "III23": request.body.n3_11,
        "III24": request.body.n3_12,
        "III25": request.body.n3_16,
        "III26": request.body.n3_17,
        "III27": request.body.n3_18,
        "III28": request.body.n3_22,
        "III29": request.body.n3_23,
        "III30": request.body.n3_24,
        "III31": request.body.n3_28,
        "III32": request.body.n3_29,
        "III33": request.body.n3_30,
        "III34": request.body.n3_34,
        "III35": request.body.n3_35,
        "III36": request.body.n3_36,
        "n_minta_jele": request.body.n_minta_jele, 
        "mintavetel_kezdete1": request.body.mintavetel_kezdete1, 
        "mintavetel_vege1": request.body.mintavetel_vege1, 
        "mintavetel_vege1": request.body.mintavetel_vege1, 
        "n_kezd": request.body.gazora_kezd1, 
        "n_veg": request.body.gazora_vege1, 
        "n_ho": request.body.nyomas1, 
        "n_mbar": request.body.homerseklet1, 
        "minta_jele1": request.body.minta_jele1, 
        "i_kezd1": request.body.i_kezd1, 
        "i_veg1": request.body.i_veg1, 
        "g_kezd1": request.body.g_kezd1, 
        "g_veg1": request.body.g_veg1, 
        "ho1": request.body.homers1, 
        "nyomas1": request.body.mbar1, 
        "terfog1": request.body.terfog1,
        "minta_jele2": request.body.minta_jele2, 
        "i_kezd2": request.body.i_kezd2, 
        "i_veg2": request.body.i_veg2, 
        "g_kezd2": request.body.g_kezd2, 
        "g_veg2": request.body.g_veg2, 
        "ho2": request.body.homers2, 
        "nyomas2": request.body.mbar2, 
        "terfog2": request.body.terfog2,  
        "minta_jele3": request.body.minta_jele3, 
        "i_kezd3": request.body.i_kezd3, 
        "i_veg3": request.body.i_veg3, 
        "g_kezd3": request.body.g_kezd3, 
        "g_veg3": request.body.g_veg3, 
        "ho3": request.body.homers3, 
        "nyomas3": request.body.mbar3, 
        "terfog3": request.body.terfog3,  
        "uzemviteli": request.body.uzemviteli,
        "mellekletek": request.body.mellekletek,
        "keszitette_nev": request.body.keszitette,
        "alkalmazott_eszkozok": request.body.alkalmazott_eszkozok
    });

    doc.render();

    var buf = doc.getZip()
                 .generate({type:"nodebuffer"});

    fs.writeFileSync(__dirname+"/output/output.docx",buf);
    response.redirect('/download');
})

app.post('/adabmun', function(request, response){
    fs=require('fs')
    Docxtemplater = require('docxtemplater');

    content = fs
        .readFileSync(__dirname+"/input/28.docx","binary")

    doc=new Docxtemplater(content);

    //set the templateVariables
    doc.setData({
        "mintavetel_helyszine": request.body.mintavetel_helyszine,
        "telephely": request.body.telephely,
        "mintavetel_helye": request.body.mintavetel_helye,
        "dolgozo_neve": request.body.dolgozo_neve,
        "vizsgalt_legszeny": request.body.vizsgalt_legszenny,
        "datum": request.body.datum,
        "kezd": request.body.mintavetel_kezdete,
        "veg": request.body.mintavetel_vege,
        "mintavevo_tipusa": request.body.mintavevo_tipusa,
        "mintavevo_sza": request.body.mintavevo_szama,
        "mintavetel_seb": request.body.mintavetel_seb,
        "mintak_szama": request.body.mintak_szama,
        "ido1": request.body.meterologia_ido_1,
        "ido2": request.body.meterologia_ido_2,
        "ido3": request.body.meterologia_ido_3,
        "ido4": request.body.meterologia_ido_4,
        "legnyomas1": request.body.legnyomas_1,
        "legnyomas2": request.body.legnyomas_2,
        "legnyomas3": request.body.legnyomas_3,
        "legnyomas4": request.body.legnyomas_4,
        "homerseklet1": request.body.homerseklet_1,
        "homerseklet2": request.body.homerseklet_2,
        "homerseklet3": request.body.homerseklet_3,
        "homerseklet4": request.body.homerseklet_4,
        "paratartalom1": request.body.paratartalom_1,
        "paratartalom2": request.body.paratartalom_2,
        "paratartalom3": request.body.paratartalom_3,
        "paratartalom4": request.body.paratartalom_4,
        "legsebesseg1": request.body.legsebesseg_1,
        "legsebesseg2": request.body.legsebesseg_2,
        "legsebesseg3": request.body.legsebesseg_3,
        "legsebesseg4": request.body.legsebesseg_4,
        "minta_jele1": request.body.minta_jele1,
        "kezd1": request.body.kezd1,
        "bef1": request.body.veg1,
        "megjegyzes1": request.body.megjegyzes1,
        "minta_jele2": request.body.minta_jele2,
        "kezd2": request.body.kezd2,
        "bef2": request.body.veg2,
        "megjegyzes2": request.body.megjegyzes2,
        "minta_jele3": request.body.minta_jele3,
        "kezd3": request.body.kezd3,
        "bef3": request.body.veg3,
        "megjegyzes3": request.body.megjegyzes3,
        "minta_jele4": request.body.minta_jele4,
        "kezd4": request.body.kezd4,
        "bef4": request.body.veg4,
        "megjegyzes4": request.body.megjegyzes4,
        "minta_jele5": request.body.minta_jele5,
        "kezd5": request.body.kezd5,
        "bef5": request.body.veg5,
        "megjegyzes5": request.body.megjegyzes5,
        "minta_jele6": request.body.minta_jele6,
        "kezd6": request.body.kezd6,
        "bef6": request.body.veg6,
        "megjegyzes6": request.body.megjegyzes6,
        "minta_jele7": request.body.minta_jele7,
        "kezd7": request.body.kezd7,
        "bef7": request.body.veg7,
        "megjegyzes7": request.body.megjegyzes7,
        "minta_jele8": request.body.minta_jele8,
        "kezd8": request.body.kezd8,
        "bef8": request.body.veg8,
        "megjegyzes8": request.body.megjegyzes8,
        "minta_jele9": request.body.minta_jele9,
        "kezd9": request.body.kezd9,
        "bef9": request.body.veg9,
        "megjegyzes9": request.body.megjegyzes9,
        "uzemviteli": request.body.uzemviteli,
        "mellekletek": request.body.mellekletek,
        "keszitette_nev": request.body.keszitette_keszitette,
        "alkalmazott_eszkozok": request.body.alkalmazott_eszkozok
    });

    doc.render();

    var buf = doc.getZip()
                 .generate({type:"nodebuffer"});

    fs.writeFileSync(__dirname+"/output/output.docx",buf);
    response.redirect('/download');
});

app.post('/fustgaz', function(request, response){
     fs=require('fs')
    Docxtemplater = require('docxtemplater');

    content = fs
        .readFileSync(__dirname+"/input/29.docx","binary")

    doc=new Docxtemplater(content);

    //set the templateVariables
    doc.setData({
        "mintavetel_helyszine": request.body.ceg_neve,
        "telephely": request.body.telephely,
        "meres_helye": request.body.meres_helye,
        "datum": request.body.datum,
        "legnyomas": request.body.legnyomas,
        "para": request.body.para,
        "homerseklet": request.body.homerseklet,
        "hordozogaz": request.body.hordozogaz,
        "statikus_nyomasa": request.body.statikus_nyomasa,
        "I1": request.body.n1_1,
        "I2": request.body.n1_2,
        "I3": request.body.n1_3,
        "I4": request.body.n1_7,
        "I5": request.body.n1_8,
        "I6": request.body.n1_9,
        "I7": request.body.n1_13,
        "I8": request.body.n1_14,
        "I9": request.body.n1_15,
        "I10": request.body.n1_19,
        "I11": request.body.n1_20,
        "I12": request.body.n1_21,
        "I13": request.body.n1_25,
        "I14": request.body.n1_26,
        "I15": request.body.n1_27,
        "I16": request.body.n1_31,
        "I17": request.body.n1_32,
        "I18": request.body.n1_33,
        "I19": request.body.n1_4,
        "I20": request.body.n1_5,
        "I21": request.body.n1_6,
        "I22": request.body.n1_10,
        "I23": request.body.n1_11,
        "I24": request.body.n1_12,
        "I25": request.body.n1_16,
        "I26": request.body.n1_17,
        "I27": request.body.n1_18,
        "I28": request.body.n1_22,
        "I29": request.body.n1_23,
        "I30": request.body.n1_24,
        "I31": request.body.n1_28,
        "I32": request.body.n1_29,
        "I33": request.body.n1_30,
        "I34": request.body.n1_34,
        "I35": request.body.n1_35,
        "I36": request.body.n1_36,
        "II1": request.body.n2_1,
        "II2": request.body.n2_2,
        "II3": request.body.n2_3,
        "II4": request.body.n2_7,
        "II5": request.body.n2_8,
        "II6": request.body.n2_9,
        "II7": request.body.n2_13,
        "II8": request.body.n2_14,
        "II9": request.body.n2_15,
        "II10": request.body.n2_19,
        "II11": request.body.n2_20,
        "II12": request.body.n2_21,
        "II13": request.body.n2_25,
        "II14": request.body.n2_26,
        "II15": request.body.n2_27,
        "II16": request.body.n2_31,
        "II17": request.body.n2_32,
        "II18": request.body.n2_33,
        "II19": request.body.n2_4,
        "II20": request.body.n2_5,
        "II21": request.body.n2_6,
        "II22": request.body.n2_10,
        "II23": request.body.n2_11,
        "II24": request.body.n2_12,
        "II25": request.body.n2_16,
        "II26": request.body.n2_17,
        "II27": request.body.n2_18,
        "II28": request.body.n2_22,
        "II29": request.body.n2_23,
        "II30": request.body.n2_24,
        "II31": request.body.n2_28,
        "II32": request.body.n2_29,
        "II33": request.body.n2_30,
        "II34": request.body.n2_34,
        "II35": request.body.n2_35,
        "II36": request.body.n2_36,
        "III1": request.body.n3_1,
        "III2": request.body.n3_2,
        "III3": request.body.n3_3,
        "III4": request.body.n3_7,
        "III5": request.body.n3_8,
        "III6": request.body.n3_9,
        "III7": request.body.n3_13,
        "III8": request.body.n3_14,
        "III9": request.body.n3_15,
        "III10": request.body.n3_19,
        "III11": request.body.n3_20,
        "III12": request.body.n3_21,
        "III13": request.body.n3_25,
        "III14": request.body.n3_26,
        "III15": request.body.n3_27,
        "III16": request.body.n3_31,
        "III17": request.body.n3_32,
        "III18": request.body.n3_33,
        "III19": request.body.n3_4,
        "III20": request.body.n3_5,
        "III21": request.body.n3_6,
        "III22": request.body.n3_10,
        "III23": request.body.n3_11,
        "III24": request.body.n3_12,
        "III25": request.body.n3_16,
        "III26": request.body.n3_17,
        "III27": request.body.n3_18,
        "III28": request.body.n3_22,
        "III29": request.body.n3_23,
        "III30": request.body.n3_24,
        "III31": request.body.n3_28,
        "III32": request.body.n3_29,
        "III33": request.body.n3_30,
        "III34": request.body.n3_34,
        "III35": request.body.n3_35,
        "III36": request.body.n3_36,
        "minta_jele1": request.body.n_minta_jele1, 
        "i_kezd1": request.body.mintavetel_kezdete_1, 
        "i_veg1": request.body.mintavetel_vege_1, 
        "g_kezd1": request.body.gazora_kezd1, 
        "g_veg1": request.body.gazora_vege1, 
        "ho1": request.body.homerseklet1, 
        "mbar1": request.body.nyomas1, 
        "terfog1": request.body.terfogat1,
        "minta_jele2": request.body.n_minta_jele2, 
        "i_kezd2": request.body.mintavetel_kezdete_2, 
        "i_veg2": request.body.mintavetel_vege_2, 
        "g_kezd2": request.body.gazora_kezd2, 
        "g_veg2": request.body.gazora_vege2, 
        "ho2": request.body.homerseklet2, 
        "mbar2": request.body.nyomas2, 
        "terfog2": request.body.terfogat2,
        "minta_jele3": request.body.n_minta_jele3, 
        "i_kezd3": request.body.mintavetel_kezdete_3, 
        "i_veg3": request.body.mintavetel_vege_3, 
        "g_kezd3": request.body.gazora_kezd3, 
        "g_veg3": request.body.gazora_vege3, 
        "ho3": request.body.homerseklet3, 
        "mbar3": request.body.nyomas3, 
        "terfog3": request.body.terfogat3,
        "fust_mintavetel_kezd": request.body.fust_mintavetel_kezdete,
        "fust_mintavetel_veg": request.body.fust_mintavetel_vege,
        "uzemviteli": request.body.uzemviteli,
        "mellekletek": request.body.mellekletek,
        "keszitette_nev": request.body.keszitette,
        "alkalmazott_eszkozok": request.body.alkalmazott_eszkozok
    });

    doc.render();

    var buf = doc.getZip()
                 .generate({type:"nodebuffer"});

    fs.writeFileSync(__dirname+"/output/output.docx",buf);
    response.redirect('/download');
})

var server = app.listen(3001, 'localhost');