var createError  = require('http-errors');
var express      = require('express');
var path         = require('path');
var cookieParser = require('cookie-parser');
var logger       = require('morgan');

// init
var indexRouter            = require('./routes/index');
// Balance Sheets
var BSdataPerYear          = require('./routes/financial-statements/balance-sheets/getBSdataPerYear');
var BSdataPerQuarter       = require('./routes/financial-statements/balance-sheets/getBSdataPerQuarter');
var BSdataPerMonth         = require('./routes/financial-statements/balance-sheets/getBSdataPerMonth');
// Income Statements
var ISdataPerYear          = require('./routes/financial-statements/income-statements/getISdataPerYear');
var ISdataPerQuarter       = require('./routes/financial-statements/income-statements/getISdataPerQuarter');
var ISdataPerMonth         = require('./routes/financial-statements/income-statements/getISdataPerMonth');
// All Assets
var AllAssetsData          = require('./routes/allAssetsData');
// Global Indexes And FX Rate
var GlobalIndexesData      = require('./routes/globalIndexesData');
// Transaction History
var TransactionHistoryData = require('./routes/history/transactionHistoryData');
// Portfolios
var PortfolioData          = require('./routes/portfolio/getPortfolioData');
var RemovePortfolio        = require('./routes/portfolio/removePortfolio');
var GetClosePriceData      = require('./routes/portfolio/getClosePriceData');
var MakeNewPortfolio       = require('./routes/portfolio/makeNewPortfolio');
// Trade
var HistoricalPriceData    = require('./routes/trade/getHistoricalPriceData');


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
// Balance Sheets
app.use('/balance-sheets/per-year', BSdataPerYear);
app.use('/balance-sheets/per-quarter', BSdataPerQuarter);
app.use('/balance-sheets/per-month', BSdataPerMonth);
// Income Statements
app.use('/income-statements/per-year', ISdataPerYear);
app.use('/income-statements/per-quarter', ISdataPerQuarter);
app.use('/income-statements/per-month', ISdataPerMonth);
// All Assets
app.use('/getAllAssetsData', AllAssetsData);
// Global Indexes And FX Rate
app.use('/getGlobalIndexesData', GlobalIndexesData);
// Transaction History
app.use('/getTransactionHistory', TransactionHistoryData);
// Portfolio Datas
app.use('/portfolio/getPortfolioData', PortfolioData);
// Remove Portfolios
app.use('/portfolio/removePortfolios', RemovePortfolio);
// Get The Latest Close-Price of Assets, for Adding New Asset In New Portfolio
app.use('/portfolio/addAsset', GetClosePriceData);
// Make New Portfolio
app.use('/portfolio/makeNewPortfolio', MakeNewPortfolio);
// get Historical Price Data
app.use('/trade/getHistoricalPriceData', HistoricalPriceData);

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
