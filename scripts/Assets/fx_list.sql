/* 환율 리스트 */
CREATE TABLE fx_list (
    currency_fx  VARCHAR(20) NOT NULL
);

INSERT INTO fx_list VALUES 
    ('USD/KRW'),
    ('CNY/KRW'),
    ('JPY/KRW'),
    ('HKD/KRW'),
    ('SGD/KRW'),
    ('EUR/KRW'),
    ('GBP/KRW');

/* 조회 */
select * from fx_list;
