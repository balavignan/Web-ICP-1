var http = require('http'),
    path = require('path'),
    // methods = require('methods'),
    express = require('express'),
    bodyParser = require('body-parser'),
    // session = require('express-session'),
    cors = require('cors'),
    mongoose = require('mongoose');

var isProduction = process.env.NODE_ENV === 'production';

// Create global app object
var app = express();


app.use(cors());

// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(require('method-override')());
// app.use(express.static(__dirname + '/public'));

// app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

/*if (!isProduction) {
  app.use(errorhandler());
}*/

if(isProduction){
  mongoose.connect('mongodb://anvesh:test@ds133856.mlab.com:33856/jobnut-server',(err,db)=>{
    if(!err)
    {
      console.log('Database connected successfully');
    }
  });
  mongoose.set('debug', true);
} else {
  mongoose.connect('mongodb://anvesh:test@ds133856.mlab.com:33856/jobnut-server',(err,db)=>{
    if(!err)
    {
      console.log('Database connected successfully');
    }
  });
  mongoose.set('debug', true);
}

require('./models/applicant');
require('./models/hr');
require('./models/posts');
// require('./config/passport');

app.use(require('./routes'));
// app.use(require('./socket/socket'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {

  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
        message: err.message,
        error: err
      }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
      message: err.message,
      error: {}
    }});
});

// finally, let's start our server...
var server = app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});
