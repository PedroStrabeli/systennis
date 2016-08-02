	var queries={}


//CATALOG
//queries.catalog= function (){return 'SELECT DISTINCT id_prod, nome_prod, desc_prod,marca_prod, preco_prod, url_imagem FROM tb_produto';}
queries.catalog= function (){return 'SELECT DISTINCT * FROM tb_produto';}


//PROD_DETAIL
queries.prod_detail= function (id_prod){return  'SELECT DISTINCT id_prod, nome_prod, desc_prod, tipo_prod, subtipo_prod, cor_prod, marca_prod, preco_prod, url_imagem FROM tb_produto where id_prod = '+ id_prod;}

queries.tamanho_prod= function (id_prod){return  'SELECT tamanho_prod FROM tamanho_produto WHERE id_prod = '+ id_prod;}

queries.prod_colors_available = 'SELECT DISTINCT cor_prod, id_prod FROM tb_produto WHERE nome_prod IN (SELECT nome_prod FROM tb_produto WHERE id_prod =';

queries.prod_sizes_available = 'SELECT DISTINCT tamanho_prod FROM tamanho_produto WHERE id_prod ='

queries.search = "SELECT DISTINCT id_prod, nome_prod, desc_prod, tipo_prod, subtipo_prod, cor_prod, marca_prod, preco_prod, url_imagem FROM tb_produto WHERE nome_prod LIKE '%";

queries.show_one = 'LIMIT 1'

queries.register = "INSERT INTO tb_cliente (nome_cliente, sobrenome_cliente, email_cliente, hash_senha, cpf_cliente, rg_cliente, member_since, tel_fixo, tel_cel, data_nasc, sexo_cliente) VALUES"


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

//REGISTRATION
queries.is_registration_available = function (cpf_or_email) {return "SELECT IF(COUNT(*) > 0, 'true', 'false') AS has_registration FROM tb_cliente WHERE email_cliente = '" + cpf_or_email + "' OR cpf_cliente = '" + cpf_or_email + "'"};

queries.fetch_user_id = function (cpf) {return "SELECT id_cliente FROM tb_cliente WHERE cpf_cliente = '" + cpf + "' LIMIT 1"};

queries.fetch_address_id = function (country, state, city, bairro, zipcode, street, number, compliment)
{
	return "SELECT id_endereco FROM tb_endereco WHERE (pais_end = '" + country + "' AND estado_end = '" + state + "' AND cidade_end = '" + city + "' AND bairro_end = '" + bairro + "' AND cep_end = '" + zipcode + "' AND rua_end = '" + street + "' AND numero_end = '" + number + "' AND complemento_end = '" + compliment + "')";
};

queries.insert_user_address = function (user_id, address_id) {return "INSERT INTO cliente_endereco (id_endereco, id_cliente) VALUES ('" + address_id + "', '" + user_id + "')"};

queries.insert_new_address = function (country, state, city, bairro, zipcode, street, number, compliment)
{
	return "INSERT INTO tb_endereco (pais_end, estado_end, cidade_end, bairro_end, cep_end, rua_end, numero_end, complemento_end) VALUES ('" + country + "', '" + state + "', '" + city + "', '" + bairro + "', '" + zipcode + "', '" + street + "', '" + number + "', '" + compliment + "')";
};

queries.fetch_user_by_email = function(user_email) {return "SELECT id_cliente, nome_cliente, sobrenome_cliente, email_cliente, hash_senha, cpf_cliente, member_since, tel_fixo, tel_cel FROM tb_cliente WHERE email_cliente = '" + user_email + "' LIMIT 1"};

queries.fetch_user_by_id = function(id_ciente) {return "SELECT id_cliente, nome_cliente, sobrenome_cliente, email_cliente, hash_senha, cpf_cliente, member_since, tel_fixo, tel_cel FROM tb_cliente WHERE id_cliente = '" + id_cliente + "' LIMIT 1"};

queries.fetch_supervisors = function(depto = '', cargo = '')
{
	var supervisor_query = "SELECT DISTINCT nome_func, sobrenome_func, id_func FROM tb_funcionario ";
	var departamento_query = '';
	var cargo_query = '';
	var include_master = " UNION SELECT DISTINCT nome_func, sobrenome_func, id_func FROM tb_funcionario WHERE id_func = 1"

	if (!!cargo)
	{
		if (cargo == "Funcionário")
		{
			cargo = "('Gerente', 'Supervisor')"
		}
		else if(cargo == "Gerente")
		{
			cargo = "('Supervisor')"
		}
		else if(cargo == "Supervisor")
		{
			cargo = "('Dummy')"
		}
	};

	if (!!depto && !!cargo)
	{
		departamento_query = "WHERE departamento_func = '" + depto + "' "
		cargo_query = "AND cargo_func IN " + cargo + ""
	}
	else if(!!depto)
	{
		departamento_query = "WHERE departamento_func = '" + depto + "'"
	}
	else if(!!cargo)
	{
		cargo_query = "WHERE cargo_func IN " + cargo + ""
	}

	var full_query = supervisor_query + departamento_query + cargo_query + include_master;
	console.log(full_query);

	return (full_query);
}

queries.is_registration_available_func = function (cpf_or_email) {return "SELECT IF(COUNT(*) > 0, 'true', 'false') AS has_registration FROM tb_funcionario WHERE email_func = '" + cpf_or_email + "' OR cpf_func = '" + cpf_or_email + "'"};

queries.insert_new_func = function(nome_func, sobrenome_func, cpf_func, cargo_func, departamento_func, hash_senha, id_supervisor, tel_func, email_func)
{
	return ("INSERT INTO tb_funcionario (nome_func, sobrenome_func, cpf_func, cargo_func, departamento_func, hash_senha, id_supervisor, tel_func, email_func) VALUES ('" +
		nome_func + "', '" + sobrenome_func + "', '" + cpf_func + "', '" + cargo_func + "', '" + departamento_func + "', '" + hash_senha + "', '" + id_supervisor + "', '" + tel_func + "', '" + email_func + "')");
}

queries.fetch_func_by_email = function(func_email) {return "SELECT id_func, nome_func, sobrenome_func, email_func, hash_senha, cpf_func, tel_func FROM tb_funcionario WHERE email_func = '" + func_email + "' LIMIT 1"};

queries.fetch_func_by_id = function(id_func) {return "SELECT id_func, nome_func, sobrenome_func, email_func, hash_senha, cpf_func, tel_func FROM tb_funcionario WHERE id_func = '" + id_func + "' LIMIT 1"};


queries.get_cart= 'SELECT id_prod, nome_prod, desc_prod,cor_prod, preco_prod, url_imagem, qte_produto FROM item_carrinho LEFT JOIN tb_produto using(id_prod) LEFT JOIN tb_cliente using(id_cliente) WHERE id_cliente =';

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

exports.queries = queries;

queries.delete_cart=function(id_cliente){return "DELETE FROM item_carrinho WHERE id_cliente = "+id_cliente;}

//ORDERS

queries.get_orders=function(id_cliente){return "SELECT id_pedido, data_pedido, status_pedido, entr_parcial, valor_pedido from tb_pedido LEFT JOIN tb_pagamento USING(id_pagamento) where id_cliente = "+id_cliente;}

queries.get_order_prods=function(id_cliente){return "SELECT * from tb_pedido LEFT JOIN (SELECT * from item_pedido left join tb_produto using(id_prod)) as sub using(id_pedido) LEFT JOIN tb_pagamento USING(id_pagamento) where id_cliente = "+id_cliente;}
