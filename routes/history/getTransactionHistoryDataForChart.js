var express = require('express');
var router = express.Router();
const CONN = require('../../db/MySQL/Connection');
const Query = require('../../db/MySQL/Query/history/forTransactionHistory');

router.get('/', function(req, res) {
  let [tD, df, dt] = [
    `%${req.query.Transaction}%`, 
    `${req.query.DateFrom}`, 
    `${req.query.DateTo}`
  ];

  CONN.query(
    Query['getTransactionHistoryDataForChart'].query, 
    [tD, tD, df, dt, `${dt}%`],
    (err, rows, fields) => {err ? console.log(err) : res.send(rows)}
  );
});

module.exports = router;
