-- 테이블 생성 (주가 지수) --
CREATE TABLE market_index (
    DATE         DATETIME  NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    DJI          DECIMAL(8, 2)  NOT NULL  DEFAULT 0, 
    SPX          DECIMAL(8, 2)  NOT NULL  DEFAULT 0, 
    IXIC         DECIMAL(8, 2)  NOT NULL  DEFAULT 0, 
    KOSPI        DECIMAL(8, 2)  NOT NULL  DEFAULT 0, 
	PRIMARY KEY(DATE)
);

-- 테이블 생성 (기준 금리) --
CREATE TABLE basis_rate (
    DATE   DATETIME  NOT NULL  DEFAULT CURRENT_TIMESTAMP, 
    Korea  DECIMAL(4, 2)  NOT NULL  DEFAULT 0, 
    Us     DECIMAL(4, 2)  NOT NULL  DEFAULT 0,
    Japan  DECIMAL(4, 2)  NOT NULL  DEFAULT 0, 
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

-- 테이블 생성 (원자재 가격) --
CREATE TABLE commodity_price (
    DATE           DATETIME  NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    Gold           DECIMAL(8, 2)  NOT NULL  DEFAULT 0,
    Silver         DECIMAL(8, 2)  NOT NULL  DEFAULT 0,
    Copper         DECIMAL(8, 2)  NOT NULL  DEFAULT 0,
    Brent_Oil      DECIMAL(8, 2)  NOT NULL  DEFAULT 0,
    Crude_Oil_WTI  DECIMAL(8, 2)  NOT NULL  DEFAULT 0,
    Natural_Gas    DECIMAL(8, 2)  NOT NULL  DEFAULT 0,
    Corn           DECIMAL(8, 2)  NOT NULL  DEFAULT 0,
    Wheat          DECIMAL(8, 2)  NOT NULL  DEFAULT 0,
	PRIMARY KEY(DATE)
);

-- 가장 최근자 지수 조회 --
SELECT  m.DJI AS "Dow Jones", 
        m.SPX AS "S&P 500", 
        m.IXIC AS "Nasdaq", 
        m.KOSPI, 
        f.USD_KRW AS "USD/KRW",
        f.CNY_KRW AS "CNY/KRW", 
        f.HKD_KRW AS "HKD/KRW", 
        f.SGD_KRW AS "SGD/KRW", 
        b.Korea   AS "Basis Rate (KO)", 
        b.Us      AS "Basis Rate (US)", 
        b.Japan   AS "Basis Rate (JP)"
FROM    basis_rate b , fx_rate f , market_index m 
WHERE   b.DATE = f.DATE AND f.DATE = m.DATE 
ORDER BY f.DATE DESC 
LIMIT    2'
