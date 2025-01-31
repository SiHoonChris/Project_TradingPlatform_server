var express = require('express');
var router = express.Router();
const CONN = require('../db/MySQL/Connection');
const Query = require('../db/MySQL/Query/watchList_query');

router.get('/', function(req, res) {
  CONN.query(
    Query['getWatchList'].query, 
    (err, rows, fields) => {
      if(err) console.log(err);
      res.send(rows);
    }
  );
});

module.exports = router;
