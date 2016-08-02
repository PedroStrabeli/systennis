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

queries.change_item=function(id_cliente,id_prod, qte_prod){return 'UPDATE item_carrinho SET qte_prod='+qte_prod+' WHERE id_cliente='+id_cliente+' AND id_prod='+id_prod};
//CHECKOUT

queries.get_address= function (id_cliente){return   'select * from cliente_endereco left join tb_endereco using(id_endereco) WHERE id_cliente = '+id_cliente};

queries.payment = function (params, total){return   "INSERT INTO tb_pagamento (numero_cartao, numero_boleto, horario_pagamento, valor_pedido, status_pagamento) values ('"+params.numero_cartao+"','"+params.numero_boleto+"',now(),"+total+",'Pendente');"+queries.getpayid()};

queries.getpayid=function (){return" SELECT max(id_pagamento) as id_pagamento from tb_pagamento;"}

queries.update_payment_order = function (id_pagamento){return   "UPDATE tb_pagamento SET status_pagamento = 'Recebido' where id_pagamento="+id_pagamento+"; UPDATE tb_pedido SET status_pedido= 'Aprovado' where id_pagamento="+id_pagamento;};

queries.order = function (params){return   "INSERT INTO tb_pedido (data_pedido, status_pedido, id_cliente, entr_parcial, id_endereco, id_cortesia, id_pagamento) VALUES (now(), 'Em Processamento',"+params+");"+queries.get_order_id(params[0])+';'};

queries.get_order_id = function (id_cliente){return   'select id_pedido from tb_pedido where id_cliente = '+id_cliente+' order by data_pedido desc'};

queries.update_order=function(id_pagamento){return "UPDATE tb_pedido SET status_pedido = 'Aprovado' where id_pagamento ="+id_pagamento;}

queries.insert_order_items= function (id_pedido, params, id_cliente){
	var query='INSERT INTO item_pedido (id_pedido, id_prod, tamanho_prod, qte_prod) VALUES '; 
	// for (item in params) console.log(params[item].nome_prod)
	for (item in params){
		query+='('+ id_pedido +', '+params[item].id_prod +', '+params[item].tamanho_prod +', '+params[item].qte_prod+'),';
	};

	return  query.substring(0, query.length - 1)+"; "+queries.delete_cart(id_cliente)+"; ";
};

queries.delete_cart=function(id_cliente){return "DELETE FROM item_carrinho WHERE id_cliente = "+id_cliente;}

//ORDERS

queries.get_orders=function(id_cliente){return "SELECT id_pedido, data_pedido, status_pedido, entr_parcial, valor_pedido from tb_pedido LEFT JOIN tb_pagamento USING(id_pagamento) where id_cliente = "+id_cliente;}

queries.get_order_prods=function(id_cliente){return "SELECT * from tb_pedido LEFT JOIN item_pedido using(id_pedido) LEFT JOIN tb_pagamento USING(id_pagamento) where id_cliente = "+id_cliente;}

exports.queries = queries
