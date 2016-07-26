	var queries={}

//CATALOG
//queries.catalog= function (){return 'SELECT DISTINCT id_prod, nome_prod, desc_prod,marca_prod, preco_prod, url_imagem FROM tb_produto';}	
queries.catalog= function (){return 'SELECT DISTINCT * FROM tb_produto';}	

//PROD_DETAIL
queries.prod_detail= function (id_prod){return  'SELECT DISTINCT id_prod, nome_prod, desc_prod, tipo_prod, subtipo_prod, cor_prod, marca_prod, preco_prod, url_imagem FROM tb_produto where id_prod = '+ id_prod;}

queries.tamanho_prod= function (id_prod){return  'SELECT tamanho_prod FROM tamanho_produto WHERE id_prod = '+ id_prod;}



//CART
queries.add_cart= function (params){return 'INSERT INTO item_carrinho (id_cliente, id_prod, tamanho_prod, qte_prod) VALUES ('+params+')'};

queries.check_cart=  function (id_cliente, id_prod, tamanho_prod){return 'SELECT count(*) as count FROM item_carrinho WHERE id_cliente = '+id_cliente+' AND id_prod = '+id_prod+' AND tamanho_prod = '+tamanho_prod};

queries.get_cart= function (id_cliente){return   'SELECT id_prod, nome_prod, desc_prod,cor_prod, tamanho_prod, preco_prod, url_imagem, qte_prod FROM item_carrinho LEFT JOIN tb_produto using(id_prod) LEFT JOIN tb_cliente using(id_cliente) WHERE id_cliente = '+id_cliente;};

queries.remove_cart=function(id_cliente,id_prod){return 'DELETE FROM item_carrinho WHERE id_cliente = '+id_cliente+' AND id_prod = '+id_prod;}
//CHECKOUT

queries.get_address= function (id_cliente){return   'select * from cliente_endereco left join tb_endereco using(id_endereco) WHERE id_cliente = '+id_cliente};

queries.payment = function (id_cliente){return   'select * from cliente_endereco left join tb_endereco using(id_endereco) WHERE id_cliente = '+id_cliente};

queries.finish_order = function (params){return   'INSERT INTO tb_pedido (id_cliente, data_pedido, status_pedido, entrega_parcial, id endereco, id_cortesia, id_func, id_pagamento) VALUES ('+params+');'};

queries.get_order_id = function (id_cliente){return   'select id_pedido from tb_pedido where id_cliente = '+id_cliente+' order by data_pedido desc'};

queries.insert_order_items= function (id_pedido, params){
	var query='INSERT INTO item_pedido (id_pedido, id_prod, tamanho_prod, qte_prod VALUES '; 
	
	for (item in params){
		query+='('+ id_pedido +', '+item.id_prod +', '+item.tamanho_prod +', '+item.qte_prod+'),';
	};

	return  query.substring(0, query.length - 1);
};

exports.queries = queries
