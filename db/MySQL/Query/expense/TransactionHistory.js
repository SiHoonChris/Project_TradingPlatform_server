module.exports = {
  getTransactionFirstDay: 
      { query: 
            `SELECT MIN(dTbl.d) as firstDate 
            FROM (
                select trade_date as d from trade_history_crypto
                union all
                select t_date as d from trade_history_stock_domestic
                union all
                select transaction_date as d from trade_history_stock_foreign
            ) dTbl`
      },
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
      { query:
            `SELECT 
                Date, 
                Expense, 
                Color
            FROM (
                SELECT 
                    transaction_date as Date, 
                    case
                        when currency = 'USD' then (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 1200
                        when currency = 'CNY' then (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 200
                        when currency = 'HKD' then (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 180
                        when currency = 'SGD' then (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 900
                        else (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount)
                    end as Expense,
                    'blue' as Color 
                FROM 
                    trade_history_stock_foreign
                WHERE 
                    total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount > 0
                    AND (transaction_type LIKE ? OR description LIKE ?)
                
                UNION ALL

                SELECT 
                    t_date as Date, 
                    (commission + tran_agri_tax + inc_resid_tax) as Expense,
                    'red' as Color 
                FROM 
                    trade_history_stock_domestic
                WHERE 
                    commission + tran_agri_tax + inc_resid_tax > 0
                    AND t_type LIKE ?
                
                UNION ALL
                
                SELECT 
                    trade_date as Date,
                    fee as Expense, 
                    'white' as Color 
                FROM 
                    trade_history_crypto
                WHERE
                    fee > 0
                    AND trade_type LIKE ?
                
                ORDER BY Date ASC 
                ) all_data
            WHERE 
                Date BETWEEN ? AND ? `
      },
  getTransactionHistoryDataForTable:
      { query:
            `SELECT 
                Date, 
                Transaction, 
                Expense
            FROM (
                SELECT 
                    transaction_date as Date, 
                    description as Transaction,  /* 수정 필요 */
                    case
                        when currency = 'USD' then (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 1200
                        when currency = 'CNY' then (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 200
                        when currency = 'HKD' then (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 180
                        when currency = 'SGD' then (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 900
                        else (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount)
                    end as Expense
                FROM 
                    trade_history_stock_foreign
                WHERE 
                    (transaction_type LIKE ? OR description LIKE ?)
                    AND 
                    total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount BETWEEN ? AND ? 
                            
                UNION ALL

                SELECT 
                    t_date as Date, 
                    t_type as Transaction,  /* 수정 필요 */
                    (commission + tran_agri_tax + inc_resid_tax) as Expense
                FROM 
                    trade_history_stock_domestic
                WHERE 
                    t_type LIKE ? 
                    AND 
                    commission + tran_agri_tax + inc_resid_tax BETWEEN ? AND ? 
                            
                UNION ALL
                            
                SELECT 
                    trade_date as Date, 
                    CASE 
                        WHEN trade_type IN ('매수', '매도') 
                            THEN CONCAT(coin, ' ', trade_type, ' (', FORMAT(price,0), '원 x ', amount, ')') 
                        WHEN trade_type IN ('입금', '출금') 
                            THEN CONCAT(trade_type, ' (', coin, ' ', 
                                CASE 
                                    WHEN MOD(amount, 1) = 0 THEN FORMAT(amount, 0) 
                                    ELSE FORMAT(amount, 4) 
                                END, ')')
                    END AS Transaction,
                    FORMAT(fee, 4) as Expense
                FROM 
                    trade_history_crypto
                WHERE
                    trade_type LIKE ?
                    AND fee BETWEEN ? AND ? 
                            
                ORDER BY Date ASC 
            ) brushed_area
            WHERE 
                Date BETWEEN ? AND ? `
      },
  getExpenseSumForTable:
      { query:
            `SELECT 
	            SUM(Expense) as expenseTotal
            FROM (
                SELECT 
                    case
                        when currency = 'USD' then (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 1200
                        when currency = 'CNY' then (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 200
                        when currency = 'HKD' then (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 180
                        when currency = 'SGD' then (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 900
                        else (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount)
                    end as Expense
                FROM 
                    trade_history_stock_foreign
                WHERE 
                    (transaction_type LIKE ? OR description LIKE ?)
                    AND 
                    transaction_date BETWEEN ? AND ?
                    AND
                    total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount BETWEEN ? AND ?
                            
                UNION ALL

                SELECT 
                    (commission + tran_agri_tax + inc_resid_tax) as Expense
                FROM 
                    trade_history_stock_domestic
                WHERE 
                    t_type LIKE ? 
                    AND 
                    t_date BETWEEN ? AND ? 
                    AND
                    commission + tran_agri_tax + inc_resid_tax BETWEEN ? AND ?
                            
                UNION ALL
                
                SELECT 
                    fee as Expense
                FROM 
                    trade_history_crypto
                WHERE
                    trade_type LIKE ?
                    AND 
                    trade_date BETWEEN ? AND ? 
                    AND 
                    fee BETWEEN ? AND ?
            ) expense`
      }
}
