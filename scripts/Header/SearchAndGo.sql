-- 테이블 생성 --
CREATE TABLE us_market (
	NAME     VARCHAR(100)  NOT NULL  DEFAULT 'name', 
    TICKER   VARCHAR(8)    NOT NULL  DEFAULT 'ticker',
	MARKET   varchar(20)   NOT NULL  DEFAULT 'Us',
    PRIMARY KEY(TICKER)
);
CREATE TABLE hongkong_market (
	NAME     VARCHAR(100)  NOT NULL  DEFAULT 'name',
    TICKER   VARCHAR(8)    NOT NULL  DEFAULT 'ticker',
    MARKET   varchar(20)   NOT NULL  DEFAULT 'Hongkong',
	PRIMARY KEY(TICKER)
);
CREATE TABLE shanghai_market (
	NAME     VARCHAR(100)  NOT NULL  DEFAULT 'name',
    TICKER   VARCHAR(8)    NOT NULL  DEFAULT 'ticker',
    MARKET   varchar(20)   NOT NULL  DEFAULT 'Shanghai',
	PRIMARY KEY(TICKER)
);
CREATE TABLE korea_market (
	NAME     VARCHAR(100)  NOT NULL  DEFAULT 'name',
    TICKER   VARCHAR(8)    NOT NULL  DEFAULT 'ticker',
    MARKET   varchar(20)   NOT NULL  DEFAULT 'Korea',
	PRIMARY KEY(TICKER)
);
CREATE TABLE singapore_market (
	NAME     VARCHAR(100)  NOT NULL  DEFAULT 'name',
    TICKER   VARCHAR(8)    NOT NULL  DEFAULT 'ticker',
    MARKET   varchar(20)   NOT NULL  DEFAULT 'Singapore',
	PRIMARY KEY(TICKER)
);
CREATE TABLE crypto_market (
	NAME     VARCHAR(100)  NOT NULL  DEFAULT 'name',
    TICKER   VARCHAR(8)    NOT NULL  DEFAULT 'ticker',
    MARKET   varchar(20)   NOT NULL  DEFAULT 'Crypto',
	PRIMARY KEY(TICKER)
);

-- 시장별 모든 자산 조회 --
SELECT * FROM us_market 
UNION ALL SELECT * FROM korea_market 
UNION ALL SELECT * FROM shanghai_market 
UNION ALL SELECT * FROM crypto_market 
UNION ALL SELECT * FROM hongkong_market 
UNION ALL SELECT * FROM singapore_market 
ORDER BY NAME, TICKER ASC;

/* 테이블 수정 */
-- ALTER TABLE COUNTRY_market ADD COLUMN MARKET varchar(20) NOT NULL;
-- ALTER TABLE singapore_market DROP COLUMN TREND;
-- ALTER TABLE singapore_market DROP COLUMN HOLD;