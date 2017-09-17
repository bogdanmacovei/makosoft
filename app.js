// Module instalate

var mongoose = require ('mongoose');
var bodyParser = require ('body-parser');
var express = require ('express');

// Variabile pentru module

var app = express ();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + '/views'));

mongoose.Promise = global.Promise;

var server = app.listen(process.env.PORT || 8000, function (err) {
	if (err) throw err;
	console.log ('Connected to port 8000');
});

// Ma conectez la baza de date

mongoose.connect('mongodb://localhost:27017/mydb')
	.then(() => console.log('Connected'))
	.catch(err => console.log(err));

// Structura tabelului

var cursSchema = new mongoose.Schema({
	_id: Number,
	nume: String,
	perioada: {
		an: Number,
		semestru: Number
	},
	rezultat: {
		nr_credite: Number,
		media: Number
	},
	profesor: {
		curs: String,
		seminar: String,
		laborator: String
	},
	pondere: {
		curs: Number,
		seminar: Number,
		laborator: Number
	}
}, {collection: 'curs'});

mongoose.model ('Curs', cursSchema);

var Curs = mongoose.model ('Curs');

var notaSchema = new mongoose.Schema({
	_id: Number,
	curs: String,
	tip: String, // curs, seminar, laborator
	nota: Number,
	data: String
}, {collection: 'nota'});

mongoose.model ('Nota', notaSchema);

var Nota = mongoose.model ('Nota');

var sugestieSchema = new mongoose.Schema({
	_id: Number,
	comentariu: String,
	voturi: Number
}, {collection: 'sugestie'});

mongoose.model ('Sugestie', sugestieSchema);

var Sugestie = mongoose.model ('Sugestie');

// get pages

app.get ('/', function (req, res) {
	res.sendFile (__dirname + '/views/index.html');
});

app.get ('/adaugare.html', function (req, res) {
	res.sendFile (__dirname + '/views/adaugare.html');
});

app.get ('/curs.html', function (req, res) {
	res.sendFile (__dirname + '/views/curs.html');
});

app.get ('/note.html', function (req, res) {
	res.sendFile (__dirname + '/views/note.html');
});

app.get ('/cursuri.html', function (req, res) {
	res.sendFile (__dirname + '/views/cursuri.html');
});

// post

app.post ('/insertCurs', function (req, res) {
	var curs = new Curs (req.body);
	curs.save ();
});

app.post ('/insertNota', function (req, res) {
	var nota = new Nota (req.body);
	nota.save ();
});

app.post ('/updateMedia', function (req, res) {
	Curs.updateOne (req.body.find, req.body.replace)
		.catch (err => console.log (err))
		.then (() => console.log ('succes'));
});

app.post ('/insertSugestie', function (req, res) {
	var sugestie = new Sugestie (req.body);
	sugestie.save ();
});
// Curs.find({})
// 	.catch (err => console.log (err))
// 	.then (res => console.log (res));

app.get ('/selectCursuri', function (req, res) {
	Curs.find({})
		.catch (err => console.log (err))
		.then (result => {
			res.send (result);
		});
});

app.get ('/selectCurs/:id', function (req, res) {
	var query = {
		_id: req.params.id
	};
	Curs.find(query)
		.catch (err => console.log (err))
		.then (result => {
			res.send (result);
		});
});

app.get ('/selectNote', function (req, res) {
	Nota.find({})
		.catch (err => console.log (err))
		.then (result => {
			res.send (result);
		});
});

app.get ('/stergeNota/:id', function (req, res) {
	Nota.deleteOne({_id: req.params.id})
		.catch (err => console.log (err))
		.then (result => {
			console.log ('deleted');
		});
});

app.get ('/selectNotele/:curs', function (req, res) {
	Nota.find({curs: req.params.curs})
		.catch (err => console.log (err))
		.then (result => {
			res.send (result);
		});
});

app.get ('/stergeCurs/:id', function (req, res) {
	Curs.deleteOne ({_id: req.params.id})
		.catch (err => console.log (err))
		.then (result => {
			console.log ('curs deleted');
		});
});

app.get ('/ultimeleCursuri', function (req, res) {
	Curs.find({}).sort({_id: -1}).limit(5)
		.catch (err => console.log (err))
		.then (result => res.send (result));
});

app.get ('/selectSugestii', function (req, res) {
	Sugestie.find({})
		.catch (err => console.log (err))
		.then (result => {
			res.send (result);
		});
});

app.get ('/stergeSugestie/:id', function (req, res) {
	Sugestie.deleteOne({_id: req.params.id})
		.catch (err => console.log (err))
		.then (() => {
			console.log ('succes');
		});
});
