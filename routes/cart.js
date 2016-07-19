var express = require('express');
var queries = require('../constants/queries.js')
var router = express.Router();
/* GET home page. */

router.get('/:id_cliente', function(req, res) {
  	req.getConnection(function(err,connection){
  		var id_cliente=req.params.id_cliente;
        if(err) return res.status(400).json(err);

        connection.query(queries.queries.get_cart+id_cliente ,[] ,function(err,result){

        	return res.status(200).json(result);
        });
  	});
});


router.post('/CheckProd', function(req, res) {
  	req.getConnection(function(err,connection){
  		var id_cliente=req.params.id_cliente;
  		var id_prod=req.params.id_prod;
        if(err) return res.status(400).json(err);
        console.log(queries.queries.check_cart(req.body.id_cliente, req.body.id_prod))
        connection.query(queries.queries.check_cart(req.body.id_cliente, req.body.id_prod) ,[] ,function(err,result){
        	console.log(JSON.stringify(result));

        	return res.status(200).json(result);
        });
  	});
});

router.post('/addCartProduct', function(req, res){
    req.getConnection(function(err,connection){
      
        if(err) return res.status(400).json(err);
        var insert=[req.body.id_cliente, req.body.id_prod, req.body.tamanho_prod, req.body.qte_prod];
        
        console.log(queries.queries.add_cart(insert));
        connection.query(queries.queries.add_cart(insert) ,[] ,function(err,result){
          console.log(JSON.stringify(result));
          return res.status(200).json(result);
        });
    });
});
  


module.exports = router;

