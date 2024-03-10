module.exports = {
    getGlobalIndexesData:
      { query:
            'SELECT  DJI AS "Dow Jones" , \
                     SPX AS "S&P 500" , \
                     IXIC AS "Nasdaq" , \
                     KOSPI , \
                     BasisRate_KO AS "Basis Rate (KO)" , \
                     BasisRate_US AS "Basis Rate (US)" , \
                     USD_KRW AS "USD/KRW" , \
                     CNY_KRW AS "CNY/KRW" , \
                     HKD_KRW AS "HKD/KRW" , \
                     SGD_KRW AS "SGD/KRW" \
            FROM     global_index \
            ORDER BY DATE DESC \
            LIMIT    2'
      }
}
