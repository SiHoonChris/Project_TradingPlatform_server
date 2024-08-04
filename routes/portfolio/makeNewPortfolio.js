var express    = require('express');
var router     = express.Router();
var Portfolio  = require('../../db/MongoDB/DB/portfolio/forPortfolios');
const mongoose = require('mongoose');

router.post('/', function(req, res) {
    console.log(req.body.params);

    /* 1. 데이터 가공 : 차트 생성을 위한 데이터 추가 */
    let paramObj = req.body.params;
    paramObj.CHART_DATA = {};

    for(const E of paramObj.ASSETS) {
        paramObj.CHART_DATA[E] 
        = paramObj.DATAS[E].FXRATE * paramObj.DATAS[E].PRICE * paramObj.DATAS[E].AMOUNT;
    }

    console.log(paramObj);
    
    /* 2. DB로 데이터 전송 */
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
