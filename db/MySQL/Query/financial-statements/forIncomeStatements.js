module.exports = {
    getISdataPerYear:
      { query:
            "SELECT  A.YEAR AS PERIOD, \
                     SUM(MARGINAL_PROFIT) AS MARGINAL_PROFIT, \
                     (SUM(DIVIDEND) + SUM(INTEREST)) AS DIVIDEND_INTEREST, \
                     (SUM(MARGINAL_PROFIT) + SUM(DIVIDEND) + SUM(INTEREST)) AS TOTAL_REVENUE, \
                     SUM(NET_MARGINAL_PROFIT) AS NET_MARGINAL_PROFIT, \
                     (SUM(NET_DIVIDEND) + SUM(NET_INTEREST)) AS NET_DIVIDEND_INTEREST, \
                     (SUM(NET_MARGINAL_PROFIT) + SUM(NET_DIVIDEND) + SUM(NET_INTEREST)) AS TOTAL_NET_INCOME, \
                     IFNULL( ( ((SUM(NET_MARGINAL_PROFIT) + SUM(NET_DIVIDEND) + SUM(NET_INTEREST)) / (SUM(MARGINAL_PROFIT) + SUM(DIVIDEND) + SUM(INTEREST))) * 100 ), 0 ) AS PROFIT_MARGIN_RATE, \
                     IFNULL( ( ((SUM(NET_MARGINAL_PROFIT) + SUM(NET_DIVIDEND) + SUM(NET_INTEREST)) / (SUM(DEPOSIT) + SUM(RETAINED_EARNINGS))) * 100 ), 0 ) AS ROE, \
                     IFNULL( ( ((SUM(NET_MARGINAL_PROFIT) + SUM(NET_DIVIDEND) + SUM(NET_INTEREST)) / (SUM(LONG_TERM_LIABILITIES))) ), 0 ) AS NET_INCOME_LONG_TERM_LIAB \
            FROM     my_income_statements A, \
                     my_balance_sheets B \
            WHERE    (A.YEAR >= YEAR(now())-2 AND A.YEAR <= YEAR(now())) \
                     AND A.YEAR = B.YEAR \
                     AND A.MONTH = B.MONTH \
            GROUP BY A.YEAR \
            ORDER BY A.YEAR DESC"
      },
    getISdataPerQuarter:
      { query: 
            "SELECT  (CASE WHEN A.MONTH >= 1 AND A.MONTH <=3 THEN '1Q' \
                           WHEN A.MONTH >= 4 AND A.MONTH <= 6 THEN '2Q' \
                           WHEN A.MONTH >= 7 AND A.MONTH <= 9 THEN '3Q' \
                           WHEN A.MONTH >= 10 AND A.MONTH <= 12 THEN '4Q' \
                     END) AS PERIOD, \
                     SUM(MARGINAL_PROFIT) AS MARGINAL_PROFIT, \
                     (SUM(DIVIDEND) + SUM(INTEREST)) AS DIVIDEND_INTEREST, \
                     (SUM(MARGINAL_PROFIT) + SUM(DIVIDEND) + SUM(INTEREST)) AS TOTAL_REVENUE, \
                     SUM(NET_MARGINAL_PROFIT) AS NET_MARGINAL_PROFIT, \
                     (SUM(NET_DIVIDEND) + SUM(NET_INTEREST)) AS NET_DIVIDEND_INTEREST, \
                     (SUM(NET_MARGINAL_PROFIT) + SUM(NET_DIVIDEND) + SUM(NET_INTEREST)) AS TOTAL_NET_INCOME, \
                     IFNULL( ( ((SUM(NET_MARGINAL_PROFIT) + SUM(NET_DIVIDEND) + SUM(NET_INTEREST)) / (SUM(MARGINAL_PROFIT) + SUM(DIVIDEND) + SUM(INTEREST))) * 100 ), 0 ) AS PROFIT_MARGIN_RATE, \
                     IFNULL( ( ((SUM(NET_MARGINAL_PROFIT) + SUM(NET_DIVIDEND) + SUM(NET_INTEREST)) / (SUM(DEPOSIT) + SUM(RETAINED_EARNINGS))) * 100 ), 0 ) AS ROE, \
                     IFNULL( ( ((SUM(NET_MARGINAL_PROFIT) + SUM(NET_DIVIDEND) + SUM(NET_INTEREST)) / (SUM(LONG_TERM_LIABILITIES))) ), 0 ) AS NET_INCOME_LONG_TERM_LIAB \
            FROM     my_income_statements A, \
                     my_balance_sheets B \
            WHERE    A.YEAR = ? \
                     AND A.YEAR = B.YEAR \
                     AND A.MONTH = B.MONTH \
            GROUP BY PERIOD \
            ORDER BY PERIOD DESC"
      },
    getISdataPerMonth: 
      { query: 
            "SELECT  (CASE WHEN A.MONTH = 1 THEN 'Jan' \
                           WHEN A.MONTH = 2 THEN 'Feb' \
                           WHEN A.MONTH = 3 THEN 'Mar' \
                           WHEN A.MONTH = 4 THEN 'Apr' \
                           WHEN A.MONTH = 5 THEN 'May' \
                           WHEN A.MONTH = 6 THEN 'Jun' \
                           WHEN A.MONTH = 7 THEN 'Jul' \
                           WHEN A.MONTH = 8 THEN 'Aug' \
                           WHEN A.MONTH = 9 THEN 'Sep' \
                           WHEN A.MONTH = 10 THEN 'Oct' \
                           WHEN A.MONTH = 11 THEN 'Nov' \
                           WHEN A.MONTH = 12 THEN 'Dec' \
                     END) AS PERIOD, \
                     MARGINAL_PROFIT, \
                     (DIVIDEND + INTEREST) AS DIVIDEND_INTEREST, \
                     (MARGINAL_PROFIT + DIVIDEND + INTEREST) AS TOTAL_REVENUE, \
                     NET_MARGINAL_PROFIT AS NET_MARGINAL_PROFIT, \
                     (NET_DIVIDEND + NET_INTEREST) AS NET_DIVIDEND_INTEREST, \
                     (NET_MARGINAL_PROFIT + NET_DIVIDEND + NET_INTEREST) AS TOTAL_NET_INCOME, \
                     IFNULL( ( (NET_MARGINAL_PROFIT + NET_DIVIDEND + NET_INTEREST) / (MARGINAL_PROFIT + DIVIDEND + INTEREST) * 100 ), 0 ) AS PROFIT_MARGIN_RATE, \
                     IFNULL( ( (NET_MARGINAL_PROFIT + NET_DIVIDEND + NET_INTEREST) / (DEPOSIT + RETAINED_EARNINGS) * 100 ), 0 ) AS ROE, \
                     IFNULL( ( (NET_MARGINAL_PROFIT + NET_DIVIDEND + NET_INTEREST) / (LONG_TERM_LIABILITIES) ), 0 ) AS NET_INCOME_LONG_TERM_LIAB \
            FROM     my_income_statements A, \
                     my_balance_sheets B \
            WHERE    A.YEAR = ? AND ( A.MONTH >= ?*3-2 AND A.MONTH <= ?*3 ) \
                     AND A.YEAR = B.YEAR \
                     AND A.MONTH = B.MONTH \
            ORDER BY A.MONTH DESC"                
      }
}
