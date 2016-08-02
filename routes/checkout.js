var express = require('express');
var queries = require('../constants/queries.js')
var router = express.Router();

router.get('/getAddress/cli:id_cliente',function(req, res){
	req.getConnection(function(err,connection){
  		var id_cliente=req.params.id_cliente;
  		if(err) return res.status(400).json(err);
        connection.query(queries.queries.get_address(id_cliente) ,[] ,function(err,result){
        	return res.status(200).json(result);
        });
  	});
});

router.post('/payment',function(req,res){
	var id_pagamento;
	setTimeout(function() {
		req.getConnection(function(err,connection){
	  		if(err) return res.status(400).json(err);
	  			connection.query(queries.queries.update_payment(id_pagamento) ,[] ,function(err,result){	
            //console.log(queries.queries.update_payment(id_pagamento))
  			})
	  	})
	},10000);
	//console.log(queries.queries.payment(req.body.params));
		req.getConnection(function(err,connection){
	  		if(err) return res.status(400).json(err);
    	   connection.query(queries.queries.payment(req.body.params) ,[] ,function(err,result){
     		
          req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);
        connection.query(queries.queries.getpayid() ,[] ,function(err,result){
     		//console.log(result[0].id_pagamento)
        id_pagamento=result[0].id_pagamento;
        res.json(result[0].id_pagamento);
        })})
     	});
     });
})

// router.get('/getAddress',function(req, res){
// 	req.getConnection(function(err,connection){
//   		var id_cliente=req.params.id_cliente;
//   		if(err) return res.status(400).json(err);

//         connection.query(queries.queries.get_address(id_cliente) ,[] ,function(err,result){

//         	return res.status(200).json(result);
//         });
//   	})
// });

module.exports = router;