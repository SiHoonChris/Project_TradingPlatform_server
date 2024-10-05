module.exports = {
  getTransactionHistoryDataForChart:
      { query:
            `SELECT   Date, Expense 
               FROM   Transaction_History 
              WHERE   (Transaction LIKE ? OR Detail LIKE ?) 
                      AND ((Date >= ? AND Date <= ?) OR Date LIKE ?) 
           ORDER BY   Date ASC`
      },
  getTransactionHistoryDataForTable:
      { query:
            `SELECT   Date, 
                      Detail AS Transaction, 
                      Name, 
                      Price, 
                      Fx_Rate AS FX, 
                      Amount,
                      Deposit, 
                      Withdraw, 
                      Dividend,
                      Currency,
	                (CASE WHEN Currency = 'KRW' THEN 1    * Expense  
                            WHEN Currency = 'USD' THEN 1200 * Expense 
                            WHEN Currency = 'HKD' THEN 180  * Expense 
                            WHEN Currency = 'CNY' THEN 200  * Expense 
	                      WHEN Currency = 'SGD' THEN 900  * Expense 
	                 END) AS Expense 
               FROM   Transaction_History 
              WHERE   (Transaction LIKE ? OR Detail LIKE ?)
                      AND (Expense >= ? AND Expense <= ?) 
                      AND (Date >= ? AND Date <= ?)
           ORDER BY   Date ASC`
      },
  getExpenseSumForTable:
      { query:
            `SELECT  SUM(a.Expense) AS expense_sum
               FROM    ( 
                         SELECT  (CASE WHEN Currency = 'KRW' THEN 1    * Expense  
                                       WHEN Currency = 'USD' THEN 1200 * Expense 
                                       WHEN Currency = 'HKD' THEN 180  * Expense 
                                       WHEN Currency = 'CNY' THEN 200  * Expense 
	                                   WHEN Currency = 'SGD' THEN 900  * Expense 
		                          END) AS Expense
	                       FROM   Transaction_History 
	                      WHERE   (Transaction LIKE ? OR Detail LIKE ?)
		                           AND (Expense >= ? AND Expense <= ?) 
		                           AND (Date >= ? AND Date <= ?)
                        ) a`
      }
}
