const mySql = require('mysql2');
//require("../gen_params");
let HOST      =require("../gen_params").HOST     ;
let USER2     =require("../gen_params").USER2     ;
let PASSWORD  =require("../gen_params").PASSWORD ;
let DATABASE2 =require("../gen_params").DATABASE2 ;
console.log("db.HOST 	 =",HOST 	);
console.log("db.USER2	 =",USER2	);
console.log("db.PASSWORD =",PASSWORD );
console.log("db.DATABASE2=",DATABASE2);

const pool = mySql.createPool({
    connectionLimit: 10,
    host:       HOST,
    user:       USER2,
    password:   PASSWORD,
    database:   DATABASE2
});
    
module.exports = pool.promise();