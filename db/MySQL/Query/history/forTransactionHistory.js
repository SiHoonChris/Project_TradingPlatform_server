module.exports = {
    getTransactionHistory:
      { query:
            `SELECT   Date, Transaction, Detail, Name, 
                      Price, Fx_Rate, Amount,
                      Deposit, Withdraw, Dividend,
	                (CASE WHEN Transaction = 'Trading'  THEN Price * Amount 
                            WHEN Transaction = 'Exchange' THEN Fx_Rate * Amount 
                            WHEN Transaction = 'Banking' AND Detail = 'Deposit'  THEN Deposit
                            WHEN Transaction = 'Banking' AND Detail = 'Withdraw' THEN Withdraw
			          WHEN Transaction = 'Banking' AND Detail = 'Dividend' THEN Dividend
		          END) AS Value,
                      Currency
               FROM   Transaction_History 
              WHERE   (Transaction LIKE ? OR Detail LIKE ?)
		          AND Name LIKE ?
                      AND (Date >= ? AND Date <= ?) OR Date LIKE "?%" 
            ORDER BY  Date DESC`
      }
}
