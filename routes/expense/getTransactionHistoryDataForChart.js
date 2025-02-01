var express = require('express');
var router = express.Router();
const CONN = require('../../db/MySQL/Connection');
const Query = require('../../db/MySQL/Query/expense/TransactionHistory');

router.get('/', function(req, res) {
  // let [t, df, dt] = [
  //   `%${req.query.Transaction}%`, 
  //   `${req.query.DateFrom}`, 
  //   `${req.query.DateTo}`
  // ];

  CONN.query(
    Query['getTransactionHistoryDataForChart'].query, 
    // [t, t, df, dt, `${dt}%`],
    (err, rows, fields) => {
      if(err) console.log(err);
      res.send(rows);
    }
  );
});

module.exports = router;
