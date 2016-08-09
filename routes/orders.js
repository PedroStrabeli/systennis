var express = require('express');
var queries = require('../constants/queries.js')
var router = express.Router();


router.get('/cli:id_cliente',function(req, res){
	req.getConnection(function(err,connection){
  		var id_cliente=req.params.id_cliente;
  		if(err) return res.status(400).json(err);
  		console.log(queries.queries.get_orders(id_cliente))
        connection.query(queries.queries.get_orders(id_cliente) ,[] ,function(err,result){
        	console.log(JSON.stringify(err))
        	console.log(result)
        	return res.status(200).json(result);
        });
  	});
});

router.get('/cli:id_cliente/getorder:id_pedido',function(req, res){
	req.getConnection(function(err,connection){
  		var id_cliente=req.params.id_cliente;
  		var id_pedido=req.params.id_pedido;
  		if(err) return res.status(400).json(err);
  		console.log(queries.queries.get_orders(id_cliente))
        connection.query(queries.queries.get_order_prods(id_cliente, id_pedido) ,[] ,function(err,result){
        	console.log(JSON.stringify(err))
        	console.log(result)
        	return res.status(200).json(result);
        });
  	});
});

module.exports = router;
