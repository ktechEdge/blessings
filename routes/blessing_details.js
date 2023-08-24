
var express = require('express');

var router = express.Router();

//var database = require('../database');
var db_M = require('../database');
var database = db_M.pool;

var bannedWordsFile = require('../bannedWords.json');





router.post("/add_blessing_details", function(request, response, next){
	
	var full_name = request.body.full_name;
	var the_blessing = request.body.the_blessing;
	var phoneCustomer=request.body.phonet;
	var idx=request.body.id;
	console.log("phonec"+phoneCustomer);
	console.log("blessing "+the_blessing);
	 var textColor = request.body.textColor;
	var bgColor =  request.body.bgColor;
	console.log("textColor "+textColor);
	console.log("bgColor "+bgColor);
    
      	if(full_name.indexOf('"')!=-1){

		full_name = full_name.replace(/"/g, '\\"');

	}
	if(the_blessing.indexOf('"')!=-1){
          
  
	the_blessing = the_blessing.replace(/"/g, '\\"');

	}
	
	
if(full_name.length>0&&the_blessing.length>0){

	const bannedWords = bannedWordsFile.bannedWords;

	const filterForm = formData => {
	  const formArray = Object.values(formData);
	  const filteredFormArray = formArray.filter(value => {
		if (typeof value === 'string') {
		  for (let i = 0; i < bannedWords.length; i++) {
			if (value.includes(bannedWords[i])) {
			  return false;
			}
		  }
		}
		return true;
	  });
	  return Object.fromEntries(
		Object.entries(formData).filter(([key, value]) =>
		  filteredFormArray.includes(value)
		)
	  );
	};
	
	
	  const formData = {
		name: full_name,
		blessing: the_blessing
	  };
	  const filteredFormData = filterForm(formData);
	  if (Object.keys(formData).length !== Object.keys(filteredFormData).length) {
		
		console.log('Banned words found in form data');
		response.render("blessing_details",{phonet:phoneCustomer,id:idx,mass:1,valb:the_blessing,Banned:-1});
		
	  } else {
		
		console.log(filteredFormData);
	
	var query = `
	       UPDATE  blessing_smartblessings 
          SET full_name = "${full_name}", the_blessing = "${the_blessing}",textColor ="${textColor}",bgColor ="${bgColor}" 
              WHERE phone_number = "${phoneCustomer}"&&identification = 0&&customercode=0&&id="${idx}"
	`;
	

	database.query(query, function(error, data){
        
          
			if(error)
			{
				throw error;
			}	
			else
			{

			    var q2 = `
	       SELECT * FROM blessing_smartblessings  
                 
              WHERE phone_number = "${phoneCustomer}"&&customercode=0&&id="${idx}"
	`;
	

	database.query(q2, function(error, data){
             if(data.length>0){


			 
           console.log("dat" +data.length);
			if(error)
			{
				throw error;
			}	
			else
			{

				var q = `
				UPDATE blessing_smartblessings   SET customercode = 1 WHERE id = "${idx}"
				`;
			 
			 
				database.query(q, function(error, data){
			 
					if(error)
					{
						throw error;
					}	

			
				
				response.render("blessing_data", {again:2});

			
					
			 
				});

			}


		}

		else{

			response.render("blessing_data", {again:3});

		}
		

	});
                 
			}


		

		
		

	});
}

}




	

});

module.exports = router;
