var express = require('express');
var queries = require('../../constants/queries.js')
var router = express.Router();

/* GET METHODS ------------------------------------------------------------------------------------------------------------------------------------------- */
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

/* Envia dados do produto recuperado */
router.get('/recupera:id_prod', function(req, res) {
    console.log('got a GET request');
    console.log(req.params.id_prod);
    req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);

        connection.query("SELECT * FROM tb_produto WHERE id_prod=?" ,req.params.id_prod,function(err,result){
             return res.status(200).json(result);
        });
    });
});

/* Envia dados de tamanhos do produto recuperado */
router.get('/tamanhos:id_prod', function(req, res) {
    console.log('got a GET request');
    console.log(req.params.id_prod);
    req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);

        connection.query("SELECT * FROM tamanho_produto WHERE id_prod=?" ,req.params.id_prod,function(err,result){
             return res.status(200).json(result);
        });
    });
});


/* POST METHODS ------------------------------------------------------------------------------------------------------------------------------------------- */
/* CREATE PRODUTO*/
router.post('/create', function(req, res) {
	console.log(req.body);
	var input = JSON.parse(JSON.stringify(req.body));
    var ProdutoParsedFromForm = {

        nome_prod   	: input.nome_prod,
        desc_prod 		: input.desc_prod,
        tipo_prod   	: input.tipo_prod,
        subtipo_prod	: input.subtipo_prod,
        cor_prod		: input.cor_prod,
        marca_prod		: input.marca_prod,
        preco_prod		: input.preco_prod,
        estoque_prod	: input.estoque_prod,
        url_imagem		: input.url_imagem
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

/* UPDATE PRODUTO */
router.post('/update', function(req, res) {
    console.log(req.body);
    var input = JSON.parse(JSON.stringify(req.body));
    var ProdutoParsedFromForm = {

        nome_prod       : input.nome_prod,
        desc_prod       : input.desc_prod,
        tipo_prod       : input.tipo_prod,
        subtipo_prod    : input.subtipo_prod,
        cor_prod        : input.cor_prod,
        marca_prod      : input.marca_prod,
        preco_prod      : input.preco_prod,
        estoque_prod    : input.estoque_prod,
        url_imagem      : input.url_imagem,
    };
    var id_prod = input.id_prod;
    req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);
        connection.query("UPDATE tb_produto set ? WHERE id_prod=? ",[ProdutoParsedFromForm, id_prod], function(err, result)
        {

            if (err)
                console.log("Error inserting : %s ",err );

        });
    });
    console.log("Updated!");
});

/* DELETE PRODUTO*/
router.post('/delete', function(req, res) {
    var input = req.body;
    console.log(input);
    req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);
        connection.query("DELETE FROM tb_produto WHERE id_prod=?",input.id_prod, function(err, rows)
        {

            if (err)
                console.log("Error inserting : %s ",err );

            res.redirect('/customer');

        });
    });
    console.log("Sucesso!");    
});

/* CREATE TAMANHOS */
router.post('/create_tamanho', function(req, res) {
    var input = JSON.parse(JSON.stringify(req.body));
    var InputParsedFromForm = {

        id_prod      : input.id_prod,
        tamanho_prod : input.tamanho_prod
    };
    req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);
        connection.query("INSERT INTO tamanho_produto set ? ",InputParsedFromForm, function(err, result)
        {

            if (err)
                console.log("Error inserting : %s ",err );

        });
    });
    console.log("Criando Tamanho!"); 
});

/* DELETE TAMANHOS */
router.post('/delete_tamanho', function(req, res) {
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);
        connection.query("DELETE FROM tamanho_produto WHERE id_prod=? AND tamanho_prod=?",[input.id_prod, input.tamanho_prod], function(err, result)
        {

            if (err)
                console.log("Error inserting : %s ",err );

        });
    });
    console.log("Tamnho Deletedo!"); 
});





module.exports = router;