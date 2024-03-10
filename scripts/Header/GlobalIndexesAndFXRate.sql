-- 테이블 생성 --
CREATE TABLE global_index (
    DATE         DATETIME  NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    DJI          DECIMAL(8, 2)  NOT NULL  DEFAULT 0, 
    SPX          DECIMAL(8, 2)  NOT NULL  DEFAULT 0, 
    IXIC         DECIMAL(8, 2)  NOT NULL  DEFAULT 0, 
    KOSPI        DECIMAL(8, 2)  NOT NULL  DEFAULT 0, 
    BasisRate_KO DECIMAL(4, 2)  NOT NULL  DEFAULT 0, 
    BasisRate_US DECIMAL(4, 2)  NOT NULL  DEFAULT 0, 
    USD_KRW      DECIMAL(8, 2)  NOT NULL  DEFAULT 0, 
    CNY_KRW      DECIMAL(8, 2)  NOT NULL  DEFAULT 0, 
    HKD_KRW      DECIMAL(8, 2)  NOT NULL  DEFAULT 0, 
    SGD_KRW      DECIMAL(8, 2)  NOT NULL  DEFAULT 0, 
	PRIMARY KEY(DATE)
);

-- 가장 최근자 지수 조회 --
SELECT   DJI AS "Dow Jones", 
         SPX AS "S&P 500", 
         IXIC AS "Nasdaq", 
         KOSPI , 
         BasisRate_KO AS "Basis Rate (KO)" , 
         BasisRate_US AS "Basis Rate (US)" , 
         USD_KRW AS "USD/KRW" , 
         CNY_KRW AS "CNY/KRW" ,  
         HKD_KRW AS "HKD/KRW" ,  
         SGD_KRW AS "SGD/KRW" 
FROM     global_index 
ORDER BY DATE DESC
LIMIT    2;
