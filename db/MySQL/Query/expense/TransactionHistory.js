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
            `SELECT 
                distinct
                (case 
                    when transaction_type like '%매수%' then '매수'
                    when transaction_type like '%매도%' then '매도'
                    when transaction_type like '%배당%' then '배당'
                    when transaction_type like '%입금%' then '입금'
                    when transaction_type like '%출금%' and transaction_type != '입출금' then '출금'
                    else transaction_type
                end) transaction_type
            FROM (
                SELECT '전체' as transaction_type FROM DUAL

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
                WHERE  fee > 0
            ) transaction_type_list`
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
                    AND (
                        (? = '매매' AND (t_type LIKE '%매수%' OR t_type LIKE '%매도%')) 
                        OR t_type LIKE ?
                    )

                UNION ALL
                
                SELECT 
                    trade_date as Date,
                    fee as Expense, 
                    'white' as Color 
                FROM 
                    trade_history_crypto
                WHERE
                    fee > 0
                    AND (
                        (? = '매매' AND (trade_type LIKE '%매수%' OR trade_type LIKE '%매도%')) 
                        OR trade_type LIKE ?
                    )
                
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
                    CASE 
                        WHEN description LIKE '%외화%' AND (description LIKE '%매수%' OR description LIKE '%매도%')
                            THEN CONCAT(transaction_type, ', ', description, ' (', currency, ', ', unit_price_exchange_rate, currency,'/KRW, ', FORMAT(transaction_amount,0),'원)')
                        WHEN description NOT LIKE '%외화%' AND (description LIKE '%매수%' OR description LIKE '%매도%')
                            THEN CONCAT(stock_code, ', ', description, ' (', unit_price_exchange_rate, currency, ' x ', FORMAT(transaction_quantity,0),')')
                        WHEN description LIKE '%배당%' AND (description LIKE '%입금%' OR description LIKE '%출금%')
                            THEN CONCAT(stock_code, ', ', description, ' (', 
                                CASE WHEN currency = 'KRW' 
                                    THEN FORMAT(transaction_amount,0)
                                    ELSE transaction_amount_foreign
                                END,
                                currency, ')')
                        WHEN description NOT LIKE '%배당%' AND (description LIKE '%입금%' OR description LIKE '%출금%')
                            THEN CONCAT(description, ' (', 
                                CASE WHEN currency = 'KRW' 
                                    THEN FORMAT(transaction_amount,0)
                                    ELSE transaction_amount_foreign
                                END,
                                currency, ')')
                        ELSE 
                            CONCAT(stock_code, ', ', description, ' (', FORMAT(unit_price_exchange_rate,0), currency, ' x ', FORMAT(transaction_quantity,0), ')') 
                    END as Transaction, 
                    CASE
                        WHEN currency = 'USD' THEN (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 1200
                        WHEN currency = 'CNY' THEN (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 200
                        WHEN currency = 'HKD' THEN (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 180
                        WHEN currency = 'SGD' THEN (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 900
                        ELSE (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount)
                    END as Expense
                FROM 
                    trade_history_stock_foreign
                WHERE 
                    (transaction_type LIKE ? OR description LIKE ?)
                    AND (CASE
                        WHEN currency = 'USD' THEN (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 1200
                        WHEN currency = 'CNY' THEN (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 200
                        WHEN currency = 'HKD' THEN (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 180
                        WHEN currency = 'SGD' THEN (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 900
                        ELSE (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount)
                    END) BETWEEN ? AND ?
                    AND (CASE
                        WHEN currency = 'USD' THEN (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 1200
                        WHEN currency = 'CNY' THEN (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 200
                        WHEN currency = 'HKD' THEN (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 180
                        WHEN currency = 'SGD' THEN (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 900
                        ELSE (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount)
                    END) != 0 
                            
                UNION ALL

                SELECT 
	                t_date as Date, 
                    CASE 
                        WHEN t_type LIKE '%입금%' AND t_type LIKE '%배당%'
                            THEN CONCAT(stock_name, ', 배당 (', t_amount, '원)')
                        WHEN (t_type LIKE '%입금%' AND t_type NOT LIKE '%배당%') OR (t_type LIKE '%출금%')
                            THEN CONCAT(t_amount, '원, ', t_type)
                        WHEN t_type LIKE '%매수%' 
                            THEN CONCAT(stock_name, ', 매수 (', FORMAT(t_unit_price,0), '원 x ', t_quant, '주)')
                        WHEN t_type LIKE '%매도%'
                            THEN CONCAT(stock_name, ', 매도 (', FORMAT(t_unit_price,0), '원 x ', t_quant, '주)')
                        ELSE 
                            CONCAT(stock_name, ', ', t_type, ' (', FORMAT(t_unit_price,0), '원 x ', t_quant, '주)') 
                    END as Transaction, 
                    (commission + tran_agri_tax + inc_resid_tax) as Expense
                FROM 
                    trade_history_stock_domestic
                WHERE 
                    (
                        (? = '매매' AND (t_type LIKE '%매수%' OR t_type LIKE '%매도%')) 
                        OR t_type LIKE ?
                    )
                    AND 
                    commission + tran_agri_tax + inc_resid_tax BETWEEN ? AND ? 
                    AND 
                    commission + tran_agri_tax + inc_resid_tax != 0 
                            
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
                    fee as Expense
                FROM 
                    trade_history_crypto
                WHERE
                    (
                        (? = '매매' AND (trade_type LIKE '%매수%' OR trade_type LIKE '%매도%')) 
                        OR trade_type LIKE ?
                    )
                    AND fee BETWEEN ? AND ? 
                    AND fee != 0 
                            
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
                    AND (CASE
                        WHEN currency = 'USD' THEN (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 1200
                        WHEN currency = 'CNY' THEN (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 200
                        WHEN currency = 'HKD' THEN (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 180
                        WHEN currency = 'SGD' THEN (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount) * 900
                        ELSE (total_taxes + fees_foreign + stamp_tax + foreign_paid_tax_amount)
                    END) BETWEEN ? AND ?
                            
                UNION ALL

                SELECT 
                    (commission + tran_agri_tax + inc_resid_tax) as Expense
                FROM 
                    trade_history_stock_domestic
                WHERE 
                    (
                        (? = '매매' AND (t_type LIKE '%매수%' OR t_type LIKE '%매도%')) 
                        OR t_type LIKE ?
                    )
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
                    (
                        (? = '매매' AND (trade_type LIKE '%매수%' OR trade_type LIKE '%매도%')) 
                        OR trade_type LIKE ?
                    )
                    AND 
                    trade_date BETWEEN ? AND ? 
                    AND 
                    fee BETWEEN ? AND ?
            ) expense`
      }
}
