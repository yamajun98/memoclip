var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var userRouter = require('./routes/user');
var tagsRouter = require('./routes/tag');
var articleRouter = require('./routes/article');
var loginRouter = require('./routes/login');
var chatRouter = require('./routes/chat');
var userpageRouter = require('./routes/userpage');
var adminRouter = require('./routes/admin/admin');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/image', express.static('/image'));

app.use('/user', userRouter);
app.use('/tag', tagsRouter);
app.use('/article', articleRouter);
app.use('/login', loginRouter);
app.use('/chat', chatRouter);
app.use('/userpage', userpageRouter);
app.use('/admin', adminRouter);

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
