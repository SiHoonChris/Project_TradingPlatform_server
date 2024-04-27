var express    = require('express');
var router     = express.Router();
const mongoose = require('mongoose');
const tradeSchema = new mongoose.Schema({
    Date : Date,
    Open : Number,
    High : Number,
    Low  : Number,
    Close: Number
});

router.get('/', function(req, res) {
    const Trade = mongoose.model('HistoricalPriceData', tradeSchema, req.query.TICKER);

    mongoose.connect('mongodb://localhost:27017/trading-platform', {dbName: 'UsMarket'}) // dbName 동적 할당
        .then(connected => {
            Trade.find({})
                .then(resultData => res.send(resultData))
                .catch(err => console.log(err))
                .finally(() => mongoose.connection.close());
        })
        .catch(err => console.error(err));
});

module.exports = router;
