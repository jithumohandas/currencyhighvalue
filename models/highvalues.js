var mongoose = require('mongoose');

// Schema definition - highvalues collection
var highvalues = mongoose.Schema({
	currency_code: {type: String, required: true},
	name: {type: String, required: true},
	value: {type: Number, required: true, default: 0}
}, {timestamps: true, collection:'highvalues'});

// Add index on date_modified
highvalues.index({date_modified:1});
highvalues.index({currency_code:1}, {unique:true});

// Function: To populate the collection for the first time with available currency ciode and names
// Param1 : currency_code : ISO 3 letter currency code
// Param2 : name : Currency full name
highvalues.statics.populateCollection = function(currency_code, name, cb)	{

	var condition = {"currency_code": currency_code};

	var updateData = {$set: {"name": name, "value":0}};

	var options = {upsert: true};

	this.update(condition, updateData, options, cb);
	
};

// Function: Update currency value
// Param1 : currency_code : ISO 3 letter currency code
// Param2 : value : value passed from controller if it is higher than current value
highvalues.statics.updateValue = function(currency_code, value, cb)	{

	var condition = {"currency_code": currency_code};

	var updateData = {$set: {"value": value}};

	var options = {};

	this.update(condition, updateData, options, cb);
	
};

// Function: Get all currencies and current highest values
highvalues.statics.getAllHighValues = function(cb)	{

	this.find({}, {_id:0, name:0, updatedAt:0, createdAt:0}, cb);
	
};

// Function: Get all values updated within last 30 minutes
// Since we are updating only highest values of currencies, 
// this will return array of currencies that has gone all time high value
highvalues.statics.getCurrentHighValues = function(cb)	{

	var query = {
				    updatedAt: {
				        $gt: new Date(Date.now() - 1000 * 60 * 10)
				    }
				};

	this.find(query, {_id:0, updatedAt:0, createdAt:0}, cb);
	
};




exports.inithighvalues = mongoose.model('highvalues', highvalues);