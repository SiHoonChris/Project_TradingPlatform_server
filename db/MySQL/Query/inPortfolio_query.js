module.exports = {
    getPortfolioData:
      { 
        query: 
          `
            SELECT  ticker, 
                    stock_name, 
                    purchase_amount * exchange_rate as purchased, 
                    valuation_amount * exchange_rate as valued
            FROM    foreign_stock_in_portfolio

            UNION ALL

            SELECT  stock_code as ticker, 
                    stock_name, 
                    purchase_amount as purchased, 
                    valuation_amount as valued
            FROM    domestic_stock_in_portfolio
          ` 
      }
}
