var express = require('express'),
  morgan = require('morgan'),
  hbs = require('express-hbs'),
  compress = require('compression'),
  bodyParser  = require('body-parser'),
  methodOverride = require('method-override'),
  config = require('./config');
  
module.exports = function() {
  var app = express();

  if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  app.use(express.static('./public'));
  app.use(express.static('./views'));
  app.use(express.static('./output', {
    setHeaders: function(res, path) {
        res.set('Content-Disposition', 'attachment; filename="output.docx"');
        res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    }
  }));

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());
  app.use(methodOverride());

  app.set('view engine', 'hbs');
  app.engine('hbs', hbs.express3({  
    defaultLayout: 'views/layouts/main.hbs',
    partialsDir: 'views',
    layoutsDir: 'views'
  }));

  require('../app/routes/index.route.js')(app);
  require('../app/routes/document.route.js')(app);
  require('../app/routes/company.route.js')(app);
  require('../app/routes/szures.route.js')(app);

  return app;
};
