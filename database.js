

const mysql = require('mysql2');
const fs= require('fs');
var dotenv=require('dotenv');
dotenv.config();

//require("./gen_params");
	let HOST     =require("./gen_params").HOST     ;
	let USER     =require("./gen_params").USER     ;
	let PASSWORD =require("./gen_params").PASSWORD ;
	let DATABASE =require("./gen_params").DATABASE ;
console.log("database.HOST	=",HOST	);
console.log("database.USER	=",USER	);
console.log("database.PASSWORD=",PASSWORD);
console.log("database.DATABASE=",DATABASE);
const connection= mysql.createConnection({
	host:		HOST		,
 	user:		USER		,
  	password:	PASSWORD	,
   	database:	DATABASE	,
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
