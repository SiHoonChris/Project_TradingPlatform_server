var express = require('express');
var router = express.Router();
const CONN = require('../../db/MySQL/Connection');
const Query = require('../../db/MySQL/Query/expense/TransactionHistory');

router.get('/', function(req, res) {
  CONN.query(
    Query['getTransactionFirstDay'].query, 
    (err, rows, fields) => {
      if(err) console.log(err);

      const inputDate = new Date(rows[0].firstDate);
      const localDate = new Date(inputDate.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
      localDate.setHours(0, 0, 0, 0);

      const result = {
        Year: localDate.getFullYear(),
        Month: localDate.getMonth() + 1,
        Date: localDate.getDate()
      };

      res.send(result);
    }
  );
});

module.exports = router;
