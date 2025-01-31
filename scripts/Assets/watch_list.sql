/* 관심 종목 */
CREATE TABLE watch_list (
    asset_name  VARCHAR(512) NOT NULL,
    asset_code  VARCHAR(256) NOT NULL,
    currency    VARCHAR(10) NOT NULL
);

INSERT INTO watch_list VALUES 
   ('Palantir Technologies Inc.', 'PLTR', 'USD'),
   ('Amazon.com, Inc.', 'AMZN', 'USD'),
   ('Quantum Computing Inc.', 'QUBT', 'USD'),
   ('Lockheed Martin Corporation', 'LMT', 'USD'),
   ('General Dynamics Corporation', 'GD', 'USD'),
   ('Eli Lilly and Company', 'LLY', 'USD'),
   ('Novo Nordisk A/S', 'NVO', 'USD'),
   ('Palo Alto Networks, Inc.', 'PANW', 'USD'),
   ('Samsung Electronics Co., Ltd.', '005930', 'KRW'),
   ('Samsung Electronics Co., Ltd. (Preferred Shares)', '005935', 'KRW'),
   ('SK hynix Inc.', '000660', 'KRW');

/* 조회 */
select * from watch_list order by currency desc; -- 국내 종목이 먼저 나오지 않도록
