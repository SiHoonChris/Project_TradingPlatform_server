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

router.get('/', function(req, res) { // 데이터 가져올 때 오름차순으로 sort해서 가져오기!! -> 이 코드 수정해라!!!
    const Trade = mongoose.model('HistoricalPriceData', tradeSchema, req.query.TICKER);

    mongoose.connect('mongodb://localhost:27017/trading-platform', {dbName: `${req.query.MARKET}Market`})
        .then(connected => {
            Trade.find({})
                .then(resultData => res.send(resultData))
                .catch(err => console.log(err))
                .finally(() => mongoose.connection.close());
        })
        .catch(err => console.error(err));
});

module.exports = router;
