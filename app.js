var express = require('express');
var app = express();
var hbs = require('express3-handlebars');
var bodyParser = require('body-parser');

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
  res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  res.set('Content-Disposition', 'attachment; filename="output.docx"');
  res.render('download');
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
        "mintavetel_helyszine":'teszt',
        "mintavetel_helye":'teszt',
        "mintavevo_tipusa":'teszt',
        "mintavetel_modja":'teszt',
        "levego_terfogata":'teszt',
        "datum":'teszt',
        "minta_szama":'teszt'
    });

    //apply them (replace all occurences of {first_name} by Hipp, ...)
    doc.render();

    var buf = doc.getZip()
                 .generate({type:"nodebuffer"});

    fs.writeFileSync(__dirname+"/output/output.docx",buf);
    response.redirect('/download');
});

var server = app.listen(3001, 'localhost');