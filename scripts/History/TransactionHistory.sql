/*
 * 1) 테이블 : 생성 / 수정(컬럼 추가)
 * 2) getTransactionHistoryDataForChart
        : 데이터 조회(Scatterplot Chart 생성)
 * 3) getTransactionHistoryDataForTable 
        : 데이터 조회(Scatterplot Chart 브러쉬에 따른 테이블 생성) 
 */

/* 1) 테이블 */
-- 생성  --
CREATE TABLE Transaction_History (
    Date         DATETIME  NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    Transaction  VARCHAR(10)  NOT NULL  DEFAULT '',
    Detail       VARCHAR(15)  NOT NULL  DEFAULT '',
    Name         VARCHAR(10)  NOT NULL  DEFAULT '',
    Price        DECIMAL(16, 4)  NOT NULL  DEFAULT 0, 
    FX_Rate      DECIMAL(16, 4)  NOT NULL  DEFAULT 0, 
    Amount       DECIMAL(16, 4)  NOT NULL  DEFAULT 0,    
    Deposit      DECIMAL(16, 4)  NOT NULL  DEFAULT 0, 
    Withdraw     DECIMAL(16, 4)  NOT NULL  DEFAULT 0, 
    Dividend     DECIMAL(16, 4)  NOT NULL  DEFAULT 0, 
    Currency     VARCHAR(5)  NOT NULL  DEFAULT '',
    PRIMARY KEY(DATE, Transaction, Detail, Name, Price, FX_Rate, Amount, Deposit, Withdraw, Dividend, Currency)	
);
-- 수정(컬럼 추가) --
ALTER TABLE Transaction_History ADD COLUMN Expense DECIMAL(16, 4) NOT NULL DEFAULT 0;
/* 1) */

/* 2) getTransactionHistoryDataForChart */
-- Params : Transaction(Detail), DateFrom, DateTo
-- Select : Date, Expense
  SELECT   Date, Expense 
    FROM   Transaction_History 
   WHERE   (Transaction LIKE %?% OR Detail LIKE %?%)
           AND (Date >= ? AND Date <= ?) OR Date LIKE ?%
ORDER BY   Date ASC;
-- Example)
  SELECT   Date, Expense 
    FROM   Transaction_History 
   WHERE   (Transaction LIKE "%%" OR Detail LIKE "%%")
           AND (Date >= "2023.05.01" AND Date <= "2023.05.31") OR Date LIKE "2023-05-31%"
ORDER BY   Date ASC;
/* 2) */

/* 3) getTransactionHistoryDataForTable */
-- Params : Transaction(Detail), ExpenseMin, ExpenseMax, DateFrom, DateTo
-- Select : Date, Detail(Transaction), Name, Price, FX, Amount, Deposit, Withdraw, Dividend, Currency, Expense
SELECT  Date, 
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
FROM    Transaction_History 
WHERE   (Transaction LIKE %?% OR Detail LIKE %?%)
        AND (Expense >= ? AND Expense <= ?) 
        AND (Date >= ? AND Date <= ?) OR Date LIKE ?%
ORDER BY Date ASC;
-- Example)
SELECT  Date, 
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
FROM    Transaction_History 
WHERE   (Transaction LIKE "%Trading%" OR Detail LIKE "%Trading%")
        AND (Expense >= 0 AND Expense <= 0) 
        AND (Date >= '2023-05-01' AND Date <= '2023-06-01') OR Date LIKE '2023-05-01%'
ORDER BY Date ASC;
/* 3) */
