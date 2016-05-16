// .\routes\index.js - bestand met routes voor boeken, auteurs en login.
// Wordt ingesloten via server4.js.
var router = require('express').Router();
var boeken = require('../db');

var bodyParser = require('body-parser');
var Boek = require('../models/boeken');



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
	extended: true
}));

router.get('/api', function (req, res) {
	var msg = '<h1>Express API</h1>';
	msg += '<p>Gebruik \\api\\auteurs voor een lijst met auteurs.</p>';
	msg += '<p>Gebruik \\api\\boeken voor een lijst met boeken.</p>';
	res.send(msg);
});



// 2. POST-endpoint: nieuw boek in de database plaatsen.
router.post('/api/boeken', function (req, res, next) {
	// 2a. nieuw boekobject maken.
	var boek = new Boek({
		titel : req.body.titel,
		auteur: req.body.auteur,
		ISBN  : req.body.isbn
	});

	console.log("Added : ", boek);
	// 2b. Opslaan in database.
	boek.save(function (err, boek) {
		// indien error: teruggeven
		if (err) {
			console.log("Success : ", boek);
			return next(err);
		}
		// indien OK: status 201 (Created) en boekobject teruggeven
		res.status(201).json(boek);
		console.log("Created : ", boek);
	})
});

// 3. GET-endpoint: nieuw boek in de database plaatsen.
router.get('/api/boeken', function (req, res, next) {
	Boek.find(function (err, boeken) {
		if (err) {
			return next(err);
		}
		res.json(boeken);
	})
});

// 4. DELETE-endpoint: boek verwijderen uit de database.
router.delete('/api/boeken/:id', function (req, res, next) {
	Boek.remove({_id: req.params.id}, function (err, removed) {
		if (err) {
			return next(err);
		}
		res.status(200).json(removed);
	})
});
module.exports = router;
