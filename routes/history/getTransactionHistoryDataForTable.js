var express = require('express');
var router = express.Router();
const CONN = require('../../db/MySQL/Connection');
const Query = require('../../db/MySQL/Query/history/forTransactionHistory');

router.get('/', function(req, res) {
  let [tD, eMin, eMax, df, dt] = [
    `%${req.query.Transaction}%`, 
    `${Number(req.query.ExpenseMin)}`, 
    `${Number(req.query.ExpenseMax)}`, 
    `${req.query.DateFrom}`, 
    `${req.query.DateTo}` 
  ];

  CONN.query(
    Query['getTransactionHistoryDataForTable'].query, 
    [tD, tD, eMin, eMax, df, dt, `${dt}%`], 
    (err, rows, fields) => {err ? console.log(err) : res.send(rows)}
  );
});

module.exports = router;
