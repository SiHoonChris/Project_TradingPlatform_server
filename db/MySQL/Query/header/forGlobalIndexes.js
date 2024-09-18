module.exports = {
    getGlobalIndexesData:
      { query:
            'SELECT   m.DJI AS "Dow Jones", \
                      m.SPX AS "S&P 500", \
                      m.IXIC AS "Nasdaq", \
                      m.KOSPI , \
                      f.USD_KRW AS "USD/KRW" , \
                      f.CNY_KRW AS "CNY/KRW" , \
                      f.HKD_KRW AS "HKD/KRW" , \
                      f.SGD_KRW AS "SGD/KRW" , \
                      b.Korea   AS "Basis Rate (KO)" , \
                      b.Us      AS "Basis Rate (US)" , \
                      b.Japan   AS "Basis Rate (JP)" ,  \
                      c.Gold , \
                      c.Silver , \
                      c.Copper , \
                      c.Brent_Oil AS "Brent Oil" , \
                      c.Crude_Oil_WTI AS "Crude Oil(WTI)" , \
                      c.Natural_Gas AS "Natural Gas" , \
                      c.Corn , \
                      c.Wheat \
             FROM     basis_rate b , fx_rate f , market_index m, commodity_price c \
             WHERE    b.DATE = f.DATE AND f.DATE = m.DATE AND m.DATE = c.DATE \
             ORDER BY f.DATE DESC \
             LIMIT    2'
      }
}
