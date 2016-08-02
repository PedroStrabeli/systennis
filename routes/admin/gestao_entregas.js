var express = require('express');
var queries = require('../../constants/queries.js')
var router = express.Router();

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


module.exports = router;