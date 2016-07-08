var express = require('express');
var queries = require('../constants/queries.js')
var router = express.Router();
/* GET home page. */
router.get('/:id_cliente', function(req, res) {
  	req.getConnection(function(err,connection){
  		var id_cliente=req.params.id_cliente;
        if(err) return res.status(400).json(err);

        connection.query(queries.queries.cart+id_cliente ,[],function(err,result){
        	console.log(result);
        	return res.status(200).json(result);
        });
  	});
});

module.exports = router;
