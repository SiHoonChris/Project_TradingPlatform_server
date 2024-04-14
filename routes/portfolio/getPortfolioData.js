var express    = require('express');
var router     = express.Router();
var Portfolio  = require('../../db/MongoDB/DB/portfolio/forPortfolios');
const mongoose = require('mongoose');

router.get('/', function(req, res) {
    mongoose.connect('mongodb://localhost:27017/trading-platform', {dbName: 'PortfolioDB'})
        .then(connected => {
            Portfolio.find({})
                .then(resultData => res.send(resultData))
                .catch(err => console.log(err))
                .finally(() => mongoose.connection.close());
        })
        .catch(err => console.error(err));
});

module.exports = router;
