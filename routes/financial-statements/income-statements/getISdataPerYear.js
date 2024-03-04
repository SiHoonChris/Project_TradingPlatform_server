var express = require('express');
var router = express.Router();
const CONN = require('../../../db/MySQL/Connection');
const BS = require('../../../db/MySQL/Query/financial-statements/forIncomeStatements');

router.get('/', function(req, res) {
  CONN.query(
    BS['getISdataPerYear'].query, 
    (err, rows, fields) => {
      if(err) console.log(err);
      res.send(rows);
    }
  );
});

module.exports = router;
