var express    = require('express');
var router     = express.Router();
var Portfolio  = require('../../db/MongoDB/DB/portfolio/forPortfolios');
const mongoose = require('mongoose');

router.post('/', function(req, res) {
    const paramObj = req.body.params;
    console.log(paramObj);

    mongoose.connect('mongodb://localhost:27017/trading-platform', {dbName: 'PortfolioDB'})
        .then(connected => {
            Portfolio.create(paramObj)
                .then(result => res.send("Created"))
                .catch(err => console.log(err))
                .finally(() => mongoose.connection.close());
        })
        .catch(err => console.error(err));
});

module.exports = router;
