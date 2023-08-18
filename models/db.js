const mySql = require('mysql2');

const pool = mySql.createPool({
    connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
    
module.exports = pool.promise();