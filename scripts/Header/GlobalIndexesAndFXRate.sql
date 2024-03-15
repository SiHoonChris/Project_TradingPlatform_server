-- 테이블 생성 (지수, 금리 등) --
CREATE TABLE global_index (
    DATE         DATETIME  NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    DJI          DECIMAL(8, 2)  NOT NULL  DEFAULT 0, 
    SPX          DECIMAL(8, 2)  NOT NULL  DEFAULT 0, 
    IXIC         DECIMAL(8, 2)  NOT NULL  DEFAULT 0, 
    KOSPI        DECIMAL(8, 2)  NOT NULL  DEFAULT 0, 
    BasisRate_KO DECIMAL(4, 2)  NOT NULL  DEFAULT 0, 
    BasisRate_US DECIMAL(4, 2)  NOT NULL  DEFAULT 0, 
	PRIMARY KEY(DATE)
);

-- 테이블 생성 (원 대비 환율) --
CREATE TABLE fx_rate (
    DATE         DATETIME  NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    USD_KRW      DECIMAL(8, 2)  NOT NULL  DEFAULT 0, 
    CNY_KRW      DECIMAL(8, 2)  NOT NULL  DEFAULT 0, 
    HKD_KRW      DECIMAL(8, 2)  NOT NULL  DEFAULT 0, 
    SGD_KRW      DECIMAL(8, 2)  NOT NULL  DEFAULT 0, 
	PRIMARY KEY(DATE)
);

-- 가장 최근자 지수 조회 --
SELECT   g.DJI AS "Dow Jones", 
         g.SPX AS "S&P 500", 
         g.IXIC AS "Nasdaq", 
         g.KOSPI , 
         g.BasisRate_KO AS "Basis Rate (KO)" , 
         g.BasisRate_US AS "Basis Rate (US)" , 
         f.USD_KRW AS "USD/KRW" , 
         f.CNY_KRW AS "CNY/KRW" ,  
         f.HKD_KRW AS "HKD/KRW" ,  
         f.SGD_KRW AS "SGD/KRW" 
FROM     global_index g , fx_rate f
WHERE    g.DATE = f.DATE
ORDER BY g.DATE DESC
LIMIT    2;
