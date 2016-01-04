var express = require('express');
var app = express();
var hbs = require('express3-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  console.log('hello');
});

mongoose.connect('mongodb://localhost/korker');

var movieSchema = new mongoose.Schema({
  title: { type: String }
, rating: String
, releaseYear: Number
, hasCreditCookie: Boolean
});

var Movie = mongoose.model('Movie', movieSchema);

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

    //apply them (replace all occurences of {first_name} by Hipp, ...)
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


    var thor = new Movie({
      title: request.body.mintavetel_kodja
    , rating: 'PG-13'
    , releaseYear: '2011'  // Notice the use of a String rather than a Number - Mongoose will automatically convert this for us.
    , hasCreditCookie: true
    });

    thor.save(function(err, thor) {
      if (err) return console.error(err);
      console.dir("juhhu");
    });

    //apply them (replace all occurences of {first_name} by Hipp, ...)
    doc.render();

    var buf = doc.getZip()
                 .generate({type:"nodebuffer"});

    fs.writeFileSync(__dirname+"/output/output.docx",buf);
    response.redirect('/download');
});

var server = app.listen(3001, 'localhost');