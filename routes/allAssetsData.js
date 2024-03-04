var express = require('express');
var router = express.Router();
const CONN = require('../db/MySQL/Connection');
const Query = require('../db/MySQL/Query/header/forAllAssetsToSearch');

router.get('/', function(req, res) {
  CONN.query(
    Query['getAllAssetsData'].query, 
    (err, rows, fields) => {
      if(err) console.log(err);
      res.send(rows);
    }
  );
});

module.exports = router;