var express    = require('express');
var router     = express.Router();
var Portfolio  = require('../../db/MongoDB/DB/portfolio/forPortfolios');
const mongoose = require('mongoose');

router.post('/', function(req, res) {
    mongoose.connect('mongodb://localhost:27017/trading-platform', {dbName: 'PortfolioDB'})
        .then(connected => {
            if(Object.values(req.body.params).length !== 0) {
                for(const e of Object.values(req.body.params)) {
                    Portfolio.findByIdAndDelete(e);
                    console.log(e);
                }
                res.send('Deleted');
            }
        })
        .catch(err => console.error(err))
        .finally(() => mongoose.connection.close());
});

module.exports = router;
