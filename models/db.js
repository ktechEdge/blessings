const mySql = require('mysql2');

const pool = mySql.createPool({
    connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.USER2,
    password: process.env.PASSWORD,
    database: process.env.DATABASE2
});
    
module.exports = pool.promise();