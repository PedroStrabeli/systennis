var express = require('express');
var queries = require('../constants/queries.js')
var mail = require('../constants/emails.js')
var router = express.Router();

router.get('/',function(req, res){
	req.getConnection(function(err,connection){
  		//var id_cliente=req.params.id_cliente;
  		query= "INSERT INTO tamanho_produto (id_prod, tamanho_prod) VALUES "

  		if(err) return res.status(400).json(err);
        connection.query("select id_prod from tb_produto" ,[] ,function(err,result){
        	for (i in result){
        		//console.log(result[i].id_prod);
        		query+="("+result[i].id_prod+","+35+"),";
        		query+="("+result[i].id_prod+","+36+"),";
        		query+="("+result[i].id_prod+","+37+"),";
        		query+="("+result[i].id_prod+","+38+"),";
        		query+="("+result[i].id_prod+","+39+"),";
        		query+="("+result[i].id_prod+","+40+"),";
        		query+="("+result[i].id_prod+","+41+"),";
        		query+="("+result[i].id_prod+","+42+"),";
        		query+="("+result[i].id_prod+","+43+"),";
        		query+="("+result[i].id_prod+","+44+"),";
        	}
        	query=query.substring(0,query.length-1)+";"
        	connection.query(query ,[] ,function(err,result){
        		if(err)
        			console.log('erro: '+JSON.stringify(err))
        		else console.log("Feito.")
        	})
        });
  	});
});

module.exports = router;