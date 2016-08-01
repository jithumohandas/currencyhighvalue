var app = require('express')();
var config = require('./config.json');
var bodyParser = require('body-parser');
var apiroutes = require('./routers/apiroutes.js');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", "./views");

app.use('/', apiroutes);

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
    }
});

app.listen(config.server.port, function(){
	console.log("ReST API server running on port : "+config.server.port);
})