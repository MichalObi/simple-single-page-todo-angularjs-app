var Todo = require('./models/todo'); // do startu potrzebny plik todo z bazy danych w którym zapisane są todosy

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// pobranie todosów przez metodę get z bazy i zwrócenie ich w formacie json
	app.get('/api/todos', function(req, res) {

		
		Todo.find(function(err, todos) {

			
			if (err)
				res.send(err)

			res.json(todos); 
		});
	});

	// dodanie todosa przez metodę post do bazy i ponowne przesłanie bazy
	app.post('/api/todos', function(req, res) {

		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});

	});

	// usunięcie wybranego todusa metodą delate
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // wysłanie pliku index.html przy starcie strony
	});
};