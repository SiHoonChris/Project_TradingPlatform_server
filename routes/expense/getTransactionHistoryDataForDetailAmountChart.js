var express = require('express');
var router = express.Router();
const CONN = require('../../db/MySQL/Connection');
const Query = require('../../db/MySQL/Query/expense/TransactionHistory');

router.get('/', function(req, res) {
  let [eMin, eMax, dFrom, dTo] = [
    `${Number(req.query.ExpenseMin)}`,
    `${Number(req.query.ExpenseMax)}`,
    `${req.query.DateFrom}`,
    `${req.query.DateTo}`
  ];

  CONN.query(
    Query['getTransactionHistoryDataForDetailAmountChart'].query, 
    [
        eMin, eMax, eMin, eMax, eMin, eMax, eMin, eMax, eMin, eMax, dFrom, dTo, 
        eMin, eMax, dFrom, dTo, 
        eMin, eMax, dFrom, dTo, // 매수
        eMin, eMax, eMin, eMax, eMin, eMax, eMin, eMax, eMin, eMax, dFrom, dTo, 
        eMin, eMax, dFrom, dTo, 
        eMin, eMax, dFrom, dTo, // 매도
        eMin, eMax, eMin, eMax, eMin, eMax, eMin, eMax, eMin, eMax, dFrom, dTo, 
        eMin, eMax, dFrom, dTo, 
        eMin, eMax, dFrom, dTo, // 입금
        eMin, eMax, eMin, eMax, eMin, eMax, eMin, eMax, eMin, eMax, dFrom, dTo, 
        eMin, eMax, dFrom, dTo, 
        eMin, eMax, dFrom, dTo, // 출금
        eMin, eMax, eMin, eMax, eMin, eMax, eMin, eMax, eMin, eMax, dFrom, dTo, 
        eMin, eMax, dFrom, dTo, 
        eMin, eMax, dFrom, dTo // 배당
    ],
    (err, rows, fields) => {
      if(err) console.log(err);
      res.send(rows);
    }
  );
});

module.exports = router;
