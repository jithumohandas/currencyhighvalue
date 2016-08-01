var mongoose = require('mongoose');
var restler = require('restler');
var config = require('./config.json');

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '196898',
  key: '33b3b7362dac16459737',
  secret: '8319cf8862830b217a4c',
  cluster: 'ap1',
  encrypted: true
});


// highvalues model initilization
var highvaluesModelObj = require('./models/highvalues').inithighvalues;

// values history collection model initislization
var valueHistoryModelObj = require('./models/valuehistory').initvaluehistory;

// MongoDB database connection options
var mongoOptions = {
    server: {
        auto_reconnect: true,
        poolSize: 10
    }
};

// Connection URL to the DB 
//var mongourl = "mongodb://"+config.mongodb.username+":"+config.mongodb.password+"@"+config.mongodb.host+":"+config.mongodb.port+"/"+config.mongodb.dbname;
var mongourl = "mongodb://"+config.mongodb.host+":"+config.mongodb.port+"/"+config.mongodb.dbname;

// Establish connection to teh mongoDB 
mongoose.connect(mongourl, mongoOptions, function(err) {
    
    if(err) {
      
       console.log(new Date() + ':Error connecting to: ' + mongourl + '. ' + err);
    
    } else {
       
        console.log(new Date() + ':Successfully connected to: ' + mongourl);

    	if(process.argv[2] == "init")
    	{

	        console.log(new Date() + ': Starting to populate the highvalues collection - Intial setup');

	        initPopulation();

	    } else {

	    	console.log(new Date() + ': Starting to update the highvalues collection.');

	    	updateRealTimeValues();

	    }

    }
});

// This function is to add each active currency name to the DB during intilaization process
// param1: dataSet : each object available in the "CurrencyList"
function dataInsert(dataSet, dummycb)	{
	
	highvaluesModelObj.populateCollection(dataSet.Symbol, dataSet.Name, function(error, data){
		
		if(error)
		{
			console.log(new Date() + ': Error in updating the active currency list.');
			console.log(error);
			
			process.exit(0);
		}

		dummycb();
	});

}

// This function will update the high value of a currency in highvalues collection
// param1: dataSet : each currency value object available as a response to realtime value check
function updateValue(dataSet, dummycb)	{
	
	highvaluesModelObj.updateValue(dataSet.QuoteCurrency, dataSet.Mid, function(error, data){
		
		if(error)
		{
			console.log(new Date() + ': Error in updating the active currency list.');
			console.log(error);
			
			process.exit(0);
		}

		dummycb();
	});

}

// To add historic values of currencies
// This will be populated with all active currency values currently available from the API
// irrespective of the value is higher than the existing DB value
// param1: dataSet : each currency object available with all values
function insertHistoryValues(dataSet, dummycb)	{

	valueHistoryModelObj.addValueData(dataSet.QuoteCurrency, dataSet.BaseCurrency, dataSet.Mid, function(error, data){

		if(error)
		{
			console.log(new Date() + ': Error in inserting history data.');
			console.log(error);
			
			process.exit(0);
		}

		dummycb();
	});
}

// Pusher push function
// A message is pushed through web scoket to the cliennt with currency code and vale when the currency reach alltime high
function pushToChannel(eachHighValueObj, dummycb)	{

	pusher.trigger(eachHighValueObj.currency_code, 'my_event', {
	  "currency": eachHighValueObj.currency_code,
	  "value":eachHighValueObj.value
	}, null, function(err, req, res){
		dummycb();
	});

}

// A callback to continue the loop after successful operation of any async task
function dummycb() {}

// Add all active currencies to the DB using API result
// stub is used instead of the real API
// To perform the initial setup operation, run command
// node setup.js init 
// init - command line argiment indicates that this is to do the initial setup
function initPopulation()	{
	restler.get('http://127.0.0.1:9001/test/allcurrencies').on('complete', function(result) {
	  
	  if (result instanceof Error) {
	    
	    console.log('Error:', result.message);
	  
	  } else {
	    
	    console.log(new Date() + ': Total currencies available in active list - ' + result.CurrencyList.length);

	    // Update all the active currencies currently served from the forex API
	    require('async').eachLimit(result.CurrencyList, 1, dataInsert, function(){

	    	console.log(new Date() + ': Successfully updated active currencies in highvalues collection.');

	    	process.exit(0);

	    });

	  }

	});
}

// This function will keep checking the active currency values and updating the value when it hits maximum
// The base currency is used as EURO
// A stub URL is used instead of the real API because of the number of request limitation to the real API
// This can run/configured as a cron job executing once in every hour
// command to execute this hourly check operation and update of the DB with highest currency value
// node setup.js
function updateRealTimeValues()	{

	restler.get('http://127.0.0.1:9001/test/realtimevalues').on('complete', function(result) {
	  
	  if (result instanceof Error) {
	    
	    console.log('Error:', result.message);
	  
	  } else {
	    
	    // Length of Array of currency values available from the API 
	    console.log(new Date() + ': Total values available - ' + result.length);

	    // To hold that currency objects whose values has gone all time high
	    var updateArray = [];

	    // Insert all available currency values into a valuehistory collection for future reference
	    require('async').eachLimit(result, 1, insertHistoryValues, function(){

			console.log(new Date() + ': Successfully added history values data.');

			// Get all currently saved high values of all currencies in the DB
		    highvaluesModelObj.getAllHighValues(function(err, data){

		    	// Loop through to compare all current DB values with the values received through API response
		    	for(var k = 0; k < result.length; k++)
		    	{
		    		for(var l = 0; l < data.length; l++)
		    		{
		    			
		    			if(data[l].currency_code == result[k].QuoteCurrency && data[l].value == 0)
		    			{
		    				data[l].value = result[k].Mid;
		    				
		    				updateArray.push(result[k]);
		    			}
		    			if(data[l].currency_code == result[k].QuoteCurrency && result[k].Mid < data[l].value)
		    			{
		    				updateArray.push(result[k]);
		    			}

		    		}
		    	}

				console.log(new Date() + ': data to be updated in high values collection :' + updateArray.length);

				// Update all newly recieved high values
				require('async').eachLimit(updateArray, 1, updateValue, function(){

					console.log(new Date() + ': Successfully updated realtime currency values.');

					//process.exit(0);

					 highvaluesModelObj.getCurrentHighValues(function(err, HighValuedata){

						if(err)
						{
							console.log(new Date() + ': Error in inserting history data.');
							console.log(error);
							
							process.exit(0);
						}
						else
						{
							console.log(HighValuedata);
							
							if(HighValuedata.length > 0)
							{
								require('async').eachLimit(HighValuedata, 1, pushToChannel, function(){

									process.exit(0);

								});
							}
							else
							{
								process.exit(0);
							}
						}

					 });

		    	});

		    });
		});

	  }

	});
}