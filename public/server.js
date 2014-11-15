// server.js

// set up -----------------------

var 	express 		= require('express');
var 	app 			= express(); // create app with express framework for node in
var 	mongoose		= require('mongoose'); // for mongoDB
var 	morgan			= require('morgan'); // log requests to the console
var 	bodyParser 		= require('body-parser');
var 	methodOverride 	= require('method-override');

// configuraiotn ----------------------

mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uw03mypu'); //

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev')); //log on console
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

//listen (start app)

app.listen(8080);
console.log("App listening on port 8080");