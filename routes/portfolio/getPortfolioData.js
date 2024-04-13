var express = require('express');
var router = express.Router();
var Portfolio = require('../../db/MongoDB/DB/portfolio/forPortfolios');

router.get('/', function(req, res) {
    Portfolio.find({})
        .then(resultData => res.send(resultData))
        .catch(err => console.log(err))
});

module.exports = router;
