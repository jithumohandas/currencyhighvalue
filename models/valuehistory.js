var mongoose = require('mongoose');

// Schema definition - valuehistory collection
var valuehistory = mongoose.Schema({
	currency_code: {type: String, required: true},
	base_code: {type: String, required: true},
	value: {type: Number, required: true, default: 0},
	date_modified: {type: Date, default: Date.now},
}, {collection:'valuehistory'});

// Add indexes
valuehistory.index({currency_code:1, base_code:1});

// Function: To save the value of currency based on the base currency.
// Param1 : currency_code : Currency ISO code
// Param2 : base_code : base currency ISO code
// Param3 : value : value of the currency based on base currency
valuehistory.statics.addValueData = function(currency_code, base_code, value, cb)	{
	
	var valueHistoryObj = new exports.initvaluehistory({"currency_code":currency_code, "base_code":base_code, "value":value});

	valueHistoryObj.save(cb);
	
};

exports.initvaluehistory = mongoose.model('valuehistory', valuehistory);