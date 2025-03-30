var express = require('express');
var router = express.Router();
const CONN = require('../../db/MySQL/Connection');
const Query = require('../../db/MySQL/Query/expense/TransactionHistory');

router.get('/', function(req, res) {
  let [tTypeOrg, tType, dFrom, dTo] = [
    `${req.query.Transaction}`,
    `%${req.query.Transaction}%`,
    `${req.query.DateFrom}`,
    `${req.query.DateTo}`
  ];

  CONN.query(
    Query['getTransactionHistoryDataForChart'].query, 
    [
      tTypeOrg, tTypeOrg, tType, tType, tTypeOrg, tType, tType, tTypeOrg, 
      tTypeOrg, tTypeOrg, tTypeOrg, tType, tTypeOrg,
      tTypeOrg, tTypeOrg, tTypeOrg, tType, tTypeOrg,
      dFrom, dTo
    ],
    (err, rows, fields) => {
      if(err) console.log(err);
      res.send(rows);
    }
  );
});

module.exports = router;
