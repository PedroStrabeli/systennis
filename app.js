var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var connection  = require('express-myconnection');

var routes = require('./routes/index');
var users = require('./routes/users');
var catalog = require('./routes/catalog');
var prod_detail = require('./routes/prod_detail');
var cart = require('./routes/cart');
var checkout = require('./routes/checkout');
var mail = require('./routes/mail');
var constants = require('./constants/constants.js')

//CRUD produto
var cadastro_prod = require('./routes/cadastro_prod');

// var products = require('./routes/products');

var app = express();

// connection with db
app.use(
   connection(mysql,{
     host: constants.db_param.host,
     user: constants.db_param.user,
     password : constants.db_param.password,
     port : constants.db_param.port, //port mysql
     database: constants.db_param.database
   },'request')
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));

//app.set('js',path.join(__dirname, 'js'));
// app.set('controller', path.join(__dirname, 'controller'));

app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'page')));


app.use('/', routes);
app.use('/index', routes);
app.use('/users', users);
app.use('/catalog', catalog);
app.use('/prod_detail', prod_detail);
app.use('/cart', cart);
app.use('/checkout', checkout);
app.use('/mail', mail);

//CRUD produto
app.use('/cadastro_prod', cadastro_prod);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
