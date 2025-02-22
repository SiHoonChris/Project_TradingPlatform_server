var express = require('express');
var router = express.Router();
const CONN = require('../../db/MySQL/Connection');
const Query = require('../../db/MySQL/Query/expense/TransactionHistory');

router.get('/', async function (req, res) {
  let [tType, eMin, eMax, dFrom, dTo] = [
    `%${req.query.TransactionType}%`,
    `${Number(req.query.ExpenseMin)}`,
    `${Number(req.query.ExpenseMax)}`,
    `${req.query.DateFrom}`,
    `${req.query.DateTo}`
  ];

  let dataForTable = {
    data: [],
    expenseTotal: 0
  };

  try {
    // Create promises for both queries
    let transactionHistoryPromise = new Promise((resolve, reject) => {
      CONN.query(
        Query['getTransactionHistoryDataForTable'].query,
        [
          tType, tType, eMin, eMax, 
          tType, eMin, eMax,
          tType, eMin, eMax,
          dFrom, dTo
        ],
        (err, rows) => {
          if (err) return reject(err);
          dataForTable.data = rows;
          resolve();
        }
      );
    });

    let expenseSumPromise = new Promise((resolve, reject) => {
      CONN.query(
        Query['getExpenseSumForTable'].query,
        [ 
          tType, tType, dFrom, dTo, eMin, eMax, 
          tType, dFrom, dTo, eMin, eMax, 
          tType, dFrom, dTo, eMin, eMax
        ],
        (err, rows) => {
          if (err) return reject(err);
          dataForTable.expenseTotal = Number(rows[0]?.expenseTotal || 0); // Handle possible undefined value
          resolve();
        }
      );
    });

    // Wait for both queries to complete
    await Promise.all([transactionHistoryPromise, expenseSumPromise]);

    // Send response after both queries are done
    console.log("express server")
    console.log(dataForTable);
    res.json(dataForTable);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database query error" });
  }
});

module.exports = router;
