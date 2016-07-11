var express = require('express');
var queries = require('../constants/queries.js')
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {  
    console.log('The app has just been started');
    res.status(200).render('index');    	
});




module.exports = router;
