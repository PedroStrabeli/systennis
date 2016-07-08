var queries={}

queries.catalog='SELECT DISTINCT nome_prod, desc_prod, tipo_prod, subtipo_prod, cor_prod, tamanho_prod, marca_prod, preco_prod, url_imagem FROM tb_produto';	

queries.prod_detail= 'SELECT DISTINCT nome_prod, desc_prod, tipo_prod, subtipo_prod, cor_prod, marca_prod, preco_prod, url_imagem FROM tb_produto where id_prod = ';

queries.tamanho_prod= 'SELECT tamanho_prod FROM tamanho_produto WHERE id_prod ='

queries.percent='%';

queries.cart= 'SELECT id_prod, nome_prod, desc_prod,cor_prod, tamanho_prod, preco_prod, url_imagem, qte_produto FROM item_carrinho LEFT JOIN tb_produto using(id_prod) LEFT JOIN tb_cliente using(id_cliente) WHERE id_cliente ='


exports.queries = queries
