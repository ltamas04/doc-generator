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

app.get('/zaj', function(req, res){
  res.render('zaj');
});
app.get('/download', function(req, res){
  res.render('download');
});

app.get('/szenny', function(req, res){
  res.render('szenny');
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


app.get('/modify', function(req, res) {
  res.render('modify');
})

app.use(bodyParser());

app.post('/zajos', function(request, response){
    console.log(request.body.user.name);
    console.log(request.body.user.email);

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
        "levego_terfogata": request.body.levego_terfogata || " - ",
        "datum":'2015.12.23',
        "minta_szama": request.body.minta_szama,
        "vevo_szama": request.body.vevo_szama,
        "idotartam": request.body.idotartam
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

var server = app.listen(3001, 'localhost');