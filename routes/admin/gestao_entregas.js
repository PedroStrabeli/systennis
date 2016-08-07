var express = require('express');
var queries = require('../../constants/queries.js')
var router = express.Router();

/* POST -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/* Envia lista de pedidos. */
router.get('/pedidos_aprovados', function(req, res) {
	console.log('got a GET request');
  	req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);

        connection.query("SELECT * FROM systennis_db.tb_pedido p INNER JOIN tb_cliente c ON p.id_cliente=c.id_cliente WHERE status_pedido='Aprovado';" ,[],function(err,result){
        	 return res.status(200).json(result);
        });
  	});
});

/* Envia lista de pedidos do gestor. */
router.get('/pedidos_supervisor:id_supervisor', function(req, res) {
    console.log('got a GET request');
    console.log(req.params.id_supervisor);
    req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);

        connection.query("SELECT * FROM systennis_db.tb_pedido WHERE id_supervisor=?;" ,req.params.id_supervisor,function(err,result){
             return res.status(200).json(result);
        });
    });
});

/* Envia pedido. */
router.get('/pedido:id_pedido', function(req, res) {
    console.log('got a GET request');
    req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);

        connection.query("SELECT * FROM systennis_db.tb_pedido p INNER JOIN tb_cliente c ON p.id_cliente=c.id_cliente WHERE id_pedido=?;" ,req.params.id_pedido,function(err,result){
             return res.status(200).json(result);
        });
    });
});

/* Envia equipe. */
router.get('/equipe:id_supervisor', function(req, res) {
    console.log('got a GET request');
    req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);

        connection.query("SELECT * FROM systennis_db.tb_funcionario f WHERE id_supervisor=?;" ,req.params.id_supervisor,function(err,result){
             return res.status(200).json(result);
        });
    });
});

/* Envia endereço. */
router.get('/endereco:id_endereco', function(req, res) {
    console.log('got a GET request');
    req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);

        connection.query("SELECT * FROM systennis_db.tb_endereco e WHERE id_endereco=?;" ,req.params.id_endereco,function(err,result){
             return res.status(200).json(result);
        });
    });
});

/* Envia Itens Pedido. */
router.get('/itens_pedido:id_pedido', function(req, res) {
    console.log('got a GET request');
    req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);

        connection.query("SELECT * FROM systennis_db.item_pedido I LEFT JOIN tb_produto P ON I.id_prod = P.id_prod WHERE id_pedido=?;" ,req.params.id_pedido,function(err,result){
             return res.status(200).json(result);
        });
    });
});

/* Envia Entregas. */
router.get('/entregas:id_pedido', function(req, res) {
    console.log('got a GET request');
    req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);

        connection.query("SELECT e.id_entrega, f.nome_func, f.sobrenome_func, e.horario_entrega, e.status_entrega FROM systennis_db.tb_entrega e INNER JOIN tb_funcionario f ON e.id_func=f.id_func WHERE id_pedido=?;" ,req.params.id_pedido,function(err,result){
             return res.status(200).json(result);
        });
    });
});

/* Envia Itens de Entrega*/
router.get('/entregaitens:id_entrega', function(req, res) {
    console.log(req.params.id_entrega);
    req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);

        connection.query("SELECT * FROM systennis_db.item_pedido i INNER JOIN tb_produto p ON i.id_prod = p.id_prod WHERE id_entrega=?" ,req.params.id_entrega,function(err,result){
             return res.status(200).json(result);
             console.log(result);
        });
    });
});


/* POST -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/* Aloca pedidos para o gerente */
router.post('/selecionar_pedidos', function(req, res) {
    console.log(req.body);
    var input = JSON.parse(JSON.stringify(req.body));
     var pedido = {
        status_pedido   : input.status_pedido,
        id_supervisor   : input.id_supervisor
    };
    var id_pedido = input.id_pedido;
    req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);
        connection.query("UPDATE tb_pedido set ? WHERE id_pedido=? ",[pedido, id_pedido], function(err, result)
        {

            if (err)
                console.log("Error inserting : %s ",err );

        });
    });
    console.log("Sucesso!");
});

/* CREATE ENTREGA*/
router.post('/create_entrega', function(req, res) {
    console.log(req.body);
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);
        connection.query("INSERT INTO tb_entrega set ? ",input, function(err, result)
        {

            if (err)
                console.log("Error inserting : %s ",err );

            var id_entrega = {id : result.insertId}
            return res.status(200).json(id_entrega);
        });
    });
    console.log("Sucesso!");
});

/* Aloca pedidos para o gerente */
router.post('/edit_item_pedido', function(req, res) {
    var input = JSON.parse(JSON.stringify(req.body));
    var pedido = {
        id_entrega      : input.id_entrega,
        id_pedido       : input.id_pedido,
        id_prod         : input.id_prod
    };
    req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);
        connection.query("UPDATE item_pedido set id_entrega=? WHERE id_pedido=? AND id_prod=? ",[pedido.id_entrega, pedido.id_pedido, pedido.id_prod], function(err, result)
        {

            if (err)
                console.log("Error inserting : %s ",err );

        });
    });
    console.log("Sucesso!");
});

module.exports = router;