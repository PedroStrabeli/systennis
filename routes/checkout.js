var express = require('express');
var queries = require('../constants/queries.js')
var router = express.Router();

router.get('/getAddress',function(req, res){
	req.getConnection(function(err,connection){
  		var id_cliente=req.params.id_cliente;
  		if(err) return res.status(400).json(err);

        connection.query(queries.queries.get_address(id_cliente) ,[] ,function(err,result){

        	return res.status(200).json(result);
        });
  	}
});

router.get('/getAddress',function(req, res){
	req.getConnection(function(err,connection){
  		var id_cliente=req.params.id_cliente;
  		if(err) return res.status(400).json(err);

        connection.query(queries.queries.get_address(id_cliente) ,[] ,function(err,result){

        	return res.status(200).json(result);
        });
  	}
});

module.exports = router;