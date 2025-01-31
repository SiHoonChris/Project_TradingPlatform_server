/* 보유 종목 */

/* 보유량 조회 */
select 
	ticker, 
    stock_name, 
    purchase_amount * exchange_rate as purchased, 
    valuation_amount * exchange_rate as valued
from foreign_stock_in_portfolio

union all

select 
	stock_code as ticker, 
    stock_name, 
    purchase_amount as purchased, 
    valuation_amount as valued
from domestic_stock_in_portfolio;


/* [ Korean ] */
CREATE TABLE IF NOT EXISTS domestic_stock_in_portfolio (
    `stock_code` BIGINT,
    `stock_name` VARCHAR(254), 
    `valuation_profit_loss` BIGINT,
    `return_rate` NUMERIC(7, 4), 
    `purchase_price` BIGINT,
    `holding_quantity` BIGINT,
    `available_quantity` BIGINT,
    `current_price` BIGINT,
    `previous_day_price` BIGINT,
    `today_price` BIGINT,
    `purchase_amount` BIGINT,
    `valuation_amount` BIGINT,
    `commission_fee` BIGINT,
    `tax` BIGINT,
    `holding_ratio` NUMERIC(7, 4), 
    `credit_type` VARCHAR(128), 
    `loan_date` BIGINT,
    `maturity_date` BIGINT,
    `credit_amount` BIGINT,
    `credit_interest` BIGINT,
    `loan_quantity` BIGINT,
    `average_purchase_price_for_profit_loss` BIGINT
);

INSERT INTO domestic_stock_in_portfolio VALUES 
    (207940,'삼성바이오로직스',96079,0.0977,983000,1,1,1081000,NULL,NULL,983000,1081000,300,1621,0.2816,'현금잔고',NULL,NULL,0,0,0,984921),
	(261220,'KODEX WTI원유선물(H)',-136890,-0.0546,16390,153,153,15500,NULL,NULL,2507670,2371500,720,NULL,0.7184,'현금잔고',NULL,NULL,0,0,0,16394);


/* [ Foreign - Mostly USA ] */
CREATE TABLE IF NOT EXISTS foreign_stock_in_portfolio (
    `ticker` VARCHAR(16), 
    `stock_name` VARCHAR(512),  
    `valuation_profit_loss` NUMERIC(12, 4),  
    `valuation_yield` NUMERIC(8, 4),  
    `purchase_price` NUMERIC(9, 4),  
    `holding_quantity` INT, 
    `available_quantity` INT, 
    `current_price` NUMERIC(9, 4),  
    `price_change_rate` NUMERIC(8, 4),  
    `previous_day` INT, 
    `current_day` INT, 
    `purchase_amount` NUMERIC(14, 4), 
    `valuation_amount` NUMERIC(14, 4), 
    `commission_fee` NUMERIC(8, 4),  
    `tax` INT, 
    `currency` VARCHAR(8), 
    `quarterly_avg_purchase_price` NUMERIC(9, 4), 
    `exchange_rate` NUMERIC(8, 4), 
    `country` VARCHAR(16), 
    `exchange` VARCHAR(16), 
    `full_ticker_code` VARCHAR(32)
);

INSERT INTO foreign_stock_in_portfolio VALUES 
    ('CRWD','CrowdStrike Holdings, Inc.',169.35,0.0766,368,6,6,398.14,0.0027,0,0,2208,2388.84,11.49,0,'USD',369.915,1430.4,'USA','USA','NDCRWD'),
    ('EMB','iShares J.P. Morgan USD Emerging Markets Bond ETF',-13.095,-0.0129,91.595,11,11,90.86,0.0042,0,0,1007.545,999.46,5.01,0,'USD',92.0505,1430.4,'USA','USA','NDEMB'),
    ('GOOGL','Alphabet Inc. Class A',165.3299,0.0406,193.4381,21,21,202.3,0.0353,0,0,4062.2001,4248.3,20.77,0,'USD',194.4271,1430.4,'USA','USA','NDGOOGL'),
    ('IEF','iShares 7-10 Year Treasury Bond ETF',-35.872,-0.0339,95.9583,11,11,93.17,0.0022,0,0,1055.542,1024.87,5.2,0,'USD',96.4311,1430.4,'USA','USA','NDIEF'),
    ('IEI','iShares 3-7 Year Treasury Bond ETF',-15.77,-0.0149,117.3388,9,9,116.17,0.0012,0,0,1056.05,1045.53,5.25,0,'USD',117.9222,1430.4,'USA','USA','NDIEI'),
    ('JNJ','Johnson & Johnson',-147.39,-0.0747,164.34,12,12,152.85,0.0112,0,0,1972.08,1834.2,9.51,0,'USD',165.1325,1430.4,'USA','USA','NYJNJ'),
    ('JPM','JPMorgan Chase & Co.',731.05,0.242,215.77,14,14,269.2,0.0098,0,0,3020.78,3768.8,16.97,0,'USD',216.9821,1430.4,'USA','USA','NYJPM'),
    ('KO','The Coca-Cola Company',-154.26,-0.051,67.15,45,45,64.05,0.0194,0,0,3021.75,2882.25,14.76,0,'USD',67.478,1430.4,'USA','USA','NYKO'),
    ('MCD',"McDonald's Corporation",-48.74,-0.0206,295,8,8,290.37,0.0009,0,0,2360,2322.96,11.7,0,'USD',296.4625,1430.4,'USA','USA','NYMCD'),
    ('MSFT','Microsoft Corporation',-214.72,-0.0263,428.7805,19,19,419.6,-0.0514,0,0,8146.83,7972.4,40.29,0,'USD',430.9011,1430.4,'USA','USA','NDMSFT'),
    ('NVDA','NVIDIA Corporation',11.44,0.0067,121.94,14,14,123.37,-0.0027,0,0,1707.16,1727.18,8.58,0,'USD',122.5529,1430.4,'USA','USA','NDNVDA'),
    ('PG','The Procter & Gamble Company',-65.55,-0.0225,170.76,17,17,167.75,0.0091,0,0,2902.92,2851.75,14.38,0,'USD',171.6059,1430.4,'USA','USA','NYPG'),
    ('SGOV','iShares 0-3 Month Treasury Bond ETF',-2.975,-0.0029,100.4655,10,10,100.67,0.0003,0,0,1004.655,1006.7,5.02,0,'USD',100.9675,1430.4,'USA','USA','NYSGOV'),
    ('SHV','iShares Short Treasury Bond ETF',-3.5798,-0.0032,110.2869,10,10,110.48,0.0002,0,0,1102.8698,1104.8,5.51,0,'USD',110.838,1430.4,'USA','USA','NDSHV'),
    ('SHY','iShares 1-3 Year Treasury Bond ETF',-6.135,-0.0057,82.3211,13,13,82.26,0.0004,0,0,1070.175,1069.38,5.34,0,'USD',82.7319,1430.4,'USA','USA','NDSHY'),
    ('TLH','iShares 10-20 Year Treasury Bond ETF',-55.9597,-0.0529,105.7309,10,10,100.65,0.0038,0,0,1057.3097,1006.5,5.15,0,'USD',106.246,1430.4,'USA','USA','NYTLH'),
    ('TLT','iShares 20+ Year Treasury Bond ETF',-79.87,-0.0764,95.0036,11,11,88.2,0.0022,0,0,1045.04,970.2,5.03,0,'USD',95.4609,1430.4,'USA','USA','NDTLT'),
    ('TSLA','Tesla, Inc.',-205.4,-0.0487,421.33,10,10,402.85,0.0353,0,0,4213.3,4028.5,20.6,0,'USD',423.39,1430.4,'USA','USA','NDTSLA'),
    ('TSM','Taiwan Semiconductor Manufacturing Company Limited (ADR)',483.1638,0.1306,184.8548,20,20,210,0.0379,0,0,3697.0962,4200,19.74,0,'USD',185.8418,1430.4,'USA','USA','NYTSM');

