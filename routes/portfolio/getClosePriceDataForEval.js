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
let resObj = {};

router.get('/', function(req, res) {
    let received = req.query["array"];    

    for(let i in received){
        let [t, m] = [received[i].TICKER, received[i].MARKET];
        
        let conn = mongoose.createConnection('mongodb://localhost:27017/trading-platform', {dbName: `${m}Market`});
        conn.once('open', () => {
            let PriceData = conn.model(`${t}_ClosePrice`, priceSchema, t);
            PriceData.find().sort({Date: -1}).limit(1)
                .then(resData => resObj[t]=resData[0].Close)
                .then(checkEnd => {
                    if(Number(i) === received.length -1){
                        res.send(resObj);
                        resObj = {};
                    }
                })
                .catch(err => console.log(err));
        }); 
    }
});

module.exports = router;
