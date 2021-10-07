var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session')
var logger = require('morgan');
var passport = require('passport');
var cons = require('consolidate');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(cookieSession({
  name: 'twitter-auth-session',
  keys: ['key1', 'key2']
}))

app.use(cookieSession({
  name: 'github-auth-session',
  keys: ['key1', 'key2']
}))

app.use(cookieSession({
  name: 'gitlab-auth-session',
  keys: ['key1', 'key2']
}))

app.use(cookieSession({
  name: 'facebook-auth-session',
  keys: ['key1', 'key2']
}))

app.use(cookieSession({
  name: 'instagram-auth-session',
  keys: ['key1', 'key2']
}))


app.use(passport.initialize());

require('./routes/authenticate');

//google

app.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

app.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login'
}), (req, res) => {

  res.redirect('/');
})

//twitter

app.get('/twitter', passport.authenticate('twitter'));

app.get('/error', (req, res) => res.send(' Error'))

app.get('/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: '/error'
  }),
  function (req, res) {
    res.redirect('/');
  });

//git hub

app.get('/github', passport.authenticate('github', {
  scope: ['user:email']
}));

app.get('/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    res.redirect('/');
  });

//gitlab

app.get('/gitlab',
  passport.authenticate('gitlab', {
    scope: ['api']
  }));


app.get('/gitlab/callback',
  passport.authenticate('gitlab', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    res.redirect('/');
  });

//facebook

app.get('/facebook', passport.authenticate('facebook'));

app.get('/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/login' }),
function(req, res) {
   res.redirect('/');
});

// instagram

app.get('/instagram', passport.authenticate('instagram',{
scope:["followers"]}))

app.get('/instagram/callback', 
  passport.authenticate('instagram', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;