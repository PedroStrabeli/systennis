var queries={}

queries.catalog='SELECT DISTINCT nome_prod, desc_prod, tipo_prod, subtipo_prod, cor_prod, tamanho_prod, marca_prod, preco_prod, url_imagem FROM tb_produto';
queries.prod_detail= 'SELECT DISTINCT nome_prod, desc_prod, tipo_prod, subtipo_prod, cor_prod, tamanho_prod, marca_prod, preco_prod, url_imagem FROM tb_produto where nome_prod = ';

exports.queries = queries
