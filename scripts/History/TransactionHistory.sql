-- 테이블 생성  --
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

-- 전체 데이터 조회 --
SELECT  Date, Transaction, Detail, Name, 
        Price, Fx_Rate,Amount,
        Deposit, Withdraw, Dividend,
	    (CASE WHEN Transaction = 'Trading'  THEN Price * Amount 
              WHEN Transaction = 'Exchange' THEN Fx_Rate * Amount 
              WHEN Transaction = 'Banking' AND Detail = 'Deposit'  THEN Deposit
              WHEN Transaction = 'Banking' AND Detail = 'Withdraw' THEN Withdraw
			  WHEN Transaction = 'Banking' AND Detail = 'Dividend' THEN Dividend
		 END) AS Value,
         Currency
FROM     Transaction_History 
ORDER BY Date DESC;

-- 데이터 조회 : Select-box의 Option 값에 따른 (전달값 : 1개) --
SELECT  Date, Transaction, Detail, Name, 
        Price, Fx_Rate,Amount,
        Deposit, Withdraw, Dividend,
	    (CASE WHEN Transaction = 'Trading'  THEN Price * Amount 
              WHEN Transaction = 'Exchange' THEN Fx_Rate * Amount 
              WHEN Transaction = 'Banking' AND Detail = 'Deposit'  THEN Deposit
              WHEN Transaction = 'Banking' AND Detail = 'Withdraw' THEN Withdraw
			  WHEN Transaction = 'Banking' AND Detail = 'Dividend' THEN Dividend
		 END) AS Value,
         Currency
FROM     Transaction_History 
WHERE    Transaction = ? OR Detail = ?
ORDER BY Date DESC;

-- 데이터 조회 : Select-box의 Option 값과 날짜에 따른 --

