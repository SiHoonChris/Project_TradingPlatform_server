const mysql = require('mysql');
require('dotenv').config();

const dbConfig = ({
  database: process.env.DB_DATABASE,  
  host: process.env.DB_HOST, 
  port: process.env.DB_PORT,
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD 
});
// host에서 port번호 분리 안해주면
// errno: -3008, code: 'ENOTFOUND', syscall: 'getaddrinfo'

const connection = mysql.createPool(dbConfig);

module.exports = connection;
