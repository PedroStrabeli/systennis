var express = require('express');
var queries = require('../constants/queries.js')
var router = express.Router();
/* Envia lista de produtos. */
router.get('/', function(req, res) {
	console.log('got a GET request');
  	req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);

        connection.query(queries.queries.catalog ,[],function(err,result){
        	 return res.status(200).json(result);
        });
  	});
});

/* CREATE */
router.post('/create', function(req, res) {
	console.log(req.body);
	var input = JSON.parse(JSON.stringify(req.body));
	console.log(input);
    var ProdutoParsedFromForm = {

        nome_prod   	: input.nome,
        desc_prod 		: input.descricao,
        tipo_prod   	: input.tipo,
        subtipo_prod	: input.subtipo,
        cor_prod		: input.cor,
        marca_prod		: input.marca,
        preco_prod		: input.preco,
        estoque_prod	: input.estoque,
        url_imagem		: input.imagem
	};
	console.log(ProdutoParsedFromForm);
	req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);
		connection.query("INSERT INTO tb_produto set ? ",ProdutoParsedFromForm, function(err, rows)
	    {

	        if (err)
	            console.log("Error inserting : %s ",err );

	        res.redirect('/customer');

		});
	});
	console.log("Sucesso!");	
});


/* DELETE */
router.post('/delete', function(req, res) {
    var input = req.body;
    console.log(input);
    req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);
        connection.query("DELETE FROM tb_produto WHERE id_prod=?;",input.id_prod, function(err, rows)
        {

            if (err)
                console.log("Error inserting : %s ",err );

            res.redirect('/customer');

        });
    });
    console.log("Sucesso!");    
});

module.exports = router;