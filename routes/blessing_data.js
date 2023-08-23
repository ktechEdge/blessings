
var express = require('express');

var router = express.Router();

var db_M = require('../database');
var database = db_M.pool;

var dotenv=require('dotenv');
dotenv.config();

var FetchStream = require("fetch").FetchStream;


router.get("/", function(request, response, next){

	response.render("blessing_data", {again:0});

});

router.get("/repository", function(request, response, next){
    
	var query = "SELECT * FROM blessing_smartblessings  ";

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.render('RepositoryOfBlessings', {blessingData:data});
		}

	});


	

});




router.post("/add_phone_number", function(request, response, next){

	 var phone_number = request.body.phone_number;
      console.log(phone_number.length);

    
	let min = 1000;
    let max = 9999;
    var validated = Math.floor(Math.random() * (max - min + 1)) + min;
	var flag=0;
    var cus=0;



	if(phone_number.length==10){
var fetch = new FetchStream(`http://www.micropay.co.il/ExtApi/ScheduleSms.php?get=1&charset=utf-8&uid=${process.env.UID}&un=${process.env.UN}&from=${process.env.FROM}&msg=Your_Code:${validated}&list=XXX(${phone_number})`);
 
 


	
  var query = `
	INSERT INTO blessing_smartblessings  
	(phone_number,validated,identification,customercode) 
	VALUES ("${phone_number}","${validated}","${flag}","${cus}")
	`;


	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{

			console.log(data);
			 
				 response.render("Customer_Code", {phone:phone_number,again:0,id:data.insertId});
		     
		
		
		}

	});

}
else{


 response.render("blessing_data", {again:1});


}

});




router.post("/valid", function(request, response, next){

	var customercode = request.body.customercode;
	var phoneV=request.body.phone;
	var idx=request.body.id;
	console.log(phoneV);
    
			
	

	
      
	 if(customercode)
    {
		
        query = `
		SELECT * FROM blessing_smartblessings 
        WHERE validated = "${customercode}"&&phone_number = "${phoneV}"&&id = "${idx}"

        `;
          
        database.query(query, function(error, data){

            if(data.length > 0)
            {
                for(var count = 0; count < data.length; count++)
                {
                    if(data[count].validated == customercode&&data[count].phone_number == phoneV)
                    {
					
					   
						
                        
						
					   response.render("blessing_details", {phonet:phoneV,id:idx,mass:0,valb:0,Banned:0});
                            
                    }
                   
					
                }
               
				


            }
            else
            {
                
				response.render("Customer_Code", {phone:phoneV,again:1,id:idx});
            }

            
        });
    }
  




});






module.exports = router;