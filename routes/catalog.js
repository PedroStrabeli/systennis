var express = require('express');
var queries = require('../constants/queries.js')
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
	console.log('got a GET request');
  	req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);

        connection.query(queries.queries.catalog ,[],function(err,result){
        	 return res.status(200).json(result);
        });
  	});
});



module.exports = router;