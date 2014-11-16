// server.js

// set up -----------------------

var 	express 		= require('express'); // framework for node.js to help write web app
var 	app 			= express(); // create app with express framework for node in
var 	mongoose		= require('mongoose'); // client for mongoDB in nodejs 
var 	morgan			= require('morgan'); // log requests to the console
var 	bodyParser 		= require('body-parser');
var 	methodOverride 	= require('method-override');

// configuraiotn ----------------------

mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uw03mypu'); // conect to database

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev')); //log on console
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

//define model ------------------------

var Todo = mongoose.model('Todo', {
	text: String
});

// routes----------------------------------

//api------------

// GET all todos

app.get('/api/todos', function(req, res) { // direction of sending
	Todo.find(function(err, todos) { // use mongoose to get all todos in database
		if (err) // if error occurs send the error
			res.send(err)
		res.json(todos); // if no error detected send all todos in .json
	});
});


// create todo and send all todos after cration

app.post('/api/todos', function(req, res) {// direction of sending

	Todo.create({
		text: req.body.text,
		done: false
	}, function(err, todo) {
		if (err)
			res.send(err);

		Todo.find(function(err, todos) { // use mongoose to get all todos in database
			if (err) // if error occurs send the error
				res.send(err)
			res.json(todos); // if no error detected send all todos in .json
		});
	});
});

// delate todo

app.delete('/api/todos:todo_id', function(req, res) {// direction of sending

	Todo.remove({
		_id : req.params.todo_id
	}, function(err, todo) {
		if (err)
			res.send(err);

		Todo.find(function(err, todos) { // use mongoose to get all todos in database
			if (err) // if error occurs send the error
				res.send(err)
			res.json(todos); // if no error detected send all todos in .json
		});
	});
});

app.get('*', function(req, res) {
	res.sendfile('./index.html'); // send index.html, when app start
});


//listen (start app)

app.listen(8080);
console.log("App listening on port 8080");

