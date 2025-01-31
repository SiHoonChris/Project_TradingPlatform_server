var createError  = require('http-errors');
var express      = require('express');
var path         = require('path');
var cookieParser = require('cookie-parser');
var logger       = require('morgan');

var indexRouter = require('./routes/index'); // init
var GetWatchList = require('./routes/watchList_route'); // [ Home ] Watch-List
var GetFxList = require('./routes/fxList_route'); // [ Home ] Fx-List
var GetPortfolioData = require('./routes/inPortfolio_route'); // [ Home ] In-Portfolio

/* 아래는 수정 필요 */
// Balance Sheets
var BSdataPerYear = require('./routes/financial-statements/balance-sheets/getBSdataPerYear');
var BSdataPerQuarter = require('./routes/financial-statements/balance-sheets/getBSdataPerQuarter');
var BSdataPerMonth = require('./routes/financial-statements/balance-sheets/getBSdataPerMonth');
// Income Statements
var ISdataPerYear = require('./routes/financial-statements/income-statements/getISdataPerYear');
var ISdataPerQuarter = require('./routes/financial-statements/income-statements/getISdataPerQuarter');
var ISdataPerMonth = require('./routes/financial-statements/income-statements/getISdataPerMonth');
// Transaction History
var TransactionHistoryDataForChart = require('./routes/history/getTransactionHistoryDataForChart'); /* TransactionHistory.sql */
var TransactionHistoryDataForTable = require('./routes/history/getTransactionHistoryDataForTable'); /* TransactionHistory.sql */
var ExpenseSumForTable = require('./routes/history/getExpenseSumForTable'); /* TransactionHistory.sql */
// Portfolios 포트폴리오를 새롭게 만들거나 수정하는 작업은 없을 것. 아래 코드 삭제 필요
var PortfolioData = require('./routes/portfolio/getPortfolioData');
var RemovePortfolio = require('./routes/portfolio/removePortfolio');
var GetClosePriceData = require('./routes/portfolio/getClosePriceData');
var GetClosePriceDataForEval = require('./routes/portfolio/getClosePriceDataForEval');
var MakeNewPortfolio = require('./routes/portfolio/makeNewPortfolio');
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

app.use('/', indexRouter); // init
app.use('/getWatchList', GetWatchList); // [ Home ] Watch-List
app.use('/getFxList', GetFxList); // [ Home ] FX-List
app.use('/getPortfolioData', GetPortfolioData); // [ Home ] In-Portfolio


/* 아래는 수정 필요 */
// Balance Sheets
app.use('/balance-sheets/per-year', BSdataPerYear);
app.use('/balance-sheets/per-quarter', BSdataPerQuarter);
app.use('/balance-sheets/per-month', BSdataPerMonth);
// Income Statements
app.use('/income-statements/per-year', ISdataPerYear);
app.use('/income-statements/per-quarter', ISdataPerQuarter);
app.use('/income-statements/per-month', ISdataPerMonth);

// Get Transaction History For Creating Scatterplot Chart
app.use('/getTransactionHistoryDataForChart', TransactionHistoryDataForChart);
// Get Transaction History After Brushing on the Scatterplot Chart
app.use('/getTransactionHistoryDataForTable', TransactionHistoryDataForTable);
// Get Expense Sum As The Table has been created
app.use('/getExpenseSumForTable', ExpenseSumForTable);

// Portfolio Datas
app.use('/portfolio/getPortfolioData', PortfolioData);
// Remove Portfolios
app.use('/portfolio/removePortfolios', RemovePortfolio);
// Get The Latest Close-Price of Assets, for Adding New Asset In New Portfolio
app.use('/portfolio/addAsset', GetClosePriceData);
// Get The Latest Close-Prices of Assets, for Evaluating Portfolio's current rate of return
app.use('/portfolio/getCurrentPrices', GetClosePriceDataForEval);
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
