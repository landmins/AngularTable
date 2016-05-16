// API - versie 2
var express = require('express');
var router = express.Router();

router.use(function(req, res, next){
	console.log('Router aangeroepen: ', new Date());
	next();
});
// homepage voor deze router.

module.exports = router;
