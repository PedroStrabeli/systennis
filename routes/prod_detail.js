var express = require('express');
var queries = require('../constants/queries.js')
var router = express.Router();

/* GET home page. */
router.get('/prod=:id_prod', function(req, res) {
  	//get produtc details
  	var id_prod = req.params.id_prod;
  	req.getConnection(function(err,connection){

        if(err) return res.status(400).json(err);

        connection.query(queries.queries.prod_detail(id_prod) //id_prod
         ,[],function(err,result){
        	// console.log(result);
        	return res.status(200).json(result);
        });
//ARRUMAR ISSO!!!
  	});
});

router.get('/prod=:id_prod/getsizes', function(req, res) {
  	//get the sizes.
	req.getConnection(function(err,connection){
  		var id_prod = req.params.id_prod;
        if(err) return res.status(400).json(err);
        connection.query(queries.queries.tamanho_prod(id_prod) //id_prod
         ,[],function(err,result){
        	// console.log(result);
        	return res.status(200).json(result);
        });
  	});
});

router.get('/prod=:id_prod/getcolors', function(req, res) {

  console.log(queries.queries.prod_colors_available(id_prod));

    //get the colors.
  req.getConnection(function(err,connection){
      var id_prod = req.params.id_prod;
        if(err) return res.status(400).json(err);
        connection.query(queries.queries.prod_colors_available(id_prod) //id_prod
         ,[],function(err,result){
          console.log(result);
          return res.status(200).json(result);

        });
    });
});

module.exports = router;