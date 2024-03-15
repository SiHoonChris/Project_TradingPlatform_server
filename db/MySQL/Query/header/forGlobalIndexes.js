module.exports = {
    getGlobalIndexesData:
      { query:
            'SELECT   g.DJI AS "Dow Jones", \
                      g.SPX AS "S&P 500", \
                      g.IXIC AS "Nasdaq", \
                      g.KOSPI , \
                      g.BasisRate_KO AS "Basis Rate (KO)" , \
                      g.BasisRate_US AS "Basis Rate (US)" , \
                      f.USD_KRW AS "USD/KRW" , \
                      f.CNY_KRW AS "CNY/KRW" , \
                      f.HKD_KRW AS "HKD/KRW" , \
                      f.SGD_KRW AS "SGD/KRW" \
             FROM     global_index g , fx_rate f \
             WHERE    g.DATE = f.DATE \
             ORDER BY g.DATE DESC \
             LIMIT    2'
      }
}
