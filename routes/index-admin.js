var express = require('express');
var queries = require('../constants/queries.js')
var router_admin = express.Router();
/* GET home page. */
router_admin.get('/', function(req, res) {  
    console.log('The app has been started');
    res.status(200).render('index-admin');    	
});




module.exports = router_admin;
