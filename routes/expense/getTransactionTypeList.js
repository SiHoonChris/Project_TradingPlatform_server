var express = require('express');
var router = express.Router();
const CONN = require('../../db/MySQL/Connection');
const Query = require('../../db/MySQL/Query/expense/TransactionHistory');

router.get('/', function(req, res) {
  CONN.query(
    Query['getTransactionTypeList'].query, 
    (err, rows, fields) => {
      if(err) console.log(err);
      res.send(rows);
    }
  );
});

module.exports = router;
