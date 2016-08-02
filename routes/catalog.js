var express = require('express');
var queries = require('../constants/queries.js')
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
	console.log('got a GET request');
  	req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);

        connection.query(queries.queries.catalog()+' LIMIT 39' ,[],function(err,result){
        	 return res.status(200).json(result);
        });
  	});
});

router.get('/brands', function(req, res) {
  	req.getConnection(function(err,connection){
	    if(err) return res.status(400).json(err);

	    var searchQuery = queries.queries.fetch_brands();

	    connection.query(searchQuery ,[],function(err,result){
	    	 if(err) return res.status(400).json(err);
	    	 return res.status(200).json(result);
	    });
	});
});

router.get('/types', function(req, res) {
  	req.getConnection(function(err,connection){
	    if(err) return res.status(400).json(err);

	    var searchQuery = queries.queries.fetch_types();
	    console.log(searchQuery);

	    connection.query(searchQuery ,[],function(err,result){
	    	 if(err) return res.status(400).json(err);
	    	 return res.status(200).json(result);
	    });
	});
});

router.post('/', function(req, res) {
  	req.getConnection(function(err,connection){
	    if(err) return res.status(400).json(err);

	    // var searchQuery = queries.queries.search + req.body.opt + "%' LIMIT 39"
	    var searchQuery = queries.queries.search(req.body.searchQuery) + " LIMIT 39";
	    console.log(searchQuery);

	    connection.query(searchQuery ,[],function(err,result){
	    	 // if(err) return res.status(400).json(err);
	    	 return res.status(200).json(result);
	    });
	});
});

router.post('/brandfilter', function(req, res) {
  	req.getConnection(function(err,connection){
	    if(err) return res.status(400).json(err);

	    // var searchQuery = queries.queries.search + req.body.opt + "%' LIMIT 39"
	    var searchQuery = queries.queries.filter_by_brand(req.body.searchQuery) + " LIMIT 39";
	    console.log(searchQuery);

	    connection.query(searchQuery ,[],function(err,result){
	    	 // if(err) return res.status(400).json(err);
	    	 return res.status(200).json(result);
	    });
	});
});

router.post('/typefilter', function(req, res) {
  	req.getConnection(function(err,connection){
	    if(err) return res.status(400).json(err);

	    // var searchQuery = queries.queries.search + req.body.opt + "%' LIMIT 39"
	    var searchQuery = queries.queries.filter_by_type(req.body.searchQuery) + " LIMIT 39";
	    console.log(searchQuery);

	    connection.query(searchQuery ,[],function(err,result){
	    	 // if(err) return res.status(400).json(err);
	    	 return res.status(200).json(result);
	    });
	});
});

module.exports = router;
