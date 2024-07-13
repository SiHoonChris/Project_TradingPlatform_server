var express    = require('express');
var router     = express.Router();
const mongoose = require('mongoose');
const priceSchema = new mongoose.Schema({
    Date : Date,
    Open : Number,
    High : Number,
    Low  : Number,
    Close: Number
});

router.get('/', function(req, res) {
    const PriceData = mongoose.model('ClosePriceData', priceSchema, req.query.TICKER);

    mongoose.connect('mongodb://localhost:27017/trading-platform', {dbName: `${req.query.MARKET}Market`})
        .then(connected => {
            PriceData.findOne({})
                .then(resData => res.send(resData))
                .catch(err => console.log(err))
                .finally(() => mongoose.connection.close());
        })
        .catch(err => console.error(err));
});

module.exports = router;
