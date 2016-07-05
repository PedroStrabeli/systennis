var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  	req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);

        connection.query('SELECT DISTINCT nome_prod FROM tb_produto',[],function(err,result){
        	console.log(result);
        	return res.status(200).json(result);
        });
  	});
});

module.exports = router;