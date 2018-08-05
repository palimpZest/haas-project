var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const methodOverride = require('method-override');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', true);
app.set('trust proxy', 1); // trust first proxy

app.use(methodOverride('_method'));

app.use(
  session({
    store: new FileStore({
      path: path.join(__dirname, '/tmp'),
      encrypt: true
    }),
    secret: 'safesecret',
    resave: true,
    saveUninitialized: true,
    name: 'mysession'
  })
);

console.log('session');
console.log(session);
// session.connected = true;
// console.log(session.connected);

app.use('/', index);
app.use('/users', users);

// app.use('/api', function(req, res, next) {
//   req.session.connected = true;
//   if (req.session.connected) {
//     return next();
//   } else {
//     return res.redirect('/login');
//   }
// });

app.use('/logout', (req, res) => {
  if (req.session.connected) {
    req.session.destroy();
    res.render('index', { disconnect: "You've been disconnected" });
  } else {
    res.redirect('/login');
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
