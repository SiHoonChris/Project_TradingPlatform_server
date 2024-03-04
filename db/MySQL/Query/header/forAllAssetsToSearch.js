module.exports = {
    getAllAssetsData:
      { query:
            "SELECT * FROM us_market \
            UNION ALL SELECT * FROM korea_market \
            UNION ALL SELECT * FROM shanghai_market \
            UNION ALL SELECT * FROM crypto_market \
            UNION ALL SELECT * FROM hongkong_market \
            UNION ALL SELECT * FROM singapore_market \
            ORDER BY NAME, TICKER ASC"
      }
}
