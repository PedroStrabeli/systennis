#NOTAS: o banco não é muito normalizado (alias, nada normalizado). 
#temos que cuidar para os dados ficarem coerentes
#tabela de produtos ficará muito duplicada por causa de tamanhos e cores.
#podemos fazer tabelas de tamanhos e cores para reduzir isso. o que é melhor?
#


#--queries do sistema

#catalog: mostra todos os produtos. 
#produtos com cores diferentes aparecem tambem, senao nao aparece imagem.
#mudar isso fazendo duas queries. SELECT url_imagem FROM tb_produto WHERE id_prod = id 
#isso para cada item (foreach da primeira query.), e pode ser um problema.
SELECT DISTINCT nome_prod,desc_prod,tipo_prod
,subtipo_prod,marca_prod,preco_prod,url_imagem 
FROM tb_produto;

#prod_detail: pega lista de produtos com mesmo nome.
# para ter cores, tamanhos e imagens em lista na memoria.
# usar imagens no carrossel, numero e cores na lista e colocar o nome. 
#mandar o id certo para a  compra
SELECT id_prod,nome_prod,desc_prod,tipo_prod
,subtipo_prod,cor_prod,
marca_prod,preco_prod,url_imagem 
FROM tb_produto 
WHERE id_prod = 1;  #inserir id_prod selecionado;

select * from tb_produto;
#cart: pega os produtos do carrinho para o cliente.
SELECT id_prod, nome_prod, desc_prod,cor_prod, tamanho_prod, preco_prod, url_imagem, qte_produto FROM item_carrinho
LEFT JOIN tb_produto using(id_prod)
LEFT JOIN tb_cliente using(id_cliente)
WHERE id_cliente = 1 #id do objeto de autenticação
