// usercurrency model initilization
var ucModelObj = require('../models/usercurrency').initusercurrency;

// Type of request: PUT
// URI: /add/currency/:id
// Responsibility: 
// 1. Fetch the data from the URI and PUT request.
// 2. Save curency with userid
exports.saveData = function(req, res)	{
	
	// Data verification code
	// console.log(req.params.id);
	// console.log(req.body.currencyiso);
	
	var userid = parseInt(req.params.id);
	
	// check the validity of incoming data
	if(userid != req.params.id || typeof(req.body.currencyiso) == "undefined")
	{
		res.sendStatus(400);
		return;
	}
	else
	{
		// Model save function invokded
		// Purpose: to save the userid and chosen currency
		ucModelObj.saveUserCurrency(userid, req.body.currencyiso, function(err, dbresp){
			
			if(err)
			{
				// On  error, check if the error is due to the duplicate userid - currency combination
				if(err.code == 11000 && typeof(err.code) != "undefined")
				{
					res.sendStatus(409);
				}
				else
				{
					console.log("Error in Controller:currency - Function:saveData");
					console.log(err);
					res.send(400);
				}
				return;
			}
			else
			{
				// Successfully created new document with userid and currency data in the currency collection
				res.sendStatus(201);
				return;
			}
		});
	}
		
};

// URI: /remove/:currency/:id
// Responsibility: 
// This function will delete a currecy - userid combination.
// userid and currency code is received through query parameters.
exports.deleteData = function(req, res)	{
	// Data verification code
	//console.log(req.params.id);
	//console.log(req.params.currency);
	
	var userid = parseInt(req.params.id);
	
	ucModelObj.removeUserCurrency(userid, req.params.currency, function(err, dbresp){
		
		if(err)
		{
			console.log("Error in Controller:currency - Function:deleteData");
			console.log(err);
			res.send(400);
			return;
		}
		else
		{
			// Deleted successfully
			res.sendStatus(200);
			return;
		}
	});
};

// URI: /user/:id
// Responsibility: 
// This function will retrieve all currencies associted with a user id.
// userid is received through a query parameter.
exports.getUserData = function(req, res)	{
	// Data verification code
	//console.log(req.params.id);
	
	var userid = parseInt(req.params.id);
	
	ucModelObj.getUserCurrencies(userid, function(err, dbresp){
		
		if(err)
		{
			console.log("Error in Controller:currency - Function:getUserData");
			console.log(err);
			res.send(400);
			return;
		}
		else
		{
			res.json(dbresp)
			return;
		}
	});
};


// URI: /show/values/:id
// Responsibility: 
// To serve a page with all currencies which users are interested in
// The value will change when the currencies gi all time high
exports.servePage = function(req, res)	{
	
	var userid = parseInt(req.params.id);
	
	ucModelObj.getUserCurrencies(userid, function(err, dbresp){
		
		if(err)
		{
			console.log("Error in Controller:currency - Function:getUserData");
			console.log(err);
			res.send(400);
			return;
		}
		else
		{
			res.render('usercurrencies',{"ctrldata":dbresp});
			return;
		}
	});
};



exports.availableCurrencies = function(req, res)	{
	var allCurrencies = {
"Outcome": "Success",
"Message": null,
"Identity": "Request",
"Delay": 0.00428,
"CurrencyList": [
{
"Symbol": "AED",
"Name": "UAE dirham",
"Plural": "UAE dirhams",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "AE",
"Name": "United Arab Emirates"
}
]
},
{
"Symbol": "AFN",
"Name": "Afghan afghani",
"Plural": "Afghan afghanis",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "AF",
"Name": "Afghanistan"
}
]
},
{
"Symbol": "ALL",
"Name": "Albanian lek",
"Plural": "Albanian leke",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "AL",
"Name": "Albania"
}
]
},
{
"Symbol": "AMD",
"Name": "Armenian dram",
"Plural": "Armenian dram",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "AM",
"Name": "Armenia"
}
]
},
{
"Symbol": "ANG",
"Name": "Netherlands Antillean guilder",
"Plural": "Netherlands Antillean guilders",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "CW",
"Name": "Curacao"
},
{
"Code": "SX",
"Name": "Sint Maarten"
}
]
},
{
"Symbol": "AOA",
"Name": "Angolan kwanza",
"Plural": "Angolan kwanza",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "AO",
"Name": "Angola"
}
]
},
{
"Symbol": "ARS",
"Name": "Argentine peso",
"Plural": "Argentine pesos",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "AR",
"Name": "Argentina"
}
]
},
{
"Symbol": "AUD",
"Name": "Australian dollar",
"Plural": "Australian dollars",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "AU",
"Name": "Australia"
},
{
"Code": "AU",
"Name": "Christmas Island"
},
{
"Code": "CC",
"Name": "Cocos (Keeling) Islands"
},
{
"Code": "HM",
"Name": "Heard Island and McDonald Islands"
},
{
"Code": "KI",
"Name": "Kiribati"
},
{
"Code": "NA",
"Name": "Nauru"
},
{
"Code": "AU",
"Name": "Norfolk Island"
}
]
},
{
"Symbol": "AWG",
"Name": "Aruban florin",
"Plural": "Aruban florin",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "AW",
"Name": "Aruba"
}
]
},
{
"Symbol": "AZN",
"Name": "Azerbaijanian manat",
"Plural": "Azerbaijanian manat",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "AZ",
"Name": "Azerbaijan"
}
]
},
{
"Symbol": "BAM",
"Name": "Bosnia and Herzegovina convertible mark",
"Plural": "Bosnia and Herzegovina convertible marks",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "BA",
"Name": "Bosnia and Herzegovina"
}
]
},
{
"Symbol": "BBD",
"Name": "Barbadian dollar",
"Plural": "Barbadian dollars",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "BB",
"Name": "Barbados"
}
]
},
{
"Symbol": "BDT",
"Name": "Bangladeshi tak",
"Plural": "Bangladeshi taka",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "BD",
"Name": "Bangladesh"
}
]
},
{
"Symbol": "BGN",
"Name": "Bulgarian lev",
"Plural": "Bulgarian leva",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "BG",
"Name": "Bulgaria"
}
]
},
{
"Symbol": "BHD",
"Name": "Bahraini dinar",
"Plural": "Bahraini dinara",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "BH",
"Name": "Bahrain"
}
]
},
{
"Symbol": "BIF",
"Name": "Burundi franc",
"Plural": "Burundi francs",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "BI",
"Name": "Burundi"
}
]
},
{
"Symbol": "BMD",
"Name": "Bermudian dollar",
"Plural": "Bermudian dollars",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "BM",
"Name": "Bermuda"
}
]
},
{
"Symbol": "BND",
"Name": "Brunei dollar",
"Plural": "Brunei dollars",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "BN",
"Name": "Brunei Darussalam"
}
]
},
{
"Symbol": "BOB",
"Name": "Bolivian boliviano",
"Plural": "Bolivian bolivianos",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "BO",
"Name": "Bolivia"
}
]
},
{
"Symbol": "BRL",
"Name": "Brasilien real",
"Plural": "Brasilien reais",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "BR",
"Name": "Brazil"
}
]
},
{
"Symbol": "BSD",
"Name": "Bahamian dollar",
"Plural": "Bahamian dollars",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "BS",
"Name": "Bahamas"
}
]
},
{
"Symbol": "BTC",
"Name": "Bitcoin",
"Plural": "Bitcoins",
"Active": true,
"Digital": true,
"Message": null,
"Countries": [
null
]
},
{
"Symbol": "BTN",
"Name": "Bhutanese ngultrum",
"Plural": "Bhutanese ngultrum",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "BT",
"Name": "Bhutan"
}
]
},
{
"Symbol": "BWP",
"Name": "Botswanan pula",
"Plural": "Botswanan pulas",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "BW",
"Name": "Botswana"
}
]
},
{
"Symbol": "BYR",
"Name": "Belarusian ruble",
"Plural": "Belarusian ruble",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "BY",
"Name": "Belarus"
}
]
},
{
"Symbol": "BZD",
"Name": "Belize dollar",
"Plural": "Belize dollars",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "BZ",
"Name": "Belize"
}
]
},
{
"Symbol": "CAD",
"Name": "Canadian dollar",
"Plural": "Canadian dollars",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "CA",
"Name": "Canada"
}
]
},
{
"Symbol": "CDF",
"Name": "Congolese franc",
"Plural": "Congolese francs",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "CG",
"Name": "Congo, Democratic Republic of the"
}
]
},
{
"Symbol": "CHF",
"Name": "Switzerland Franc",
"Plural": "Switzerland Francs",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "LI",
"Name": "Liechtenstein"
},
{
"Code": "CH",
"Name": "Switzerland"
}
]
},
{
"Symbol": "CLF",
"Name": "Unidad de fomento",
"Plural": "Unidades de fomento",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "CL",
"Name": "Chile"
}
]
},
{
"Symbol": "CLP",
"Name": "Chilean peso",
"Plural": "Chilean pesos",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "CL",
"Name": "Chile"
}
]
},
{
"Symbol": "CNH",
"Name": "Chinese offshore renminbi yuan",
"Plural": "Chinese offshore renminbi yuan",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "CN",
"Name": "China"
}
]
},
{
"Symbol": "CNY",
"Name": "Chinese renminbi yuan",
"Plural": "Chinese renminbi yuan",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "CN",
"Name": "China"
}
]
},
{
"Symbol": "COP",
"Name": "Colombian peso",
"Plural": "Colombian pesos",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "CO",
"Name": "Colombia"
}
]
},
{
"Symbol": "CRC",
"Name": "Costa Rican colon",
"Plural": "Costa Rican colones",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "CR",
"Name": "Costa Rica"
}
]
},
{
"Symbol": "CUP",
"Name": "Cuban peso",
"Plural": "Cuban pesos",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "CU",
"Name": "Cuba"
}
]
},
{
"Symbol": "CVE",
"Name": "Cape Verdean Escudo",
"Plural": "Cape Verdean escudos",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "CV",
"Name": "Cape Verde"
}
]
},
{
"Symbol": "CZK",
"Name": "Czech koruna",
"Plural": "Czech korun",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "CZ",
"Name": "Czech Republic"
}
]
},
{
"Symbol": "DJF",
"Name": "Djiboutian franc",
"Plural": "Djiboutian francs",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "DJ",
"Name": "Djibouti"
}
]
},
{
"Symbol": "DKK",
"Name": "Danish krone",
"Plural": "Danish kroner",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "DK",
"Name": "Denmark"
},
{
"Code": "FO",
"Name": "Faroe Islands"
},
{
"Code": "GL",
"Name": "Greenland"
}
]
},
{
"Symbol": "DOP",
"Name": "Dominican peso",
"Plural": "Dominican pesos",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "DO",
"Name": "Dominican Republic"
}
]
},
{
"Symbol": "DZD",
"Name": "Algerian dinar",
"Plural": "Algerian dinara",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "DZ",
"Name": "Algeria"
},
{
"Code": "EH",
"Name": "Western Sahara"
}
]
},
{
"Symbol": "EGP",
"Name": "Egyptian pound",
"Plural": "Egyptian pounds",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "EG",
"Name": "Egypt"
}
]
},
{
"Symbol": "ERN",
"Name": "Eritrean nakfa",
"Plural": "Eritrean nakfa",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "ER",
"Name": "Eritrea"
}
]
},
{
"Symbol": "ETB",
"Name": "Ethiopian birr",
"Plural": "Ethiopian birr",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "ET",
"Name": "Ethiopia"
}
]
},
{
"Symbol": "EUR",
"Name": "European Union euro",
"Plural": "European Union euros",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "AD",
"Name": "Andorra"
},
{
"Code": "AT",
"Name": "Austria"
},
{
"Code": "PT",
"Name": "Azores"
},
{
"Code": "ES",
"Name": "Baleares (Balearic Islands)"
},
{
"Code": "BE",
"Name": "Belgium"
},
{
"Code": "ES",
"Name": "Canary Islands"
},
{
"Code": "CY",
"Name": "Cyprus"
},
{
"Code": "NL",
"Name": "Dutch (Netherlands)"
},
{
"Code": "IE",
"Name": "Eire (Ireland)"
},
{
"Code": "EE",
"Name": "Estonia"
},
{
"Code": "FI",
"Name": "Finland"
},
{
"Code": "FR",
"Name": "France"
},
{
"Code": "GF",
"Name": "French Guiana"
},
{
"Code": "TF",
"Name": "French Southern Territories"
},
{
"Code": "DE",
"Name": "Germany"
},
{
"Code": "GR",
"Name": "Greece"
},
{
"Code": "GP",
"Name": "Guadeloupe"
},
{
"Code": "NL",
"Name": "Holland (Netherlands)"
},
{
"Code": "VA",
"Name": "Holy See (Vatican City)"
},
{
"Code": "EI",
"Name": "Ireland (Eire)"
},
{
"Code": "IT",
"Name": "Italy"
},
{
"Code": "LU",
"Name": "Luxembourg"
},
{
"Code": "PT",
"Name": "Madeira Islands"
},
{
"Code": "MT",
"Name": "Malta"
},
{
"Code": "MQ",
"Name": "Martinique"
},
{
"Code": "YT",
"Name": "Mayotte"
},
{
"Code": "PM",
"Name": "Miquelon and Saint Pierre"
},
{
"Code": "MC",
"Name": "Monaco"
},
{
"Code": "NL",
"Name": "Netherlands"
},
{
"Code": "PT",
"Name": "Portugal"
},
{
"Code": "FR",
"Name": "Reunion"
},
{
"Code": "FR",
"Name": "Saint Pierre and Miquelon"
},
{
"Code": "NL",
"Name": "Saint-Martin"
},
{
"Code": "SM",
"Name": "San Marino"
},
{
"Code": "SK",
"Name": "Slovakia"
},
{
"Code": "SI",
"Name": "Slovenia"
},
{
"Code": "SP",
"Name": "Spain"
},
{
"Code": "VA",
"Name": "Vatican City (The Holy See)"
},
{
"Code": "EU",
"Name": "European Union"
},
{
"Code": "EU",
"Name": "Europe"
}
]
},
{
"Symbol": "FJD",
"Name": "Fijian dollar",
"Plural": "Fijian dollars",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "FJ",
"Name": "Fiji"
}
]
},
{
"Symbol": "FKP",
"Name": "Falkland Islands pound",
"Plural": "Falkland Islands pounds",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "FK",
"Name": "Falkland Islands (Malvinas)"
},
{
"Code": "FK",
"Name": "Malvinas (Falkland Islands)"
}
]
},
{
"Symbol": "GBP",
"Name": "British pound sterling",
"Plural": "British pounds sterling",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "UK",
"Name": "Britain (United Kingdom)"
},
{
"Code": "UK",
"Name": "England (United Kingdom)"
},
{
"Code": "UK",
"Name": "Great Britain (United Kingdom)"
},
{
"Code": "GS",
"Name": "South Georgia and the South Sandwich Islands"
},
{
"Code": "UK",
"Name": "United Kingdom"
},
{
"Code": "UK",
"Name": "Great Britain"
},
{
"Code": "UK",
"Name": "Britain"
},
{
"Code": "UK",
"Name": "England"
},
{
"Code": "UK",
"Name": "UK"
}
]
},
{
"Symbol": "GEL",
"Name": "Georgian lari",
"Plural": "Georgian lari",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "GE",
"Name": "Georgia"
}
]
},
{
"Symbol": "GHS",
"Name": "Ghana cedi",
"Plural": "Ghana cedis",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "GH",
"Name": "Ghana"
}
]
},
{
"Symbol": "GIP",
"Name": "Gibraltar pound",
"Plural": "Gibraltar pounds",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "GI",
"Name": "Gibraltar"
}
]
},
{
"Symbol": "GMD",
"Name": "Gambian dalasi",
"Plural": "Gambian dalasi",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "GM",
"Name": "Gambia"
}
]
},
{
"Symbol": "GNF",
"Name": "Guinea Franc",
"Plural": "Guinea Francs",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "GN",
"Name": "Guinea"
}
]
},
{
"Symbol": "GTQ",
"Name": "Guatemalan quetzal",
"Plural": "Guatemalan quetzales",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "GT",
"Name": "Guatemala"
}
]
},
{
"Symbol": "GYD",
"Name": "Guyanese dollar",
"Plural": "Guyanese dollars",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "GY",
"Name": "Guyana"
}
]
},
{
"Symbol": "HKD",
"Name": "Hong Kong dollar",
"Plural": "Hong Kong dollars",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "HK",
"Name": "Hong Kong"
}
]
},
{
"Symbol": "HNL",
"Name": "Honduran lempira",
"Plural": "Honduran lempiras",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "HN",
"Name": "Honduras"
}
]
},
{
"Symbol": "HRK",
"Name": "Croatian kuna",
"Plural": "Croatian kuna",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "HR",
"Name": "Croatia"
}
]
},
{
"Symbol": "HTG",
"Name": "Haitian gourde",
"Plural": "Haitian gourdes",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "HT",
"Name": "Haiti"
}
]
},
{
"Symbol": "HUF",
"Name": "Hungarian forin",
"Plural": "Hungarian forint",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "HU",
"Name": "Hungary"
}
]
},
{
"Symbol": "IDR",
"Name": "Indonesia Rupiah",
"Plural": "Indonesia Rupiahs",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "TP",
"Name": "East Timor"
},
{
"Code": "ID",
"Name": "Indonesia"
}
]
},
{
"Symbol": "ILS",
"Name": "Israeli shekel hadash",
"Plural": "Israeli shekalim hadash",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "IL",
"Name": "Israel"
}
]
},
{
"Symbol": "INR",
"Name": "India Rupees",
"Plural": "India Rupeess",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "BT",
"Name": "Bhutan"
},
{
"Code": "IN",
"Name": "India"
}
]
},
{
"Symbol": "IQD",
"Name": "Iraqi dinar",
"Plural": "Iraqi dinara",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "IQ",
"Name": "Iraq"
}
]
},
{
"Symbol": "IRR",
"Name": "Iranian rial",
"Plural": "Iranian rials",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "IR",
"Name": "Iran, Islamic Republic of"
}
]
},
{
"Symbol": "ISK",
"Name": "Iceland Krona",
"Plural": "Iceland Kronur",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "IS",
"Name": "Iceland"
}
]
},
{
"Symbol": "JMD",
"Name": "Jamaican dollar",
"Plural": "Jamaican dollars",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "JM",
"Name": "Jamaica"
}
]
},
{
"Symbol": "JOD",
"Name": "Jordanian dinar",
"Plural": "Jordanian dinara",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "JO",
"Name": "Jordan"
}
]
},
{
"Symbol": "JPY",
"Name": "Japanese yen",
"Plural": "Japanese yen",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "JP",
"Name": "Japan"
}
]
},
{
"Symbol": "KES",
"Name": "Kenyan shilling",
"Plural": "Kenyan shillings",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "KE",
"Name": "Kenya"
}
]
},
{
"Symbol": "KGS",
"Name": "Kyrgyzstani som",
"Plural": "Kyrgyzstani soms",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "KG",
"Name": "Kyrgyzstan"
}
]
},
{
"Symbol": "KHR",
"Name": "Cambodian riel",
"Plural": "Cambodian riels",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "KH",
"Name": "Cambodia"
}
]
},
{
"Symbol": "KMF",
"Name": "Comorian franc",
"Plural": "Comorian francs",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "KM",
"Name": "Comoros"
}
]
},
{
"Symbol": "KPW",
"Name": "Chosun won",
"Plural": "Chosun won",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "KP",
"Name": "Korea, Democratic People's Republic of"
}
]
},
{
"Symbol": "KRW",
"Name": "Korean won",
"Plural": "Korean won",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "KR",
"Name": "Korea, Republic of"
}
]
},
{
"Symbol": "KWD",
"Name": "Kuwaiti dinar",
"Plural": "Kuwaiti dinara",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "KW",
"Name": "Kuwait"
}
]
},
{
"Symbol": "KYD",
"Name": "Cayman Islands dollar",
"Plural": "Cayman Islands dollars",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "KY",
"Name": "Cayman Islands"
}
]
},
{
"Symbol": "KZT",
"Name": "Kazakhstani tenge",
"Plural": "Kazakhstani tenge",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "KZ",
"Name": "Kazakhstan"
}
]
},
{
"Symbol": "LAK",
"Name": "Lao kip",
"Plural": "Lao kip",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "LA",
"Name": "Laos, Lao People's Democratic Republic"
}
]
},
{
"Symbol": "LBP",
"Name": "Lebanese pound",
"Plural": "Lebanese pounds",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "LB",
"Name": "Lebanon, Lebanese Republic"
}
]
},
{
"Symbol": "LKR",
"Name": "Sri Lankan rupee",
"Plural": "Sri Lankan rupees",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "LK",
"Name": "Sri Lanka"
}
]
},
{
"Symbol": "LRD",
"Name": "Liberian dollar",
"Plural": "Liberian dollars",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "LR",
"Name": "Liberia"
}
]
},
{
"Symbol": "LSL",
"Name": "Lesotho loti",
"Plural": "Lesotho maloti",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "LS",
"Name": "Lesotho"
}
]
},
{
"Symbol": "LTC",
"Name": "Litecoin",
"Plural": "Litecoins",
"Active": true,
"Digital": true,
"Message": null,
"Countries": [
null
]
},
{
"Symbol": "LYD",
"Name": "Libyan dinar",
"Plural": "Libyan dinara",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "LY",
"Name": "Libya"
}
]
},
{
"Symbol": "MAD",
"Name": "Moroccan dirham",
"Plural": "Moroccan dirhams",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "MA",
"Name": "Morocco"
},
{
"Code": "EH",
"Name": "Western Sahara"
}
]
},
{
"Symbol": "MDL",
"Name": "Moldovan leu",
"Plural": "Moldovan lei",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "MD",
"Name": "Moldova"
}
]
},
{
"Symbol": "MGA",
"Name": "Malagasy ariary",
"Plural": "Malagasy ariary",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "MG",
"Name": "Madagascar"
}
]
},
{
"Symbol": "MKD",
"Name": "Macedonian denar",
"Plural": "Macedonian denara",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "MK",
"Name": "Macedonia, Republic of Macedonia"
}
]
},
{
"Symbol": "MMK",
"Name": "Burmese kyat",
"Plural": "Burmese kyats",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "MM",
"Name": "Burma, Republic of the Union of Myanmar"
},
{
"Code": "MM",
"Name": "Myanmar (Burma)"
}
]
},
{
"Symbol": "MNT",
"Name": "Mongolian tugrik",
"Plural": "Mongolian tugrik",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "MN",
"Name": "Mongolia"
}
]
},
{
"Symbol": "MOP",
"Name": "Pataca",
"Plural": "Patacas",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "MO",
"Name": "Macao"
}
]
},
{
"Symbol": "MRO",
"Name": "Mauritania ouguiya",
"Plural": "Mauritania ouguiyas",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "MR",
"Name": "Mauritania"
},
{
"Code": "EH",
"Name": "Western Sahara"
}
]
},
{
"Symbol": "MUR",
"Name": "Mauritian rupee",
"Plural": "Mauritian rupees",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "MU",
"Name": "Mauritius"
}
]
},
{
"Symbol": "MVR",
"Name": "Maldivian rufiyaa",
"Plural": "Maldivian rufiyaa",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "MV",
"Name": "Maldives (Maldive Islands)"
}
]
},
{
"Symbol": "MWK",
"Name": "Malawian kwacha",
"Plural": "Malawian kwachas",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "MW",
"Name": "Malawi"
}
]
},
{
"Symbol": "MXN",
"Name": "Mexican peso",
"Plural": "Mexican pesos",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "MX",
"Name": "Mexico"
}
]
},
{
"Symbol": "MXV",
"Name": "Mexican Unidad de Inversion",
"Plural": "Mexican Unidades de Inversion",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "MX",
"Name": "Mexico"
}
]
},
{
"Symbol": "MYR",
"Name": "Malaysian ringgit",
"Plural": "Malaysian ringgits",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "MY",
"Name": "Malaysia"
}
]
},
{
"Symbol": "MZN",
"Name": "Mozambican metical",
"Plural": "Mozambican meticais",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "MZ",
"Name": "Mozambique"
}
]
},
{
"Symbol": "NAD",
"Name": "Namibian dollar",
"Plural": "Namibian dollars",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "NA",
"Name": "Namibia"
}
]
},
{
"Symbol": "NGN",
"Name": "Nigerian naira",
"Plural": "Nigerian nairas",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "NG",
"Name": "Nigeria"
}
]
},
{
"Symbol": "NIO",
"Name": "Gold Cordoba",
"Plural": "Gold Cordobas",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "NI",
"Name": "Nicaragua"
}
]
},
{
"Symbol": "NOK",
"Name": "Norwegian krone",
"Plural": "Norwegian kroner",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "BV",
"Name": "Bouvet Island"
},
{
"Code": "NO",
"Name": "Norway"
},
{
"Code": "SJ",
"Name": "Svalbard and Jan Mayen"
}
]
},
{
"Symbol": "NPR",
"Name": "Nepalese rupee",
"Plural": "Nepalese rupees",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "NP",
"Name": "Nepal"
}
]
},
{
"Symbol": "NZD",
"Name": "New Zealand dollar",
"Plural": "New Zealand dollars",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "CK",
"Name": "Cook Islands"
},
{
"Code": "NZ",
"Name": "New Zealand"
},
{
"Code": "NU",
"Name": "Niue"
},
{
"Code": "PT",
"Name": "Pitcairn Islands"
},
{
"Code": "TK",
"Name": "Tokelau"
}
]
},
{
"Symbol": "OMR",
"Name": "Omani rial",
"Plural": "Omani rial",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "OM",
"Name": "Oman"
}
]
},
{
"Symbol": "PAB",
"Name": "Panamanian balboa",
"Plural": "Panamanian balboa",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "PA",
"Name": "Panama"
}
]
},
{
"Symbol": "PEN",
"Name": "Peruvian nuevo sol",
"Plural": "Peruvian nuevos soles",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "PE",
"Name": "Peru"
}
]
},
{
"Symbol": "PGK",
"Name": "Papua New Guinean kina",
"Plural": "Papua New Guinean kina",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "PG",
"Name": "Papua New Guinea"
}
]
},
{
"Symbol": "PHP",
"Name": "Filipino piso",
"Plural": "Filipino pisos",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "PH",
"Name": "Philippines"
}
]
},
{
"Symbol": "PKR",
"Name": "Pakistani rupee",
"Plural": "Pakistani rupees",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "PK",
"Name": "Pakistan"
}
]
},
{
"Symbol": "PLN",
"Name": "Polish zloty",
"Plural": "Polish zlotych",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "PL",
"Name": "Poland"
}
]
},
{
"Symbol": "PYG",
"Name": "Paraguayan guarani",
"Plural": "Paraguayan guaranies",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "PY",
"Name": "Paraguay"
}
]
},
{
"Symbol": "QAR",
"Name": "Qatari riyal",
"Plural": "Qatari riyal",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "QA",
"Name": "Qatar"
}
]
},
{
"Symbol": "RON",
"Name": "Romanian leu",
"Plural": "Romanian lei",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "RO",
"Name": "Romania"
}
]
},
{
"Symbol": "RSD",
"Name": "Serbian dinar",
"Plural": "Serbian dinara",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "RS",
"Name": "Serbia"
}
]
},
{
"Symbol": "RUB",
"Name": "Russian ruble",
"Plural": "Russian ruble",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "RU",
"Name": "Russian Federation"
}
]
},
{
"Symbol": "RWF",
"Name": "Rwandan franc",
"Plural": "Rwandan francs",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "RW",
"Name": "Rwanda"
}
]
},
{
"Symbol": "SAR",
"Name": "Saudi riyal",
"Plural": "Saudi riyals",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "SA",
"Name": "Saudi Arabia"
}
]
},
{
"Symbol": "SBD",
"Name": "Solomon Islands dollar",
"Plural": "Solomon Islands dollars",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "SB",
"Name": "Solomon Islands"
}
]
},
{
"Symbol": "SCR",
"Name": "Seychellois rupee",
"Plural": "Seychellois rupees",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "SC",
"Name": "Seychelles"
}
]
},
{
"Symbol": "SDG",
"Name": "Sudanese pound",
"Plural": "Sudanese pounds",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "SD",
"Name": "Sudan"
}
]
},
{
"Symbol": "SEK",
"Name": "Swedish krona",
"Plural": "Swedish kronor",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "SE",
"Name": "Sweden"
}
]
},
{
"Symbol": "SGD",
"Name": "Singapore dollar",
"Plural": "Singapore dollars",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "SG",
"Name": "Singapore"
}
]
},
{
"Symbol": "SHP",
"Name": "Saint Helena pound",
"Plural": "Saint Helena pounds",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "SH",
"Name": "Saint Helena"
}
]
},
{
"Symbol": "SLL",
"Name": "Sierra Leonean leone",
"Plural": "Sierra Leonean leones",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "SL",
"Name": "Sierra Leone"
}
]
},
{
"Symbol": "SOS",
"Name": "Somali shilling",
"Plural": "Somali shillings",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "SO",
"Name": "Somalia"
}
]
},
{
"Symbol": "SRD",
"Name": "Surinamese dollar",
"Plural": "Surinamese dollars",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "SR",
"Name": "Suriname"
}
]
},
{
"Symbol": "STD",
"Name": "Sao Tome and Principe dobra",
"Plural": "Sao Tome and Principe dobras",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "ST",
"Name": "Principe and Sao Tome"
},
{
"Code": "ST",
"Name": "Sao Tome and Principe"
}
]
},
{
"Symbol": "SVC",
"Name": "Salvadoran colon",
"Plural": "Salvadoran colones",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "SV",
"Name": "El Salvador"
}
]
},
{
"Symbol": "SYP",
"Name": "Syrian pound",
"Plural": "Syrian pounds",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "SY",
"Name": "Syria"
}
]
},
{
"Symbol": "SZL",
"Name": "Swazi lilangeni",
"Plural": "Swazi emalangeni",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "SZ",
"Name": "Swaziland"
}
]
},
{
"Symbol": "THB",
"Name": "Thai baht",
"Plural": "Thai baht",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "TH",
"Name": "Thailand"
}
]
},
{
"Symbol": "TJS",
"Name": "Tajikistani somoni",
"Plural": "Tajikistani somoni",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "TJ",
"Name": "Tajikistan"
}
]
},
{
"Symbol": "TMT",
"Name": "Turkmenistan manat",
"Plural": "Turkmenistan manat",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "TM",
"Name": "Turkmenistan"
}
]
},
{
"Symbol": "TND",
"Name": "Tunisian dinar",
"Plural": "Tunisian dinara",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "TN",
"Name": "Tunisia"
}
]
},
{
"Symbol": "TOP",
"Name": "Tongan pa'anga",
"Plural": "Tonga pa'anga",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "TO",
"Name": "Tonga"
}
]
},
{
"Symbol": "TRY",
"Name": "Turkish lira",
"Plural": "Turkish liras",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "TR",
"Name": "Turkey"
}
]
},
{
"Symbol": "TTD",
"Name": "Trinidad and Tobago dollar",
"Plural": "Trinidad and Tobago dollars",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "TT",
"Name": "Tobago and Trinidad"
},
{
"Code": "TT",
"Name": "Trinidad and Tobago"
}
]
},
{
"Symbol": "TWD",
"Name": "New Taiwan dollar",
"Plural": "New Taiwan dollars",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "TW",
"Name": "Taiwan, Province of China"
}
]
},
{
"Symbol": "TZS",
"Name": "Tanzanian shilling",
"Plural": "Tanzanian shillings",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "TZ",
"Name": "Tanzania, United Republic of"
}
]
},
{
"Symbol": "UAH",
"Name": "Ukrainian hryvnia",
"Plural": "Ukrainian hryvni/hryven",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "UA",
"Name": "Ukraine"
}
]
},
{
"Symbol": "UGX",
"Name": "Ugandan shilling",
"Plural": "Ugandan shillings",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "UG",
"Name": "Uganda"
}
]
},
{
"Symbol": "USD",
"Name": "United States dollar",
"Plural": "United States dollars",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "US",
"Name": "United States of America"
},
{
"Code": "AS",
"Name": "American Samoa"
},
{
"Code": "IO",
"Name": "British Indian Ocean Territory"
},
{
"Code": "TC",
"Name": "Turks and Caicos Islands"
},
{
"Code": "EC",
"Name": "Ecuador"
},
{
"Code": "GU",
"Name": "Guam"
},
{
"Code": "HT",
"Name": "Haiti"
},
{
"Code": "MP",
"Name": "Northern Mariana Islands"
},
{
"Code": "MH",
"Name": "Marshall Islands"
},
{
"Code": "FM",
"Name": "Micronesia (Federated States of)"
},
{
"Code": "MI",
"Name": "Midway Islands"
},
{
"Code": "PW",
"Name": "Palau"
},
{
"Code": "PA",
"Name": "Panama"
},
{
"Code": "PR",
"Name": "Puerto Rico"
},
{
"Code": "UM",
"Name": "United States Minor Outlying Islands"
},
{
"Code": "VI",
"Name": "Virgin Islands, U.S."
},
{
"Code": "VG",
"Name": "Virgin Islands, British"
},
{
"Code": "WK",
"Name": "Wake Island"
},
{
"Code": "NL",
"Name": "Bonaire"
},
{
"Code": "AN",
"Name": "Netherlands Antilles"
},
{
"Code": "NL",
"Name": "Saba"
},
{
"Code": "NL",
"Name": "Sint Eustatius"
},
{
"Code": "US",
"Name": "United States"
},
{
"Code": "US",
"Name": "USA"
}
]
},
{
"Symbol": "UYU",
"Name": "peso Uruguayo",
"Plural": "pesos Uruguayos",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "UY",
"Name": "Uruguay"
}
]
},
{
"Symbol": "UZS",
"Name": "Uzbekistani som",
"Plural": "Uzbekistani som",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "UZ",
"Name": "Uzbekistan"
}
]
},
{
"Symbol": "VEF",
"Name": "Venezuelan bolivar fuerte",
"Plural": "Venezuelan bolivares fuertes",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "VE",
"Name": "Venezuela, Bolivarian Republic of"
}
]
},
{
"Symbol": "VND",
"Name": "Vietnamese dong",
"Plural": "Vietnamese dong",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "VN",
"Name": "Viet Nam"
}
]
},
{
"Symbol": "VUV",
"Name": "Vanuatu vatu",
"Plural": "Vanuatu vatu",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "VU",
"Name": "Vanuatu"
}
]
},
{
"Symbol": "WST",
"Name": "Samoan tala",
"Plural": "Samoan tala",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "WS",
"Name": "Samoa"
},
{
"Code": "WS",
"Name": "West Samoa (Samoa)"
},
{
"Code": "WS",
"Name": "Western Samoa (Samoa)"
}
]
},
{
"Symbol": "XAF",
"Name": "Central African CFA franc",
"Plural": "Central African CFA francs",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
null,
{
"Code": "CM",
"Name": "Cameroon"
},
{
"Code": "CF",
"Name": "Central African Republic"
},
{
"Code": "TD",
"Name": "Chad"
},
{
"Code": "CD",
"Name": "Congo/Brazzaville"
},
{
"Code": "GQ",
"Name": "Equatorial Guinea"
},
{
"Code": "GA",
"Name": "Gabon"
}
]
},
{
"Symbol": "XBT",
"Name": "Bitcoin",
"Plural": "Bitcoins",
"Active": true,
"Digital": true,
"Message": null,
"Countries": [
null
]
},
{
"Symbol": "XCD",
"Name": "East Caribbean dollar",
"Plural": "East Caribbean dollars",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
null,
{
"Code": "AV",
"Name": "Anguilla"
},
{
"Code": "AG",
"Name": "Antigua and Barbuda"
},
{
"Code": "AG",
"Name": "Barbuda and Antigua"
},
{
"Code": "DM",
"Name": "Dominica"
},
{
"Code": "GD",
"Name": "Grenada"
},
{
"Code": "MS",
"Name": "Montserrat"
},
null,
{
"Code": "KN",
"Name": "Saint Kitts and Nevis"
},
{
"Code": "LC",
"Name": "Saint Lucia"
},
{
"Code": "VC",
"Name": "Saint Vincent and The Grenadines"
}
]
},
{
"Symbol": "XDR",
"Name": "IMF Special Drawing Right",
"Plural": "IMF Special Drawing Rights",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
null
]
},
{
"Symbol": "XLT",
"Name": "Litecoin",
"Plural": "Litecoins",
"Active": true,
"Digital": true,
"Message": null,
"Countries": [
null
]
},
{
"Symbol": "XOF",
"Name": "West African CFA franc",
"Plural": "West African CFA francs",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
null,
{
"Code": "BJ",
"Name": "Benin"
},
{
"Code": "BF",
"Name": "Burkina Faso"
},
{
"Code": "CI",
"Name": "Cote D'Ivoire"
},
{
"Code": "GW",
"Name": "Guinea-Bissau"
},
{
"Code": "ML",
"Name": "Mali"
},
{
"Code": "NE",
"Name": "Niger"
},
{
"Code": "SN",
"Name": "Senegal"
},
{
"Code": "TG",
"Name": "Togo"
}
]
},
{
"Symbol": "XPF",
"Name": "Comptoirs Francais du Pacifique Franc",
"Plural": "Comptoirs Francais du Pacifique Francs",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
null,
{
"Code": "PF",
"Name": "French Polynesia (French Pacific Islands)"
},
{
"Code": "NC",
"Name": "New Caledonia"
},
{
"Code": "WF",
"Name": "Wallis and Futuna Islands"
}
]
},
{
"Symbol": "YER",
"Name": "Yemeni rial",
"Plural": "Yemeni rial",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "YE",
"Name": "Yemen"
}
]
},
{
"Symbol": "ZAR",
"Name": "South African rand",
"Plural": "South African rand",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "ZA",
"Name": "South Africa"
},
{
"Code": "LS",
"Name": "Lesotho"
},
{
"Code": "SZ",
"Name": "Swaziland"
}
]
},
{
"Symbol": "ZMW",
"Name": "Zambian kwacha",
"Plural": "Zambian kwacha",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "ZM",
"Name": "Zambia"
}
]
},
{
"Symbol": "ZWL",
"Name": "Zimbabwean dollar",
"Plural": "Zimbabwean dollars",
"Active": true,
"Digital": false,
"Message": null,
"Countries": [
{
"Code": "ZW",
"Name": "Zimbabwe"
}
]
}
]
};

res.json(allCurrencies);
}


exports.realTimeValues = function(req, res)	{

	var values = [
{
"Outcome": "Success",
"Message": null,
"Identity": "Request",
"Delay": 0.6061496,
"BaseCurrency": "EUR",
"QuoteCurrency": "AED",
"Symbol": "EURAED",
"Date": "04/05/2016",
"Time": "2:10:16 PM",
"QuoteType": "Spot",
"Bid": 4.1657,
"Mid": 4.16705,
"Ask": 4.1684,
"Spread": 0.0027,
"Text": "1 European Union euro = 4.16705 UAE dirhams",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "AFN",
"Symbol": "EURAFN",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 77.69506,
"Mid": 77.81536,
"Ask": 77.93567,
"Spread": 0.240618,
"Text": "1 European Union euro = 77.81536 Afghan afghanis",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "ALL",
"Symbol": "EURALL",
"Date": "04/05/2016",
"Time": "2:10:16 PM",
"QuoteType": "Spot",
"Bid": 136.1513,
"Mid": 138.6592,
"Ask": 141.167,
"Spread": 5.0157,
"Text": "1 European Union euro = 138.6592 Albanian leke",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "AMD",
"Symbol": "EURAMD",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 546.3838,
"Mid": 546.4433,
"Ask": 546.5028,
"Spread": 0.119022,
"Text": "1 European Union euro = 546.4433 Armenian dram",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "ANG",
"Symbol": "EURANG",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 2.030576,
"Mid": 2.030755,
"Ask": 2.030934,
"Spread": 0.000358,
"Text": "1 European Union euro = 2.030755 Netherlands Antillean guilders",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "AOA",
"Symbol": "EURAOA",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 202.6662,
"Mid": 203.45,
"Ask": 204.2337,
"Spread": 1.567441,
"Text": "1 European Union euro = 203.45 Angolan kwanza",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "ARS",
"Symbol": "EURARS",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 16.67784,
"Mid": 16.6839,
"Ask": 16.68997,
"Spread": 0.0121306,
"Text": "1 European Union euro = 16.6839 Argentine pesos",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "AUD",
"Symbol": "EURAUD",
"Date": "04/05/2016",
"Time": "2:10:21 PM",
"QuoteType": "Calculated",
"Bid": 1.507023,
"Mid": 1.507443,
"Ask": 1.507864,
"Spread": 0.000840782,
"Text": "1 European Union euro = 1.507443 Australian dollars",
"Source": "Rate calculated from AUD:EUR"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "AWG",
"Symbol": "EURAWG",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 2.030576,
"Mid": 2.030755,
"Ask": 2.030934,
"Spread": 0.000358,
"Text": "1 European Union euro = 2.030755 Aruban florin",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "AZN",
"Symbol": "EURAZN",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 1.711129,
"Mid": 1.7144,
"Ask": 1.717671,
"Spread": 0.00654198,
"Text": "1 European Union euro = 1.7144 Azerbaijanian manat",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "BAM",
"Symbol": "EURBAM",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 1.955025,
"Mid": 1.955424,
"Ask": 1.955823,
"Spread": 0.00079852,
"Text": "1 European Union euro = 1.955424 Bosnia and Herzegovina convertible marks",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "BBD",
"Symbol": "EURBBD",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 2.2688,
"Mid": 2.269,
"Ask": 2.2692,
"Spread": 0.0004,
"Text": "1 European Union euro = 2.269 Barbadian dollars",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "BDT",
"Symbol": "EURBDT",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 87.01631,
"Mid": 88.82181,
"Ask": 90.62731,
"Spread": 3.611002,
"Text": "1 European Union euro = 88.82181 Bangladeshi taka",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "BGN",
"Symbol": "EURBGN",
"Date": "04/05/2016",
"Time": "2:10:14 PM",
"QuoteType": "Spot",
"Bid": 1.9492,
"Mid": 1.9568,
"Ask": 1.9644,
"Spread": 0.0152,
"Text": "1 European Union euro = 1.9568 Bulgarian leva",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "BHD",
"Symbol": "EURBHD",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 0.4254,
"Mid": 0.427707,
"Ask": 0.430013,
"Spread": 0.0046134,
"Text": "1 European Union euro = 0.427707 Bahraini dinar",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "BIF",
"Symbol": "EURBIF",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 1740.623,
"Mid": 1769.085,
"Ask": 1797.547,
"Spread": 56.92342,
"Text": "1 European Union euro = 1769.085 Burundi francs",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "BMD",
"Symbol": "EURBMD",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 1.1344,
"Mid": 1.134557,
"Ask": 1.134713,
"Spread": 0.00031346,
"Text": "1 European Union euro = 1.134557 Bermudian dollars",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "BND",
"Symbol": "EURBND",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 1.539608,
"Mid": 1.540141,
"Ask": 1.540673,
"Spread": 0.00106566,
"Text": "1 European Union euro = 1.540141 Brunei dollars",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "BOB",
"Symbol": "EURBOB",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 7.787656,
"Mid": 7.842236,
"Ask": 7.896816,
"Spread": 0.10916,
"Text": "1 European Union euro = 7.842236 Bolivian bolivianos",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "BRL",
"Symbol": "EURBRL",
"Date": "04/05/2016",
"Time": "2:10:16 PM",
"QuoteType": "Spot",
"Bid": 4.1415,
"Mid": 4.14575,
"Ask": 4.15,
"Spread": 0.0085,
"Text": "1 European Union euro = 4.14575 Brasilien reais",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "BSD",
"Symbol": "EURBSD",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 1.127344,
"Mid": 1.134489,
"Ask": 1.141635,
"Spread": 0.0142905,
"Text": "1 European Union euro = 1.134489 Bahamian dollars",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "BTC",
"Symbol": "EURBTC",
"Date": "04/05/2016",
"Time": "2:09:51 PM",
"QuoteType": "Calculated",
"Bid": 0.00269629,
"Mid": 0.00270684,
"Ask": 0.00271739,
"Spread": 0.0000211007,
"Text": "1 European Union euro = 0.00270684 Bitcoin",
"Source": "Rate calculated from BTC:EUR"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "BTN",
"Symbol": "EURBTN",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 75.41491,
"Mid": 75.42723,
"Ask": 75.43955,
"Spread": 0.024642,
"Text": "1 European Union euro = 75.42723 Bhutanese ngultrum",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "BWP",
"Symbol": "EURBWP",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 12.25141,
"Mid": 12.41252,
"Ask": 12.57364,
"Spread": 0.322231,
"Text": "1 European Union euro = 12.41252 Botswanan pulas",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "BYR",
"Symbol": "EURBYR",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 22914.88,
"Mid": 22962.28,
"Ask": 23009.69,
"Spread": 94.808,
"Text": "1 European Union euro = 22962.28 Belarusian ruble",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "BZD",
"Symbol": "EURBZD",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 2.246112,
"Mid": 2.263329,
"Ask": 2.280546,
"Spread": 0.034434,
"Text": "1 European Union euro = 2.263329 Belize dollars",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "CAD",
"Symbol": "EURCAD",
"Date": "04/05/2016",
"Time": "2:10:21 PM",
"QuoteType": "Spot",
"Bid": 1.4945,
"Mid": 1.4965,
"Ask": 1.4985,
"Spread": 0.004,
"Text": "1 European Union euro = 1.4965 Canadian dollars",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "CDF",
"Symbol": "EURCDF",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 1039.11,
"Mid": 1051.115,
"Ask": 1063.12,
"Spread": 24.0098,
"Text": "1 European Union euro = 1051.115 Congolese francs",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "CHF",
"Symbol": "EURCHF",
"Date": "04/05/2016",
"Time": "2:10:21 PM",
"QuoteType": "Spot",
"Bid": 1.0882,
"Mid": 1.0883,
"Ask": 1.0884,
"Spread": 0.0002,
"Text": "1 European Union euro = 1.0883 Switzerland Francs",
"Source": "SIX Financial Information, Buyer = \"ICAP Plc Foreign Exchange\", Seller = \"ICAP Plc Foreign Exchange\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "CLF",
"Symbol": "EURCLF",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 0.0277928,
"Mid": 0.0279087,
"Ask": 0.0280246,
"Spread": 0.00023182,
"Text": "1 European Union euro = 0.0279087 Unidad de fomento",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "CLP",
"Symbol": "EURCLP",
"Date": "04/05/2016",
"Time": "2:10:16 PM",
"QuoteType": "Spot",
"Bid": 747.6695,
"Mid": 761.6864,
"Ask": 775.7034,
"Spread": 28.0339,
"Text": "1 European Union euro = 761.6864 Chilean pesos",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "CNH",
"Symbol": "EURCNH",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 7.354429,
"Mid": 7.355588,
"Ask": 7.356746,
"Spread": 0.00231776,
"Text": "1 European Union euro = 7.355588 Chinese offshore renminbi yuan",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "CNY",
"Symbol": "EURCNY",
"Date": "04/05/2016",
"Time": "2:10:17 PM",
"QuoteType": "Spot",
"Bid": 7.3444,
"Mid": 7.346,
"Ask": 7.3476,
"Spread": 0.0032,
"Text": "1 European Union euro = 7.346 Chinese renminbi yuan",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "COP",
"Symbol": "EURCOP",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 3475.802,
"Mid": 3478.094,
"Ask": 3480.386,
"Spread": 4.5839,
"Text": "1 European Union euro = 3478.094 Colombian pesos",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "CRC",
"Symbol": "EURCRC",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 601.2093,
"Mid": 606.9353,
"Ask": 612.6613,
"Spread": 11.452,
"Text": "1 European Union euro = 606.9353 Costa Rican colones",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "CUP",
"Symbol": "EURCUP",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 1.1344,
"Mid": 1.1345,
"Ask": 1.1346,
"Spread": 0.0002,
"Text": "1 European Union euro = 1.1345 Cuban pesos",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "CVE",
"Symbol": "EURCVE",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 109.5025,
"Mid": 110.1935,
"Ask": 110.8845,
"Spread": 1.38196,
"Text": "1 European Union euro = 110.1935 Cape Verdean escudos",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "CZK",
"Symbol": "EURCZK",
"Date": "04/05/2016",
"Time": "2:10:17 PM",
"QuoteType": "Spot",
"Bid": 27.032,
"Mid": 27.035,
"Ask": 27.038,
"Spread": 0.006,
"Text": "1 European Union euro = 27.035 Czech korun",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "DJF",
"Symbol": "EURDJF",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 200.5506,
"Mid": 201.5837,
"Ask": 202.6169,
"Spread": 2.066292,
"Text": "1 European Union euro = 201.5837 Djiboutian francs",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "DKK",
"Symbol": "EURDKK",
"Date": "04/05/2016",
"Time": "2:10:21 PM",
"QuoteType": "Spot",
"Bid": 7.4413,
"Mid": 7.44205,
"Ask": 7.4428,
"Spread": 0.0015,
"Text": "1 European Union euro = 7.44205 Danish kroner",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "DOP",
"Symbol": "EURDOP",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 51.76267,
"Mid": 51.96579,
"Ask": 52.16891,
"Spread": 0.406236,
"Text": "1 European Union euro = 51.96579 Dominican pesos",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "DZD",
"Symbol": "EURDZD",
"Date": "04/05/2016",
"Time": "2:10:16 PM",
"QuoteType": "Spot",
"Bid": 122.265,
"Mid": 122.7753,
"Ask": 123.2856,
"Spread": 1.0206,
"Text": "1 European Union euro = 122.7753 Algerian dinara",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "EGP",
"Symbol": "EUREGP",
"Date": "04/05/2016",
"Time": "2:10:16 PM",
"QuoteType": "Spot",
"Bid": 10.0451,
"Mid": 10.07055,
"Ask": 10.096,
"Spread": 0.0509,
"Text": "1 European Union euro = 10.07055 Egyptian pounds",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "ERN",
"Symbol": "EURERN",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 18.34325,
"Mid": 18.35621,
"Ask": 18.36917,
"Spread": 0.025926,
"Text": "1 European Union euro = 18.35621 Eritrean nakfa",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "ETB",
"Symbol": "EURETB",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 24.22852,
"Mid": 24.35205,
"Ask": 24.47559,
"Spread": 0.247076,
"Text": "1 European Union euro = 24.35205 Ethiopian birr",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "EUR",
"Symbol": "EUREUR",
"Date": "04/05/2016",
"Time": "2:10:15 PM",
"QuoteType": "Calculated",
"Bid": 1,
"Mid": 1,
"Ask": 1,
"Spread": 0,
"Text": "1 European Union euro = 1 European Union euro",
"Source": null
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "FJD",
"Symbol": "EURFJD",
"Date": "04/05/2016",
"Time": "2:10:16 PM",
"QuoteType": "Spot",
"Bid": 2.3152,
"Mid": 2.3273,
"Ask": 2.3394,
"Spread": 0.0242,
"Text": "1 European Union euro = 2.3273 Fijian dollars",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "FKP",
"Symbol": "EURFKP",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 0.748364,
"Mid": 0.748543,
"Ask": 0.748723,
"Spread": 0.00035886,
"Text": "1 European Union euro = 0.748543 Falkland Islands pound",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "GBP",
"Symbol": "EURGBP",
"Date": "04/05/2016",
"Time": "2:10:22 PM",
"QuoteType": "Spot",
"Bid": 0.8025,
"Mid": 0.8027,
"Ask": 0.8029,
"Spread": 0.0004,
"Text": "1 European Union euro = 0.8027 British pound sterling",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "GEL",
"Symbol": "EURGEL",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 2.569416,
"Mid": 2.592334,
"Ask": 2.615253,
"Spread": 0.045837,
"Text": "1 European Union euro = 2.592334 Georgian lari",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "GHS",
"Symbol": "EURGHS",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 4.322064,
"Mid": 4.35081,
"Ask": 4.379556,
"Spread": 0.057492,
"Text": "1 European Union euro = 4.35081 Ghana cedis",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "GIP",
"Symbol": "EURGIP",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 0.782736,
"Mid": 0.78394,
"Ask": 0.785143,
"Spread": 0.0024072,
"Text": "1 European Union euro = 0.78394 Gibraltar pound",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "GMD",
"Symbol": "EURGMD",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 47.97378,
"Mid": 48.56232,
"Ask": 49.15087,
"Spread": 1.177096,
"Text": "1 European Union euro = 48.56232 Gambian dalasi",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "GNF",
"Symbol": "EURGNF",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 8507.887,
"Mid": 8622.153,
"Ask": 8736.42,
"Spread": 228.5334,
"Text": "1 European Union euro = 8622.153 Guinea Francs",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "GTQ",
"Symbol": "EURGTQ",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 8.74509,
"Mid": 8.747562,
"Ask": 8.750035,
"Spread": 0.0049456,
"Text": "1 European Union euro = 8.747562 Guatemalan quetzales",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "GYD",
"Symbol": "EURGYD",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 233.6637,
"Mid": 235.0799,
"Ask": 236.496,
"Spread": 2.832312,
"Text": "1 European Union euro = 235.0799 Guyanese dollars",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "HKD",
"Symbol": "EURHKD",
"Date": "04/05/2016",
"Time": "2:10:21 PM",
"QuoteType": "Spot",
"Bid": 8.80046,
"Mid": 8.80075,
"Ask": 8.80104,
"Spread": 0.00058,
"Text": "1 European Union euro = 8.80075 Hong Kong dollars",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "HNL",
"Symbol": "EURHNL",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 25.67283,
"Mid": 25.6751,
"Ask": 25.67736,
"Spread": 0.00452624,
"Text": "1 European Union euro = 25.6751 Honduran lempiras",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "HRK",
"Symbol": "EURHRK",
"Date": "04/05/2016",
"Time": "2:10:21 PM",
"QuoteType": "Spot",
"Bid": 7.4666,
"Mid": 7.5094,
"Ask": 7.5522,
"Spread": 0.0856,
"Text": "1 European Union euro = 7.5094 Croatian kuna",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "HTG",
"Symbol": "EURHTG",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 69.99917,
"Mid": 70.00534,
"Ask": 70.01151,
"Spread": 0.0123412,
"Text": "1 European Union euro = 70.00534 Haitian gourdes",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "HUF",
"Symbol": "EURHUF",
"Date": "04/05/2016",
"Time": "2:10:19 PM",
"QuoteType": "Spot",
"Bid": 312.6,
"Mid": 312.72,
"Ask": 312.84,
"Spread": 0.24,
"Text": "1 European Union euro = 312.72 Hungarian forint",
"Source": "SIX Financial Information, Buyer = \"ICAP Plc Foreign Exchange\", Seller = \"ICAP Plc Foreign Exchange\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "IDR",
"Symbol": "EURIDR",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 15025.13,
"Mid": 15029.29,
"Ask": 15033.45,
"Spread": 8.322,
"Text": "1 European Union euro = 15029.29 Indonesia Rupiahs",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "ILS",
"Symbol": "EURILS",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 4.330799,
"Mid": 4.332485,
"Ask": 4.334172,
"Spread": 0.00337312,
"Text": "1 European Union euro = 4.332485 Israeli shekalim hadash",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "INR",
"Symbol": "EURINR",
"Date": "04/05/2016",
"Time": "2:10:19 PM",
"QuoteType": "Spot",
"Bid": 75.3308,
"Mid": 51.3682,
"Ask": 75.4056,
"Spread": 0.0748,
"Text": "1 European Union euro = 75.3682 India Rupeess",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "IQD",
"Symbol": "EURIQD",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 1223.791,
"Mid": 1256.008,
"Ask": 1288.225,
"Spread": 64.43423,
"Text": "1 European Union euro = 1256.008 Iraqi dinara",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "IRR",
"Symbol": "EURIRR",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 34336.02,
"Mid": 34340.18,
"Ask": 34344.34,
"Spread": 8.3228,
"Text": "1 European Union euro = 34340.18 Iranian rials",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "ISK",
"Symbol": "EURISK",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 139.8488,
"Mid": 140.0257,
"Ask": 140.2025,
"Spread": 0.35369,
"Text": "1 European Union euro = 140.0257 Iceland Kronur",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "JMD",
"Symbol": "EURJMD",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 137.5233,
"Mid": 138.063,
"Ask": 138.6027,
"Spread": 1.079424,
"Text": "1 European Union euro = 138.063 Jamaican dollars",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "JOD",
"Symbol": "EURJOD",
"Date": "04/05/2016",
"Time": "2:10:16 PM",
"QuoteType": "Spot",
"Bid": 0.80052,
"Mid": 0.80344,
"Ask": 0.80636,
"Spread": 0.00584,
"Text": "1 European Union euro = 0.80344 Jordanian dinar",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "JPY",
"Symbol": "EURJPY",
"Date": "04/05/2016",
"Time": "2:10:21 PM",
"QuoteType": "Spot",
"Bid": 125.486,
"Mid": 125.4915,
"Ask": 125.497,
"Spread": 0.011,
"Text": "1 European Union euro = 125.4915 Japanese yen",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "KES",
"Symbol": "EURKES",
"Date": "04/05/2016",
"Time": "2:10:16 PM",
"QuoteType": "Spot",
"Bid": 112.9916,
"Mid": 114.9958,
"Ask": 117,
"Spread": 4.0084,
"Text": "1 European Union euro = 114.9958 Kenyan shillings",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "KGS",
"Symbol": "EURKGS",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 78.2736,
"Mid": 78.2805,
"Ask": 78.2874,
"Spread": 0.0138,
"Text": "1 European Union euro = 78.2805 Kyrgyzstani soms",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "KHR",
"Symbol": "EURKHR",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 4515.933,
"Mid": 4586.279,
"Ask": 4656.625,
"Spread": 140.6924,
"Text": "1 European Union euro = 4586.279 Cambodian riels",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "KMF",
"Symbol": "EURKMF",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 491.7511,
"Mid": 491.8594,
"Ask": 491.9678,
"Spread": 0.216723,
"Text": "1 European Union euro = 491.8594 Comorian francs",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "KPW",
"Symbol": "EURKPW",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 1019.826,
"Mid": 1021.05,
"Ask": 1022.275,
"Spread": 2.449,
"Text": "1 European Union euro = 1021.05 Chosun won",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "KRW",
"Symbol": "EURKRW",
"Date": "04/05/2016",
"Time": "2:10:16 PM",
"QuoteType": "Spot",
"Bid": 1315.339,
"Mid": 1316.872,
"Ask": 1318.405,
"Spread": 3.066,
"Text": "1 European Union euro = 1316.872 Korean won",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "KWD",
"Symbol": "EURKWD",
"Date": "04/05/2016",
"Time": "2:10:16 PM",
"QuoteType": "Spot",
"Bid": 0.34189,
"Mid": 0.342525,
"Ask": 0.34316,
"Spread": 0.00127,
"Text": "1 European Union euro = 0.342525 Kuwaiti dinar",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "KYD",
"Symbol": "EURKYD",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 0.930208,
"Mid": 0.93029,
"Ask": 0.930372,
"Spread": 0.000164,
"Text": "1 European Union euro = 0.93029 Cayman Islands dollar",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "KZT",
"Symbol": "EURKZT",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 388.9403,
"Mid": 391.97,
"Ask": 394.9996,
"Spread": 6.059373,
"Text": "1 European Union euro = 391.97 Kazakhstani tenge",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "LAK",
"Symbol": "EURLAK",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 9182.855,
"Mid": 9212.086,
"Ask": 9241.317,
"Spread": 58.46244,
"Text": "1 European Union euro = 9212.086 Lao kip",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "LBP",
"Symbol": "EURLBP",
"Date": "04/05/2016",
"Time": "1:48:45 PM",
"QuoteType": "Spot",
"Bid": 1671.143,
"Mid": 1711.198,
"Ask": 1751.254,
"Spread": 80.111,
"Text": "1 European Union euro = 1711.198 Lebanese pounds",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "LKR",
"Symbol": "EURLKR",
"Date": "04/05/2016",
"Time": "2:10:16 PM",
"QuoteType": "Spot",
"Bid": 160.5658,
"Mid": 164.0675,
"Ask": 167.5692,
"Spread": 7.0034,
"Text": "1 European Union euro = 164.0675 Sri Lankan rupees",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "LRD",
"Symbol": "EURLRD",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 96.02696,
"Mid": 96.04677,
"Ask": 96.06658,
"Spread": 0.039622,
"Text": "1 European Union euro = 96.04677 Liberian dollars",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "LSL",
"Symbol": "EURLSL",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 17.04708,
"Mid": 17.05466,
"Ask": 17.06223,
"Spread": 0.0151457,
"Text": "1 European Union euro = 17.05466 Lesotho maloti",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "LTC",
"Symbol": "EURLTC",
"Date": "04/05/2016",
"Time": "2:10:21 PM",
"QuoteType": "Calculated",
"Bid": 0.351393,
"Mid": 0.352701,
"Ask": 0.354009,
"Spread": 0.0026165,
"Text": "1 European Union euro = 0.352701 Litecoin",
"Source": "Rates calculated by crossing via USD"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "LYD",
"Symbol": "EURLYD",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 1.525881,
"Mid": 1.545815,
"Ask": 1.565748,
"Spread": 0.0398666,
"Text": "1 European Union euro = 1.545815 Libyan dinara",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "MAD",
"Symbol": "EURMAD",
"Date": "04/05/2016",
"Time": "2:10:16 PM",
"QuoteType": "Spot",
"Bid": 10.9264,
"Mid": 10.9553,
"Ask": 10.9842,
"Spread": 0.0578,
"Text": "1 European Union euro = 10.9553 Moroccan dirhams",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "MDL",
"Symbol": "EURMDL",
"Date": "04/05/2016",
"Time": "2:10:16 PM",
"QuoteType": "Spot",
"Bid": 21.9309,
"Mid": 22.23145,
"Ask": 22.532,
"Spread": 0.6011,
"Text": "1 European Union euro = 22.23145 Moldovan lei",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "MGA",
"Symbol": "EURMGA",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 3557.592,
"Mid": 3607.885,
"Ask": 3658.177,
"Spread": 100.5855,
"Text": "1 European Union euro = 3607.885 Malagasy ariary",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "MKD",
"Symbol": "EURMKD",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 61.22357,
"Mid": 61.52963,
"Ask": 61.8357,
"Spread": 0.612132,
"Text": "1 European Union euro = 61.52963 Macedonian denara",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "MMK",
"Symbol": "EURMMK",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 1357.99,
"Mid": 1363.783,
"Ask": 1369.576,
"Spread": 11.58542,
"Text": "1 European Union euro = 1363.783 Burmese kyats",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "MNT",
"Symbol": "EURMNT",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 2314.176,
"Mid": 2321.188,
"Ask": 2328.199,
"Spread": 14.0232,
"Text": "1 European Union euro = 2321.188 Mongolian tugrik",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "MOP",
"Symbol": "EURMOP",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 9.063062,
"Mid": 9.064145,
"Ask": 9.065227,
"Spread": 0.00216516,
"Text": "1 European Union euro = 9.064145 Patacas",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "MRO",
"Symbol": "EURMRO",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 384.5616,
"Mid": 389.1339,
"Ask": 393.7062,
"Spread": 9.1446,
"Text": "1 European Union euro = 389.1339 Mauritania ouguiyas",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "MUR",
"Symbol": "EURMUR",
"Date": "04/05/2016",
"Time": "2:10:16 PM",
"QuoteType": "Spot",
"Bid": 38.3199,
"Mid": 39.82215,
"Ask": 41.3244,
"Spread": 3.0045,
"Text": "1 European Union euro = 39.82215 Mauritian rupees",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "MVR",
"Symbol": "EURMVR",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 17.4811,
"Mid": 17.48264,
"Ask": 17.48419,
"Spread": 0.003082,
"Text": "1 European Union euro = 17.48264 Maldivian rufiyaa",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "MWK",
"Symbol": "EURMWK",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 772.2428,
"Mid": 776.3103,
"Ask": 780.3779,
"Spread": 8.13508,
"Text": "1 European Union euro = 776.3103 Malawian kwachas",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "MXN",
"Symbol": "EURMXN",
"Date": "04/05/2016",
"Time": "2:10:21 PM",
"QuoteType": "Spot",
"Bid": 20.0866,
"Mid": 20.0881,
"Ask": 20.0896,
"Spread": 0.003,
"Text": "1 European Union euro = 20.0881 Mexican pesos",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "MXV",
"Symbol": "EURMXV",
"Date": "04/05/2016",
"Time": "2:10:21 PM",
"QuoteType": "Calculated",
"Bid": 3.176712,
"Mid": 3.188142,
"Ask": 3.199572,
"Spread": 0.02286,
"Text": "1 European Union euro = 3.188142 Mexican Unidades de Inversion",
"Source": "Rates calculated by crossing via USD"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "MYR",
"Symbol": "EURMYR",
"Date": "04/05/2016",
"Time": "2:10:19 PM",
"QuoteType": "Spot",
"Bid": 4.4603,
"Mid": 4.46565,
"Ask": 4.471,
"Spread": 0.0107,
"Text": "1 European Union euro = 4.46565 Malaysian ringgits",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "MZN",
"Symbol": "EURMZN",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 56.72,
"Mid": 57.2923,
"Ask": 57.8646,
"Spread": 1.1446,
"Text": "1 European Union euro = 57.2923 Mozambican meticais",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "NAD",
"Symbol": "EURNAD",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 17.04708,
"Mid": 17.05466,
"Ask": 17.06223,
"Spread": 0.0151457,
"Text": "1 European Union euro = 17.05466 Namibian dollars",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "NGN",
"Symbol": "EURNGN",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 225.5981,
"Mid": 225.862,
"Ask": 226.1258,
"Spread": 0.527652,
"Text": "1 European Union euro = 225.862 Nigerian nairas",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "NIO",
"Symbol": "EURNIO",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 32.08991,
"Mid": 32.09274,
"Ask": 32.09556,
"Spread": 0.0056576,
"Text": "1 European Union euro = 32.09274 Gold Cordobas",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "NOK",
"Symbol": "EURNOK",
"Date": "04/05/2016",
"Time": "2:10:21 PM",
"QuoteType": "Spot",
"Bid": 9.49428,
"Mid": 9.496145,
"Ask": 9.49801,
"Spread": 0.00373,
"Text": "1 European Union euro = 9.496145 Norwegian kroner",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "NPR",
"Symbol": "EURNPR",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 120.6639,
"Mid": 120.6836,
"Ask": 120.7033,
"Spread": 0.0394272,
"Text": "1 European Union euro = 120.6836 Nepalese rupees",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "NZD",
"Symbol": "EURNZD",
"Date": "04/05/2016",
"Time": "2:10:21 PM",
"QuoteType": "Spot",
"Bid": 1.6746,
"Mid": 1.6761,
"Ask": 1.6776,
"Spread": 0.003,
"Text": "1 European Union euro = 1.6761 New Zealand dollars",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "OMR",
"Symbol": "EUROMR",
"Date": "04/05/2016",
"Time": "2:10:16 PM",
"QuoteType": "Spot",
"Bid": 0.4355,
"Mid": 0.437075,
"Ask": 0.43865,
"Spread": 0.00315,
"Text": "1 European Union euro = 0.437075 Omani rial",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "PAB",
"Symbol": "EURPAB",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 1.109477,
"Mid": 1.134633,
"Ask": 1.159788,
"Spread": 0.0503109,
"Text": "1 European Union euro = 1.134633 Panamanian balboa",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "PEN",
"Symbol": "EURPEN",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 3.79366,
"Mid": 3.803128,
"Ask": 3.812596,
"Spread": 0.0189359,
"Text": "1 European Union euro = 3.803128 Peruvian nuevos soles",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "PGK",
"Symbol": "EURPGK",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 3.411708,
"Mid": 3.492622,
"Ask": 3.573536,
"Spread": 0.161828,
"Text": "1 European Union euro = 3.492622 Papua New Guinean kina",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "PHP",
"Symbol": "EURPHP",
"Date": "04/05/2016",
"Time": "2:10:16 PM",
"QuoteType": "Spot",
"Bid": 52.5499,
"Mid": 52.60335,
"Ask": 52.6568,
"Spread": 0.1069,
"Text": "1 European Union euro = 52.60335 Filipino pisos",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "PKR",
"Symbol": "EURPKR",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 118.715,
"Mid": 118.7538,
"Ask": 118.7926,
"Spread": 0.07766,
"Text": "1 European Union euro = 118.7538 Pakistani rupees",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "PLN",
"Symbol": "EURPLN",
"Date": "04/05/2016",
"Time": "2:10:14 PM",
"QuoteType": "Spot",
"Bid": 4.2566,
"Mid": 4.2579,
"Ask": 4.2592,
"Spread": 0.0026,
"Text": "1 European Union euro = 4.2579 Polish zlotych",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "PYG",
"Symbol": "EURPYG",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 6365.935,
"Mid": 6375.84,
"Ask": 6385.744,
"Spread": 19.80921,
"Text": "1 European Union euro = 6375.84 Paraguayan guaranies",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "QAR",
"Symbol": "EURQAR",
"Date": "04/05/2016",
"Time": "2:10:16 PM",
"QuoteType": "Spot",
"Bid": 4.1271,
"Mid": 4.13135,
"Ask": 4.1356,
"Spread": 0.0085,
"Text": "1 European Union euro = 4.13135 Qatari riyal",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "RON",
"Symbol": "EURRON",
"Date": "04/05/2016",
"Time": "2:10:21 PM",
"QuoteType": "Spot",
"Bid": 4.4607,
"Mid": 4.46775,
"Ask": 4.4748,
"Spread": 0.0141,
"Text": "1 European Union euro = 4.46775 Romanian lei",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "RSD",
"Symbol": "EURRSD",
"Date": "04/05/2016",
"Time": "2:10:16 PM",
"QuoteType": "Spot",
"Bid": 121.936,
"Mid": 122.5087,
"Ask": 123.0814,
"Spread": 1.1454,
"Text": "1 European Union euro = 122.5087 Serbian dinara",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "RUB",
"Symbol": "EURRUB",
"Date": "04/05/2016",
"Time": "2:10:20 PM",
"QuoteType": "Spot",
"Bid": 78.7467,
"Mid": 78.77325,
"Ask": 78.7998,
"Spread": 0.0531,
"Text": "1 European Union euro = 78.77325 Russian ruble",
"Source": "SIX Financial Information, Buyer = \"Commerzbank AG (Forex and Bonds)\", Seller = \"Commerzbank AG (Forex and Bonds)\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "RWF",
"Symbol": "EURRWF",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 872.2061,
"Mid": 876.2541,
"Ask": 880.3021,
"Spread": 8.095974,
"Text": "1 European Union euro = 876.2541 Rwandan francs",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "SAR",
"Symbol": "EURSAR",
"Date": "04/05/2016",
"Time": "2:10:16 PM",
"QuoteType": "Spot",
"Bid": 4.2494,
"Mid": 4.2545,
"Ask": 4.2596,
"Spread": 0.0102,
"Text": "1 European Union euro = 4.2545 Saudi riyals",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "SBD",
"Symbol": "EURSBD",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 8.918239,
"Mid": 8.99027,
"Ask": 9.0623,
"Spread": 0.144061,
"Text": "1 European Union euro = 8.99027 Solomon Islands dollars",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "SCR",
"Symbol": "EURSCR",
"Date": "04/05/2016",
"Time": "2:08:52 PM",
"QuoteType": "Spot",
"Bid": 14.655,
"Mid": 15.655,
"Ask": 16.655,
"Spread": 2,
"Text": "1 European Union euro = 15.655 Seychellois rupees",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "SDG",
"Symbol": "EURSDG",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 6.918706,
"Mid": 6.919429,
"Ask": 6.920152,
"Spread": 0.00144672,
"Text": "1 European Union euro = 6.919429 Sudanese pounds",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "SEK",
"Symbol": "EURSEK",
"Date": "04/05/2016",
"Time": "2:10:21 PM",
"QuoteType": "Spot",
"Bid": 9.25533,
"Mid": 9.256215,
"Ask": 9.2571,
"Spread": 0.00177,
"Text": "1 European Union euro = 9.256215 Swedish kronor",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "SGD",
"Symbol": "EURSGD",
"Date": "04/05/2016",
"Time": "2:10:21 PM",
"QuoteType": "Spot",
"Bid": 1.53963,
"Mid": 1.539825,
"Ask": 1.54002,
"Spread": 0.00039,
"Text": "1 European Union euro = 1.539825 Singapore dollars",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "SHP",
"Symbol": "EURSHP",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 0.795782,
"Mid": 0.795965,
"Ask": 0.796149,
"Spread": 0.00036722,
"Text": "1 European Union euro = 0.795965 Saint Helena pound",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "SLL",
"Symbol": "EURSLL",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 4463.864,
"Mid": 4520.987,
"Ask": 4578.111,
"Spread": 114.247,
"Text": "1 European Union euro = 4520.987 Sierra Leonean leones",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "SOS",
"Symbol": "EURSOS",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 661.2418,
"Mid": 688.5872,
"Ask": 715.9326,
"Spread": 54.69084,
"Text": "1 European Union euro = 688.5872 Somali shillings",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "SRD",
"Symbol": "EURSRD",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 5.744602,
"Mid": 5.796165,
"Ask": 5.847728,
"Spread": 0.103127,
"Text": "1 European Union euro = 5.796165 Surinamese dollars",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "STD",
"Symbol": "EURSTD",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 24469.01,
"Mid": 24471.73,
"Ask": 24474.46,
"Spread": 5.4486,
"Text": "1 European Union euro = 24471.73 Sao Tome and Principe dobras",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "SVC",
"Symbol": "EURSVC",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 9.894237,
"Mid": 9.900782,
"Ask": 9.907327,
"Spread": 0.0130904,
"Text": "1 European Union euro = 9.900782 Salvadoran colones",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "SYP",
"Symbol": "EURSYP",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 249.4046,
"Mid": 249.4278,
"Ask": 249.4509,
"Spread": 0.0462404,
"Text": "1 European Union euro = 249.4278 Syrian pounds",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "SZL",
"Symbol": "EURSZL",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 17.04708,
"Mid": 17.05466,
"Ask": 17.06223,
"Spread": 0.0151457,
"Text": "1 European Union euro = 17.05466 Swazi emalangeni",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "THB",
"Symbol": "EURTHB",
"Date": "04/05/2016",
"Time": "2:10:16 PM",
"QuoteType": "Spot",
"Bid": 40.0195,
"Mid": 40.04965,
"Ask": 40.0798,
"Spread": 0.0603,
"Text": "1 European Union euro = 40.04965 Thai baht",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "TJS",
"Symbol": "EURTJS",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 8.927161,
"Mid": 8.928061,
"Ask": 8.928962,
"Spread": 0.00180082,
"Text": "1 European Union euro = 8.928061 Tajikistani somoni",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "TMT",
"Symbol": "EURTMT",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 3.959056,
"Mid": 3.970751,
"Ask": 3.982446,
"Spread": 0.02339,
"Text": "1 European Union euro = 3.970751 Turkmenistan manat",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "TND",
"Symbol": "EURTND",
"Date": "04/05/2016",
"Time": "2:10:16 PM",
"QuoteType": "Spot",
"Bid": 2.279,
"Mid": 2.2848,
"Ask": 2.2906,
"Spread": 0.0116,
"Text": "1 European Union euro = 2.2848 Tunisian dinara",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "TOP",
"Symbol": "EURTOP",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 2.411052,
"Mid": 2.497487,
"Ask": 2.583922,
"Spread": 0.17287,
"Text": "1 European Union euro = 2.497487 Tonga pa'anga",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "TRY",
"Symbol": "EURTRY",
"Date": "04/05/2016",
"Time": "2:10:19 PM",
"QuoteType": "Spot",
"Bid": 3.2125,
"Mid": 3.2145,
"Ask": 3.2165,
"Spread": 0.004,
"Text": "1 European Union euro = 3.2145 Turkish liras",
"Source": "SIX Financial Information, Buyer = \"Danske Bank\", Seller = \"Danske Bank\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "TTD",
"Symbol": "EURTTD",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 7.435084,
"Mid": 7.464105,
"Ask": 7.493125,
"Spread": 0.0580408,
"Text": "1 European Union euro = 7.464105 Trinidad and Tobago dollars",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "TWD",
"Symbol": "EURTWD",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 36.74889,
"Mid": 36.76915,
"Ask": 36.7894,
"Spread": 0.040517,
"Text": "1 European Union euro = 36.76915 New Taiwan dollars",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "TZS",
"Symbol": "EURTZS",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 2431.133,
"Mid": 2481.326,
"Ask": 2531.52,
"Spread": 100.3869,
"Text": "1 European Union euro = 2481.326 Tanzanian shillings",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "UAH",
"Symbol": "EURUAH",
"Date": "04/05/2016",
"Time": "2:10:16 PM",
"QuoteType": "Spot",
"Bid": 29.1407,
"Mid": 29.44155,
"Ask": 29.7424,
"Spread": 0.6017,
"Text": "1 European Union euro = 29.44155 Ukrainian hryvni/hryven",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "UGX",
"Symbol": "EURUGX",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 3811.584,
"Mid": 3817.593,
"Ask": 3823.602,
"Spread": 12.018,
"Text": "1 European Union euro = 3817.593 Ugandan shillings",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "USD",
"Symbol": "EURUSD",
"Date": "04/05/2016",
"Time": "2:10:21 PM",
"QuoteType": "Spot",
"Bid": 1.13454,
"Mid": 1.13457,
"Ask": 1.1346,
"Spread": 0.00006,
"Text": "1 European Union euro = 1.13457 United States dollars",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "UYU",
"Symbol": "EURUYU",
"Date": "04/05/2016",
"Time": "2:10:16 PM",
"QuoteType": "Spot",
"Bid": 35.3725,
"Mid": 35.97375,
"Ask": 36.575,
"Spread": 1.2025,
"Text": "1 European Union euro = 35.97375 pesos Uruguayos",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "UZS",
"Symbol": "EURUZS",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 3257.736,
"Mid": 3258.023,
"Ask": 3258.31,
"Spread": 0.574354,
"Text": "1 European Union euro = 3258.023 Uzbekistani som",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "VEF",
"Symbol": "EURVEF",
"Date": "04/05/2016",
"Time": "2:10:16 PM",
"QuoteType": "Spot",
"Bid": 11.3137,
"Mid": 11.32985,
"Ask": 11.346,
"Spread": 0.0323,
"Text": "1 European Union euro = 11.32985 Venezuelan bolivares fuertes",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "VND",
"Symbol": "EURVND",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 25292.58,
"Mid": 25295.38,
"Ask": 25298.18,
"Spread": 5.5938,
"Text": "1 European Union euro = 25295.38 Vietnamese dong",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "VUV",
"Symbol": "EURVUV",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 119.6452,
"Mid": 123.4736,
"Ask": 127.3021,
"Spread": 7.656952,
"Text": "1 European Union euro = 123.4736 Vanuatu vatu",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "WST",
"Symbol": "EURWST",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 2.818385,
"Mid": 2.900126,
"Ask": 2.981866,
"Spread": 0.163481,
"Text": "1 European Union euro = 2.900126 Samoan tala",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "XAF",
"Symbol": "EURXAF",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 655.668,
"Mid": 655.8125,
"Ask": 655.957,
"Spread": 0.288964,
"Text": "1 European Union euro = 655.8125 Central African CFA francs",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "XBT",
"Symbol": "EURXBT",
"Date": "04/05/2016",
"Time": "2:09:51 PM",
"QuoteType": "Calculated",
"Bid": 0.00269629,
"Mid": 0.00270684,
"Ask": 0.00271739,
"Spread": 0.0000211007,
"Text": "1 European Union euro = 0.00270684 Bitcoin",
"Source": "Rate calculated from BTC:EUR"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "XCD",
"Symbol": "EURXCD",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 3.06288,
"Mid": 3.06315,
"Ask": 3.06342,
"Spread": 0.00054,
"Text": "1 European Union euro = 3.06315 East Caribbean dollars",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "XDR",
"Symbol": "EURXDR",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 0.806558,
"Mid": 0.806686,
"Ask": 0.806814,
"Spread": 0.00025566,
"Text": "1 European Union euro = 0.806686 IMF Special Drawing Right",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "XLT",
"Symbol": "EURXLT",
"Date": "04/05/2016",
"Time": "2:10:21 PM",
"QuoteType": "Calculated",
"Bid": 0.351393,
"Mid": 0.352701,
"Ask": 0.354009,
"Spread": 0.0026165,
"Text": "1 European Union euro = 0.352701 Litecoin",
"Source": "Rates calculated by crossing via USD"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "XOF",
"Symbol": "EURXOF",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 655.668,
"Mid": 655.8125,
"Ask": 655.957,
"Spread": 0.288964,
"Text": "1 European Union euro = 655.8125 West African CFA francs",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "XPF",
"Symbol": "EURXPF",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 119.2791,
"Mid": 119.3054,
"Ask": 119.3317,
"Spread": 0.0525713,
"Text": "1 European Union euro = 119.3054 Comptoirs Francais du Pacifique Francs",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "YER",
"Symbol": "EURYER",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 283.203,
"Mid": 283.3981,
"Ask": 283.5933,
"Spread": 0.39031,
"Text": "1 European Union euro = 283.3981 Yemeni rial",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "ZAR",
"Symbol": "EURZAR",
"Date": "04/05/2016",
"Time": "2:10:21 PM",
"QuoteType": "Spot",
"Bid": 17.0389,
"Mid": 17.04175,
"Ask": 17.0446,
"Spread": 0.0057,
"Text": "1 European Union euro = 17.04175 South African rand",
"Source": "SIX Financial Information, Buyer = \"ICAP PLC London, Premium Spot Forex\", Seller = \"ICAP PLC London, Premium Spot Forex\""
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "ZMW",
"Symbol": "EURZMW",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 12.21749,
"Mid": 12.22991,
"Ask": 12.24233,
"Spread": 0.024846,
"Text": "1 European Union euro = 12.22991 Zambian kwacha",
"Source": "SIX Financial Information"
},
{
"Outcome": "Success",
"Message": null,
"Identity": null,
"Delay": 0,
"BaseCurrency": "EUR",
"QuoteCurrency": "ZWL",
"Symbol": "EURZWL",
"Date": "04/05/2016",
"Time": "2:09:14 PM",
"QuoteType": "Calculated",
"Bid": 362.0211,
"Mid": 365.7121,
"Ask": 369.4031,
"Spread": 7.381996,
"Text": "1 European Union euro = 365.7121 Zimbabwean dollars",
"Source": "SIX Financial Information"
}
];

 res.json(values);
 
};

