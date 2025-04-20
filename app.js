var createError  = require('http-errors');
var express      = require('express');
var path         = require('path');
var cookieParser = require('cookie-parser');
var logger       = require('morgan');

/* init */
var indexRouter = require('./routes/index');
/* [ HOME ] */
var GetWatchList = require('./routes/watchList_route'); // Watch-List
var GetFxList = require('./routes/fxList_route'); // Fx-List
var GetPortfolioData = require('./routes/inPortfolio_route'); // In-Portfolio
/* [ EXPENSE ] */
var TransactionFirstDay = require('./routes/expense/getTransactionFirstDay') // First Date Of Transaction (Selectbox - option)
var TransactionTypeList = require('./routes/expense/getTransactionTypeList') // Transaction Tyep List (Selectbox)
var TransactionHistoryDataForChart = require('./routes/expense/getTransactionHistoryDataForChart'); // Scatterplot Chart
var TransactionHistoryDataForTable = require('./routes/expense/getTransactionHistoryDataForTable'); // Table (Bottom-Left)
var TransactionHistoryDataForDetailFrequencyChart = require('./routes/expense/getTransactionHistoryDataForDetailFrequencyChart'); // Table (Bottom-Right, Left)
var TransactionHistoryDataForDetailAmountChart = require('./routes/expense/getTransactionHistoryDataForDetailAmountChart'); // Table (Bottom-Right, Right)


/* 아래는 수정 필요 */
// Balance Sheets
var BSdataPerYear = require('./routes/financial-statements/balance-sheets/getBSdataPerYear');
var BSdataPerQuarter = require('./routes/financial-statements/balance-sheets/getBSdataPerQuarter');
var BSdataPerMonth = require('./routes/financial-statements/balance-sheets/getBSdataPerMonth');
// Income Statements
var ISdataPerYear = require('./routes/financial-statements/income-statements/getISdataPerYear');
var ISdataPerQuarter = require('./routes/financial-statements/income-statements/getISdataPerQuarter');
var ISdataPerMonth = require('./routes/financial-statements/income-statements/getISdataPerMonth');
// Trade
var HistoricalPriceData = require('./routes/trade/getHistoricalPriceData');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* init */
app.use('/', indexRouter);
/* [ HOME ] */
app.use('/getWatchList', GetWatchList); // Watch-List
app.use('/getFxList', GetFxList); // FX-List
app.use('/getPortfolioData', GetPortfolioData); // In-Portfolio
/* [ EXPENSE ] */
app.use('/getTransactionFirstDay', TransactionFirstDay); // First Date Of Transaction (Selectbox - option)
app.use('/getTransactionTypeList', TransactionTypeList); // Transaction Tyep List (Selectbox)
app.use('/getTransactionHistoryDataForChart', TransactionHistoryDataForChart); // Scatterplot Chart
app.use('/getTransactionHistoryDataForTable', TransactionHistoryDataForTable); // Table (Bottom-Left)
app.use('/getTransactionHistoryDataForDetailFrequencyChart', TransactionHistoryDataForDetailFrequencyChart); // Table (Bottom-Right, Left)
app.use('/getTransactionHistoryDataForDetailAmountChart', TransactionHistoryDataForDetailAmountChart); // Table (Bottom-Right, Right)


/* 아래는 수정 필요 */
// Balance Sheets
app.use('/balance-sheets/per-year', BSdataPerYear);
app.use('/balance-sheets/per-quarter', BSdataPerQuarter);
app.use('/balance-sheets/per-month', BSdataPerMonth);
// Income Statements
app.use('/income-statements/per-year', ISdataPerYear);
app.use('/income-statements/per-quarter', ISdataPerQuarter);
app.use('/income-statements/per-month', ISdataPerMonth);
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
