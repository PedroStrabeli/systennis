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
	req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);
		connection.query("INSERT INTO tb_produto set ? ",ProdutoParsedFromForm, function(err, result)
	    {

	        if (err)
	            console.log("Error inserting : %s ",err );

            var id_prod = {id : result.insertId}
            return res.status(200).json(id_prod);
		});
	});
	console.log("Sucesso!");
});


/* CREATE TAMANHOS */
router.post('/create_tamanho', function(req, res) {
    var input = JSON.parse(JSON.stringify(req.body));
    var InputParsedFromForm = {

        id_prod      : input.id_prod,
        tamanho_prod : input.tamanho
    };
    console.log(InputParsedFromForm);
    req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);
        connection.query("INSERT INTO tamanho_produto set ? ",InputParsedFromForm, function(err, result)
        {

            if (err)
                console.log("Error inserting : %s ",err );

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