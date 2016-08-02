var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var nodemailer= require('nodemailer');
var connection  = require('express-myconnection');
var passport = require('passport');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var session = require('express-session');

var flash = require('connect-flash');
var expressValidator = require('express-validator');

var routes = require('./routes/index');
var routes_admin = require('./routes/index-admin');
var users = require('./routes/users');
var users_ad = require('./routes/users_ad');
var catalog = require('./routes/catalog');
var prod_detail = require('./routes/prod_detail');
var cart = require('./routes/cart');

var checkout = require('./routes/checkout');
var orders = require('./routes/orders');
var mail = require('./routes/mail');
var tamanho = require('./routes/tamanhos');
var constants = require('./constants/constants.js');
var queries = require('./constants/queries.js');


//Admin
var crud_prod = require('./routes/admin/crud_prod');
var gestao_entregas = require('./routes/admin/gestao_entregas');

var app = express();

// connection with db
app.use(
   connection(mysql,{
     host: constants.db_param.host,
     user: constants.db_param.user,
     password : constants.db_param.password,
     port : constants.db_param.port, //port mysql
     database: constants.db_param.database,
     multipleStatements: true
   },'request')
);

var transporter = nodemailer.createTransport('smtps://systennisltda%40gmail.com:systennis123@smtp.gmail.com');
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

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    }
  }
}));

app.use(expressValidator({
  customValidators: {
    isEmailORCpfAvailable: function(email_or_cpf) {
      return new Promise(function(resolve, reject) {

      var con = mysql.createConnection(
      {
        host: constants.db_param.host,
        user: constants.db_param.user,
        password : constants.db_param.password,
        port : constants.db_param.port, //port mysql
        database: constants.db_param.database
      });

      con.query(queries.queries.is_registration_available(email_or_cpf),[],
        function(err, result){
          if(err) throw err;

          console.log(result[0].has_registration);

          if(eval(result[0].has_registration))
          {
            reject(true);
          }
          else
          {
            resolve(true);
          }

        });
      });
      }
  }
}));

app.use(expressValidator({
  customValidators: {
    isEmailORCpfAvailableFunc: function(email_or_cpf) {
      return new Promise(function(resolve, reject) {

      var con = mysql.createConnection(
      {
        host: constants.db_param.host,
        user: constants.db_param.user,
        password : constants.db_param.password,
        port : constants.db_param.port, //port mysql
        database: constants.db_param.database
      });

      con.query(queries.queries.is_registration_available_func(email_or_cpf),[],
        function(err, result){
          if(err) throw err;

          console.log(result[0].has_registration);

          if(eval(result[0].has_registration))
          {
            reject(true);
          }
          else
          {
            resolve(true);
          }

        });
      });
      }
  }
}));

// app.use(expressJWT({ secret: 'secret123' }).unless({ path: }))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(session({secret: "panda123", resave: false, saveUninitialized: true}));
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'page')));

app.use('/', routes);
app.use('/mail', mail);
app.use('/index', routes);
app.use('/admin', routes_admin);
app.use('/users', users);
app.use('/users_ad', users_ad);
app.use('/catalog', catalog);
app.use('/prod_detail', prod_detail);
app.use('/cart', cart);
app.use('/checkout', checkout);
app.use('/orders', orders);
app.use('/tamanho', tamanho);


//Admin
app.use('/crud_prod', crud_prod);
app.use('/gestao_entregas', gestao_entregas);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

app.use(function(err, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

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
