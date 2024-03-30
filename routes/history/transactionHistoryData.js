var express = require('express');
var router = express.Router();
const CONN = require('../../db/MySQL/Connection');
const Query = require('../../db/MySQL/Query/history/forTransactionHistory');

router.get('/', function(req, res) {
  let opt, inp, df, dt;
  [opt, inp, df, dt] = [`%${req.query.Option}%`, `${req.query.Input}%`, `${req.query.DateFrom}%`, `${req.query.DateTo}%`];

  CONN.query(
    Query['getTransactionHistory'].query, [opt, opt, inp, df, dt, df],
    (err, rows, fields) => {
      if(err) console.log(err);
      res.send(rows);
  });
});

module.exports = router;
