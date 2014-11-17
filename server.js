// ustawienia ======================================================================
var express  = require('express');
var app      = express(); 								// tworzy aplikację kożystając z nodowego frameworka Exress
var mongoose = require('mongoose'); 					// połączenie do bazy danych mongoDB
var port  	 = process.env.PORT || 8080; 				// ustawia domyślny port na 8080
var database = require('./config/database'); 			// konfiguracja zdalnej bazy danych hostowanej na https://modulus.io/
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// konfiguracja
mongoose.connect(database.url); 	// połączenie z zdalną bazą danych - adres url podany w config/database

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev')); // każde żądanie logowane do konsoli
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride('X-HTTP-Method-Override')); 


// ścieżki - API
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
