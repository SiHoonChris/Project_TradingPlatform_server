var express = require('express');
var router = express.Router();
const CONN = require('../../../db/MySQL/Connection');
const BS = require('../../../db/MySQL/Query/financial-statements/forBalanceSheets');

router.get('/', function(req, res) {
  CONN.query(
    BS['getBSdataPerMonth'].query, [req.query.YEAR, req.query.QUARTER, req.query.QUARTER],
    (err, rows, fields) => {
      if(err) console.log(err);
      res.send(rows);
  });
});

module.exports = router;
