// server.js - applicatie voor het ophalen en
// opslaan van boeken in MongoDB
var express = require('express');
var routes = require('./router');


var bodyParser = require('body-parser');
var Boek = require('./models/boeken');

var app = express();

// 0. Middleware: JSON & form-data verwerken in body van request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// 0. Middleware: statische website serveren
app.use(express.static(__dirname + '/public'));

// 5. Gebruik de Routes in ingesloten bestand
app.use('/', routes);




app.use('/boekentabel', function(req, res){
	res.sendFile('public/boeken.html');

})




// 5. Server sarten.
app.listen(3000, function () {
	console.log('server gestart op poort 3000');
});
