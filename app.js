var createError = require('http-errors');
var express = require('express');
var path = require('path');
var hbs = require('express-handlebars')
const db = require('./config/connection')
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var hotelRouter = require('./routes/hotel')
var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
const session = require('express-session')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs',hbs({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layout/',partialsDir:__dirname+'/views/partials/'}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"secret key",resave: false,saveUninitialized: true,cookie:{maxAge:600000}}))

//Database connection
db.connect((err) => {
  if(err) console.log('Connection error'+err)
  else  console.log('Databse connected')
})   

app.use('/', userRouter);
app.use('/admin', adminRouter);
app.use('/hotel',hotelRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
