var express = require('express');
var router = express.Router();
const CONN = require('../../db/MySQL/Connection');
const Query = require('../../db/MySQL/Query/expense/TransactionHistory');

router.get('/', function(req, res) {
  CONN.query(
    Query['getTransactionHistoryDataForChart'].query, 
    [
      `%${req.query.Transaction}%`, `%${req.query.Transaction}%`,
      req.query.Transaction, `%${req.query.Transaction}%`,
      req.query.Transaction, `%${req.query.Transaction}%`,
      req.query.DateFrom, req.query.DateTo
    ],
    (err, rows, fields) => {
      if(err) console.log(err);
      res.send(rows);
    }
  );
});

module.exports = router;
