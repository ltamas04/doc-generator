process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongoose = require('./config/mongoose'),
  remoteMongoose = require('./config/remoteMongoose'),
  express = require('./config/express');

var db = mongoose();
//var remoteDb = remoteMongoose();
var app = express();


app.listen(3001);

module.exports = app;
/*
var spawn = require('child_process').spawn,
ls    = spawn('cmd.exe', ['/c', 'my.bat']);

ls.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

ls.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

ls.on('exit', function (code) {
  console.log('child process exited with code ' + code);
});
*/
//mongoose.connect('mongodb://127.0.0.1:27017/korker');
//var conn = mongoose.connect;

//mongoose2.connect('mongodb://127.0.0.1:27017/pina');
//var conn2 = mongoose2.connect;


//mongoose.connect('mongodb://127.0.0.1:27017/testB');
//var conn2 = mongoose.connect; 

//mongoose.model();

//var szallorosts = mongoose.model('szallorosts');
//szallorosts.find({}, function(err, data) { console.log(err, data, data.length); });


/*

app.get('/felszinalatt', function(request, response) {
  response.render('felszinalatt');
});

app.get('/modify', function(req, res) {
  res.render('modify');
});

app.get('/szilard', function(req, res) {
    res.render('szilard');
});

app.get('/szallopor', function(req, res) {
    res.render('szallopor');
});

app.get('/adabem', function(req, res) {
    res.render('adabem');
});

app.get('/fustgaz', function(req, res) {
    res.render('fustgaz');
});

app.get('/upload-image', function(req, res) {
    res.render('upload-image');
});


app.get('/szallorost-modositas', function(req, res) {
     SzalloPor.find({}, function(err, docs) {
        if(err) {
            res.json(err);
        } else {
            res.render('szallorost-modositas', {docs: docs});
        }
    });
});

app.post('/szallorost-document', function(req, res) {
    SzalloPor.findOne({mintavetel_helye: 'Teses'}, function(err,obj) { 
        console.log(obj);
        res.contentType('json');
        res.send(obj);
    });
});

app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/szilard-save', function(req, res) {
    StringzilardAnyag.findOne({_id:req.body.azon}, function(err, doc){
      if (err) { return next(err); }
      doc.minta_bemerese  = req.body.mintabe;
      doc.minta_visszamerese  = req.body.mintaki;
      doc.save(function(err) {
        if (err) { return next(err); }
      });
    });
});

app.post('/nedvesseg-save', function(req, res) {
    NedvessegMintak.findOne({_id:req.body.azon}, function(err, doc){
      if (err) { return next(err); }
      doc.minta_bemerese  = req.body.mintabe;
      doc.minta_visszamerese  = req.body.mintaki;
      doc.save(function(err) {
        if (err) { return next(err); }
      });
    });
});

app.post('/upload-image', function(request,response) {
    var fs = require('fs');
    fs.writeFile("uploads/out.jpg", new Buffer(request.body.mydata, "base64"), function(err) {});

    setTimeout(function() {
        var ImageModule=require('docxtemplater-image-module'),
        DocxGen = require('docxtemplater')
        fs=require('fs')

        var opts = {}
        opts.centered = false;
        opts.getImage=function(tagValue, tagName) {
            return fs.readFileSync(tagValue,'binary');
        }

        opts.getSize=function(img,tagValue, tagName) {
            return [900,700];
        }

        var imageModule=new ImageModule(opts);

         content = fs
                .readFileSync(__dirname+"/output/output.docx","binary")



        var docx=new DocxGen()
            .attachModule(imageModule)
            .load(content)
            .setData({image:'uploads/out.jpg'})
            .render()

        var buffer= docx
                .getZip()
                .generate({type:"nodebuffer"})

        fs.writeFile("output/output.docx",buffer);
        response.redirect('/download');

    },5000);
});

app.post('/captureImage', function(req, res, next) {
        console.log(req.body);
});

app.post('/szallorostkonc', function(request, response){

    var szallorost = new SzalloRost({
        mintavetel_datuma: request.body.datum,
        mintavetel_helye: request.body.mintavetel_helyszine,
        minta_jele: request.body.minta_szama,
        ellenorzott_mintak: request.body.ellenorzott_minta
    });

    szallorost.save(function(err, thor) {
      if (err) return console.error(err);
      console.dir("juhhu");
    });

    doc.render();

    var buf = doc.getZip()
                 .generate({type:"nodebuffer"});

    fs.writeFileSync(__dirname+"/output/output.docx",buf);
    response.redirect('/upload-image');
});

app.post('/szallopor', function(request, response){

    if(request.body.minta_szama) {
        var atadott = new AtadottMintak({
            mintavetel_datuma: request.body.datum,
            mintavetel_helye: request.body.mintavetel_helyszine,
            minta_jele: request.body.minta_szama,
            vizsgalo_laboratorium: request.body.vizsgalo_lab1,
            vizsgalt_komponensek: request.body.vizsgalt_komponensek1
        });

        atadott.save(function(err, thor) {
          if (err) return console.error(err);
          console.dir("juhhu");
        });
    }

    var szallopor = new SzalloPor({
        mintavetel_datuma: request.body.datum,
        mintavetel_helye: request.body.mintavetel_helyszine,
        minta_jele: request.body.minta_szama,
        respir_bemeres: request.body.respir_bemeres,
        respir_visszameres: request.body.respir_visszameres,
        durva_bemeres: request.body.durva_bemeres,
        durva_visszameres: request.body.durva_visszameres
    });

    szallopor.save(function(err, thor) {
      if (err) return console.error(err);
      console.dir("juhhu");
    });

    doc.render();

    var buf = doc.getZip()
                 .generate({type:"nodebuffer"});

    fs.writeFileSync(__dirname+"/output/output.docx",buf);
    response.redirect('/download');
});

app.post('/szallor', function(request, response){

    if(request.body.minta_szama_1) {
        var szallo = new SzalloRost({
            mintavetel_datuma: request.body.datum,
            mintavetel_helye: request.body.mintavetel_helyszine,
            minta_jele: request.body.minta_szama_1,
            ellenorzott_mintak: request.body.ellenorzott1
        });
    }

    if(request.body.mintavetel_gep1) {
      var gep = new GepNaplo({
        mintavetel_gep: request.body.mintavetel_gep1,
        mintavetel_datuma: request.body.datum,
        mintavetel_helye: request.body.mintavetel_helyszine,
        sorszam: request.body.sorszam1
      });

        gep.save(function(err, thor) {
            if (err) return console.error(err);
            console.dir("juhhu");
        });
    }

    response.redirect('/download');
});

app.post('/felszina', function(request, response){

    if(request.body.vizmintakod) {
        var atadott = new AtadottMintak({
            mintavetel_datuma: request.body.datum,
            mintavetel_helye: request.body.mintavetel_helyszine,
            minta_jele: request.body.vizmintakod,
            vizsgalo_laboratorium: request.body.vizsgalo_lab1,
            vizsgalt_komponensek: request.body.vizsgalt_komponensek1
        });

        atadott.save(function(err, thor) {
          if (err) return console.error(err);
          console.dir("juhhu");
        });
    }

    response.redirect('/download');
});

app.post('/ivoviz', function(request, response){
  
    if(request.body.mintak_jele) {
        var atadott = new AtadottMintak({
            mintavetel_datuma: request.body.datum,
            mintavetel_helye: request.body.mintavetel_helyszine,
            minta_jele: request.body.mintak_jele,
            vizsgalo_laboratorium: request.body.vizsgalo_lab1,
            vizsgalt_komponensek: request.body.vizsgalt_komponensek1
        });

        atadott.save(function(err, thor) {
          if (err) return console.error(err);
          console.dir("juhhu");
        });
    }
});

app.post('/szennyes', function(request, response){

    if(request.body.minta_jele) {
        var atadott = new AtadottMintak({
            mintavetel_datuma: request.body.datum,
            mintavetel_helye: request.body.mintavetel_kodja,
            minta_jele: request.body.minta_jele,
            vizsgalo_laboratorium: request.body.vizsgalo_lab1,
            vizsgalt_komponensek: request.body.vizsgalt_komponensek1
        });

        atadott.save(function(err, thor) {
          if (err) return console.error(err);
          console.dir("juhhu");
        });
    }

    doc.render();

    var buf = doc.getZip()
                 .generate({type:"nodebuffer"});

    fs.writeFileSync(__dirname+"/output/output.docx",buf);
    response.redirect('/download');
});

app.post('/szilard', function(request, response){

    if(request.body.n_minta_jele) {
        var nedvesseg = new NedvessegMintak({
            mintavetel_datuma: request.body.datum,
            mintavetel_helye: request.body.ceg_neve,
            minta_jele: request.body.n_minta_jele,
        });

        nedvesseg.save(function(err, thor) {
          if (err) return console.error(err);
          console.dir("juhhu");
        });
    }

    if(request.body.minta_jele1) {
        var atadott = new AtadottMintak({
            mintavetel_datuma: request.body.datum,
            mintavetel_helye: request.body.ceg_neve,
            minta_jele: request.body.minta_jele1,
            vizsgalo_laboratorium: request.body.vizsgalo_lab1,
            vizsgalt_komponensek: request.body.vizsgalt_komponensek1
        });

        atadott.save(function(err, thor) {
          if (err) return console.error(err);
          console.dir("juhhu");
        });
    }

    if(request.body.minta_jele1) {
        var szilard = new SzilardAnyag({
            mintavetel_datuma: request.body.datum,
            mintavetel_helye: request.body.ceg_neve,
            minta_jele: request.body.minta_jele1
        });

        szilard.save(function(err, thor) {
          if (err) return console.error(err);
          console.dir("juhhu");
        });
    }

    if(request.body.minta_jele2) {
        var szilard = new SzilardAnyag({
            mintavetel_datuma: request.body.datum,
            mintavetel_helye: request.body.ceg_neve,
            minta_jele: request.body.minta_jele2
        });

        szilard.save(function(err, thor) {
          if (err) return console.error(err);
          console.dir("juhhu");
        });
    }

    if(request.body.minta_jele3) {
        var szilard = new SzilardAnyag({
            mintavetel_datuma: request.body.datum,
            mintavetel_helye: request.body.ceg_neve,
            minta_jele: request.body.minta_jele3
        });

        szilard.save(function(err, thor) {
          if (err) return console.error(err);
          console.dir("juhhu");
        });
    }

    doc.render();

    var buf = doc.getZip()
                 .generate({type:"nodebuffer"});

    fs.writeFileSync(__dirname+"/output/output.docx",buf);
    response.redirect('/download');
})

app.post('/adabem', function(request, response){

    if(request.body.n_minta_jele) {
        var nedvesseg = new NedvessegMintak({
            mintavetel_datuma: request.body.datum,
            mintavetel_helye: request.body.ceg_neve,
            minta_jele: request.body.n_minta_jele,
        });

        nedvesseg.save(function(err, thor) {
          if (err) return console.error(err);
          console.dir("juhhu");
        });
    }

    if(request.body.minta_jele1) {
        var atadott = new AtadottMintak({
            mintavetel_datuma: request.body.datum,
            mintavetel_helye: request.body.mintavetel_helyszine,
            minta_jele: request.body.minta_jele1,
            vizsgalo_laboratorium: request.body.vizsgalo_lab1,
            vizsgalt_komponensek: request.body.vizsgalt_komponensek1
        });

        atadott.save(function(err, thor) {
          if (err) return console.error(err);
          console.dir("juhhu");
        });
    }

    if(request.body.minta_jele2) {
        var atadott = new AtadottMintak({
            mintavetel_datuma: request.body.datum,
            mintavetel_helye: request.body.mintavetel_helyszine,
            minta_jele: request.body.minta_jele2,
            vizsgalo_laboratorium: request.body.vizsgalo_lab2,
            vizsgalt_komponensek: request.body.vizsgalt_komponensek2
        });

        atadott.save(function(err, thor) {
          if (err) return console.error(err);
          console.dir("juhhu");
        });
    }

    if(request.body.minta_jele3) {
        var atadott = new AtadottMintak({
            mintavetel_datuma: request.body.datum,
            mintavetel_helye: request.body.mintavetel_helyszine,
            minta_jele: request.body.minta_jele3,
            vizsgalo_laboratorium: request.body.vizsgalo_lab3,
            vizsgalt_komponensek: request.body.vizsgalt_komponensek3
        });

        atadott.save(function(err, thor) {
          if (err) return console.error(err);
          console.dir("juhhu");
        });
    }

    doc.render();

    var buf = doc.getZip()
                 .generate({type:"nodebuffer"});

    fs.writeFileSync(__dirname+"/output/output.docx",buf);
    response.redirect('/download');
})

app.post('/adabmun', function(request, response){
    
    if(request.body.mintavetel_gep1) {
      var gep = new GepNaplo({
        mintavetel_gep: request.body.mintavetel_gep1,
        mintavetel_datuma: request.body.datum,
        mintavetel_helye: request.body.mintavetel_helyszine,
        sorszam: request.body.sorszam1
      });

        gep.save(function(err, thor) {
            if (err) return console.error(err);
            console.dir("juhhu");
        });
    }

     if(request.body.minta_jele1) {
        var atadott = new AtadottMintak({
            mintavetel_datuma: request.body.datum,
            mintavetel_helye: request.body.mintavetel_helyszine,
            minta_jele: request.body.minta_jele1,
            vizsgalo_laboratorium: request.body.vizsgalo_lab1,
            vizsgalt_komponensek: request.body.vizsgalt_komponensek1
        });

        atadott.save(function(err, thor) {
          if (err) return console.error(err);
          console.dir("juhhu");
        });
    }
});

app.post('/fustgaz', function(request, response){

    if(request.body.n_minta_jele1) {
        var nedvesseg = new NedvessegMintak({
            mintavetel_datuma: request.body.datum,
            mintavetel_helye: request.body.ceg_neve,
            minta_jele: request.body.n_minta_jele1,
        });

        nedvesseg.save(function(err, thor) {
          if (err) return console.error(err);
          console.dir("juhhu");
        });
    }
})

app.route('/szallopor/:Id').get(function(req, res) {
  res.render('doc-vegoldal', {docs: req.doc});
});

app.param('Id', function(req, res, next, id) {
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
});

app.route('/szilard/:Id').get(function(req, res) {
  res.render('szilard-vegoldal', {docs: req.doc});
});

app.param('Id', function(req, res, next, id) {
  SzilardAnyag.findOne({
    _id:id
  }, function(err, doc) {
    if(err) {
      return next(err);
    } else {
      req.doc = doc;
      next();
    }
  });
});

app.route('/nedvesseg/:Id').get(function(req, res) {
  res.render('nedves-vegoldal', {docs: req.doc});
});

app.param('Id', function(req, res, next, id) {
  NedvessegMintak.findOne({
    _id:id
  }, function(err, doc) {
    if(err) {
      return next(err);
    } else {
      req.doc = doc;
      next();
    }
  });
});

var server = app.listen(3001, 'localhost'); */
