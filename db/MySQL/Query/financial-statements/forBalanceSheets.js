module.exports = {
    getBSdataPerYear:
      { query: 
            "SELECT  YEAR AS PERIOD, \
                     CASH, \
                     INVESTMENT, \
                     OTHERS, \
                     IFNULL((CASH + INVESTMENT + OTHERS), 0) AS TOTAL_ASSETS, \
                     SHORT_TERM_LIABILITIES, \
                     LONG_TERM_LIABILITIES, \
                     IFNULL((SHORT_TERM_LIABILITIES + LONG_TERM_LIABILITIES), 0) AS TOTAL_LIABILITIES, \
                     DEPOSIT, \
                     RETAINED_EARNINGS, \
                     IFNULL((SHORT_TERM_LIABILITIES + LONG_TERM_LIABILITIES + DEPOSIT + RETAINED_EARNINGS), 0) AS TOTAL_LIABILITIES_AND_EQUITY, \
                     IFNULL(((SHORT_TERM_LIABILITIES + LONG_TERM_LIABILITIES) / (DEPOSIT + RETAINED_EARNINGS) * 100), 0) AS DEBT_RATE \
            FROM     my_balance_sheets \
            WHERE    (YEAR <= YEAR(NOW())-1 AND MONTH = 12) \
                     AND (YEAR >= YEAR(NOW())-2 AND MONTH=12) \
                     OR (YEAR = YEAR(NOW()) AND MONTH = MONTH(NOW())-1) \
            ORDER BY YEAR DESC" 
      }, 
    getBSdataPerQuarter:
      { query: 
            "SELECT  CONCAT((MONTH/3 + ''), 'Q') AS PERIOD, \
                     CASH, \
                     INVESTMENT, \
                     OTHERS, \
                     IFNULL((CASH + INVESTMENT + OTHERS), 0) AS TOTAL_ASSETS, \
                     SHORT_TERM_LIABILITIES, \
                     LONG_TERM_LIABILITIES, \
                     IFNULL((SHORT_TERM_LIABILITIES + LONG_TERM_LIABILITIES), 0) AS TOTAL_LIABILITIES, \
                     DEPOSIT, \
                     RETAINED_EARNINGS, \
                     IFNULL((SHORT_TERM_LIABILITIES + LONG_TERM_LIABILITIES + DEPOSIT + RETAINED_EARNINGS), 0) AS TOTAL_LIABILITIES_AND_EQUITY, \
                     IFNULL(((SHORT_TERM_LIABILITIES + LONG_TERM_LIABILITIES) / (DEPOSIT + RETAINED_EARNINGS) * 100), 0) AS DEBT_RATE \
            FROM     my_balance_sheets \
            WHERE    (YEAR = ?) \
                     AND (MONTH = 3 OR MONTH = 6 OR MONTH = 9 OR MONTH = 12) \
            ORDER BY MONTH DESC" 
      }, 
    getBSdataPerMonth: 
      { query: 
            "SELECT  (CASE WHEN MONTH = 1 THEN 'Jan' \
                           WHEN MONTH = 2 THEN 'Feb' \
                           WHEN MONTH = 3 THEN 'Mar' \
                           WHEN MONTH = 4 THEN 'Apr' \
                           WHEN MONTH = 5 THEN 'May' \
                           WHEN MONTH = 6 THEN 'Jun' \
                           WHEN MONTH = 7 THEN 'Jul' \
                           WHEN MONTH = 8 THEN 'Aug' \
                           WHEN MONTH = 9 THEN 'Sep' \
                           WHEN MONTH = 10 THEN 'Oct' \
                           WHEN MONTH = 11 THEN 'Nov' \
                           WHEN MONTH = 12 THEN 'Dec' \
                     END) AS PERIOD, \
                     CASH, \
                     INVESTMENT, \
                     OTHERS, \
                     IFNULL((CASH + INVESTMENT + OTHERS), 0) AS TOTAL_ASSETS, \
                     SHORT_TERM_LIABILITIES, \
                     LONG_TERM_LIABILITIES, \
                     IFNULL((SHORT_TERM_LIABILITIES + LONG_TERM_LIABILITIES), 0) AS TOTAL_LIABILITIES, \
                     DEPOSIT, \
                     RETAINED_EARNINGS, \
                     IFNULL((SHORT_TERM_LIABILITIES + LONG_TERM_LIABILITIES + DEPOSIT + RETAINED_EARNINGS), 0) AS TOTAL_LIABILITIES_AND_EQUITY, \
                     IFNULL(((SHORT_TERM_LIABILITIES + LONG_TERM_LIABILITIES) / (DEPOSIT + RETAINED_EARNINGS) * 100), 0) AS DEBT_RATE \
            FROM     my_balance_sheets \
            WHERE    (YEAR = ?) \
                     AND (MONTH >= ?*3-2 AND MONTH <= ?*3) \
                     ORDER BY MONTH DESC" 
      } 
}
