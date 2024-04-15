var express    = require('express');
var router     = express.Router();
var Portfolio  = require('../../db/MongoDB/DB/portfolio/forPortfolios');
const mongoose = require('mongoose');

router.post('/', function(req, res) {
    const paramArr = req.body.params;
    if(paramArr.length !== 0) {
        mongoose.connect('mongodb://localhost:27017/trading-platform', {dbName: 'PortfolioDB'})
            .then(connected => { 
                for(const i in paramArr) {
                    Portfolio.findByIdAndDelete(paramArr[i])
                        .then(result => {
                            i === paramArr.length-1 &&
                            mongoose.connection.close()
                        })
                        .catch(err => console.log(err));
                }
                res.send('Deleted')
            })
            .catch(err => console.error(err))
    }
});

module.exports = router;
