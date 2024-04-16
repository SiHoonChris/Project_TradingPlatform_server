var express    = require('express');
var router     = express.Router();
var Portfolio  = require('../../db/MongoDB/DB/portfolio/forPortfolios');
const mongoose = require('mongoose');

router.post('/', function(req, res) {
    const paramArr = req.body.params;
    
    if(paramArr.length !== 0) {
        mongoose.connect('mongodb://localhost:27017/trading-platform', {dbName: 'PortfolioDB'})
            .then(connected => Promise.all(paramArr.map(id => Portfolio.findByIdAndDelete(id))))
            .then(finished => {
                mongoose.connection.close();
                res.send('Deleted');
            })
            .catch(err => console.error(err))
    }
});

module.exports = router;
