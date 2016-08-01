var router = require('express').Router();

var currencyCtrlr = require('../controllers/currency'); 

// Healthcheck URL
// Purpose: To ensure the server is running
// Success response: 'OK' eisth status code 200/304 will be seen on accessing 127.0.0.1:9001
router.get('/', function(req, res){
	res.send('OK');
});

// PUT Request handlers
// Purpose: To recieve the user id and currency
// Response status codes:
// code 400 - Either the userid is wrong or the currency is not defined.
// code 409 - conflict. Indicates the saving data is already there in the MongoDB collection
// code 201 - Successfully inserted the userid and the currency
router.put('/add/currency/:id', currencyCtrlr.saveData);

// DELETE Request handlers
// Purpose: Deletes a single currency mentioned through URL from the linked userid
// Response status codes:
// code 400 - Indicates problem in deleting the data
// code 200 - Successfully deleted the userid - currency combination.
router.delete('/remove/:currency/:id', currencyCtrlr.deleteData);

// GET Request handlers
// Purpose: Retrieve all currencies associated with provoded userid
// Response status codes:
// code 400 - Error condition in retrieving the data
// code 200 - for correct response with array of currencies
router.get('/user/:id', currencyCtrlr.getUserData);


// GET Request handlers
// Purpose: To serve a view file with multi channel currency listeners
// Response status codes:
// code 404 - No available
// code 200 - when the page is served correctly
router.get('/show/values/:id', currencyCtrlr.servePage);



router.get('/test/allcurrencies', currencyCtrlr.availableCurrencies);
router.get('/test/realtimevalues', currencyCtrlr.realTimeValues);


module.exports = router;
