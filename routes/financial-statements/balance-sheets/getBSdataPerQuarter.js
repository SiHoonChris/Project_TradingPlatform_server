var express = require('express');
var router = express.Router();
const CONN = require('../../../db/MySQL/Connection');
const BS = require('../../../db/MySQL/Query/financial-statements/forBalanceSheets');

router.get('/', function(req, res) {
  CONN.query(
    BS['getBSdataPerQuarter'].query, [req.query.YEAR], 
    (err, rows, fields) => {
      if(err) console.log(err);
      console.log(req.query.YEAR);
      res.send(rows);
    }
  );
});

module.exports = router;
