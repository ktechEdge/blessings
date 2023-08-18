

const mysql = require('mysql2');
const fs= require('fs');
var dotenv=require('dotenv');
dotenv.config();

const connection= mysql.createConnection({
	host:process.env.HOST,
 	user:process.env.USER,
  	password:process.env.PASSWORD,
   	database:process.env.DATABASE,
   /* port:3306,
	charset: 'utf8mb4',*/
	//  ssl:{ca:fs.readFileSync("DigiCertGlobalRootCA.crt.pem")}
	
	
	});

connection.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('MySQL Database is connected Successfully');
	}
});

module.exports = connection;
