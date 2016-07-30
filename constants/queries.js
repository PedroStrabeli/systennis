var queries={}


//CATALOG
queries.catalog='SELECT DISTINCT id_prod, nome_prod, desc_prod, tipo_prod, subtipo_prod, cor_prod, marca_prod, preco_prod, url_imagem FROM tb_produto';	


//PROD_DETAIL
queries.prod_detail= 'SELECT DISTINCT nome_prod, desc_prod, tipo_prod, subtipo_prod, cor_prod, marca_prod, preco_prod, url_imagem FROM tb_produto where id_prod = ';

queries.tamanho_prod= 'SELECT tamanho_prod FROM tamanho_produto WHERE id_prod ='



//CART
queries.add_cart= function (param){return 'INSERT INTO item_carrinho (id_cliente, id_prod, tamanho_prod, qte_produto) VALUES ('+param+')'};

queries.check_cart=  function (id_cliente, id_prod){return 'SELECT count(*) as count FROM item_carrinho WHERE id_cliente = '+id_cliente+' AND id_prod = '+id_prod};

queries.get_cart= 'SELECT id_prod, nome_prod, desc_prod,cor_prod, preco_prod, url_imagem, qte_produto FROM item_carrinho LEFT JOIN tb_produto using(id_prod) LEFT JOIN tb_cliente using(id_cliente) WHERE id_cliente =';




exports.queries = queries
