var mongoose = require('mongoose');

// Schema definition - usercurrency collection
var usercurrency = mongoose.Schema({
	userid: {type: Number, required: true},
	currency: {type: String, required: true},
	date_modified: {type: Date, default: Date.now},
}, {collection:'usercurrency'});

// Add composite index on userid and currency
usercurrency.index({userid:1, currency:1}, {unique:true});

// Function: To save userid and currency to the currency collection
// Param1 : userid : user id received through URL from controller
// Param2 : currency : the currency ISO code recieved through PUT request JSON
usercurrency.statics.saveUserCurrency = function(userid, currency, cb)	{
	
	var userCurrencyModelObj = new exports.initusercurrency({"userid":userid, "currency":currency});

	userCurrencyModelObj.save(cb);
	
};

// Function: Delete a document from currency collection
// Param1 : userid : user id received through URL from controller
// Param2 : currency : Currency ISO value received through URL from controller
usercurrency.statics.removeUserCurrency = function(userid, currency, cb)	{
	
	this.remove({"userid":userid, "currency":currency}, cb);
	
};

// Function: Get all currencies assocuated with a user
// Param1 : userid : user id received through URL from controller
usercurrency.statics.getUserCurrencies = function(userid, cb)	{
	
	this.find({"userid":userid},{__v:0, _id:0, date_modified:0, userid: 0}, cb);
	
};


exports.initusercurrency = mongoose.model('usercurrency', usercurrency);