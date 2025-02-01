module.exports = {
  getTransactionTypeList: 
      { query : 
            `SELECT '전체' as transaction_type FROM DUAL

            UNION
            
            SELECT distinct t_type as transaction_type 
            FROM    trade_history_stock_domestic 
            WHERE   commission + tran_agri_tax + inc_resid_tax > 0

            UNION

            SELECT distinct transaction_type 
            FROM   trade_history_stock_foreign 
            WHERE  total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount > 0

            UNION 

            SELECT distinct description as transaction_type 
            FROM   trade_history_stock_foreign 
            WHERE  total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount > 0

            UNION 

            SELECT distinct trade_type as transaction_type 
            FROM   trade_history_crypto 
            WHERE  fee > 0`
      },
  getTransactionHistoryDataForChart:
      { query: /* where 조건문 추가 필요 */
        // WHERE   (Transaction LIKE ? OR Detail LIKE ?) AND ((Date >= ? AND Date <= ?) OR Date LIKE ?) 
            `SELECT 
                transaction_date as Date, 
                case
                    when currency = 'USD' then (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 1200
                    when currency = 'CNY' then (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 200
                    when currency = 'HKD' then (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 180
                    when currency = 'SGD' then (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 900
                    else (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount)
                end as Expense 
            FROM trade_history_stock_foreign
            WHERE total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount > 0
            
            UNION ALL

            SELECT 
                t_date as Date, 
                (commission + tran_agri_tax + inc_resid_tax) as Expense 
            FROM trade_history_stock_domestic
            WHERE commission + tran_agri_tax + inc_resid_tax > 0
            
            UNION ALL
            
            SELECT 
				trade_date as Date,
                fee as Expense 
			FROM trade_history_crypto
            
            ORDER BY Date ASC`
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
