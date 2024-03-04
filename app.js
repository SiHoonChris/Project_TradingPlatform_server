var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// init
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// Balance Sheets
var BSdataPerYear = require('./routes/financial-statements/balance-sheets/getBSdataPerYear');
var BSdataPerQuarter = require('./routes/financial-statements/balance-sheets/getBSdataPerQuarter');
var BSdataPerMonth = require('./routes/financial-statements/balance-sheets/getBSdataPerMonth');
// Income Statements
var ISdataPerYear = require('./routes/financial-statements/income-statements/getISdataPerYear.js');
var ISdataPerQuarter = require('./routes/financial-statements/income-statements/getISdataPerQuarter.js');
var ISdataPerMonth = require('./routes/financial-statements/income-statements/getISdataPerMonth.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// init
app.use('/', indexRouter);
app.use('/users', usersRouter);
// Balance Sheets
app.use('/balance-sheets/per-year', BSdataPerYear);
app.use('/balance-sheets/per-quarter', BSdataPerQuarter);
app.use('/balance-sheets/per-month', BSdataPerMonth);
// Income Statements
app.use('/income-statements/per-year', ISdataPerYear);
app.use('/income-statements/per-quarter', ISdataPerQuarter);
app.use('/income-statements/per-month', ISdataPerMonth);


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
