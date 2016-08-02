USE systennis_db;

/*INSERT INTO tb_produto (nome_prod, desc_prod, tipo_prod, subtipo_prod, cor_prod, marca_prod, preco_prod, estoque_prod, url_imagem)
 values ('BOTA TIMBERLAND TBL WHITE LEDGE MID WP M','Vá além com a Bota Timberland TBL White Ledge Mid Wp M. Perfeita para a prática de esportes de aventura, mantém os pés secos e confortáveis, além de garantir tração, estabilidade e suporte.','Calçado','Bota','Preto', 'Timberland', '649.90', 100, 'timb01.jpg')
 ,('TÊNIS ADIDAS BREEZE 102','Escolha perfeita para os pés femininos, o Tênis Adidas Breeze 102 combina um formato aerodinâmico com um solado flexível, conferindo uma sensação mais natural e confortável para sua corrida.','Calçado','Tenis','Branco','Adidas', '129.90', 100, 'adidas_breeze_wht.jpg')
 ,('TÊNIS ADIDAS BREEZE 102','Escolha perfeita para os pés femininos, o Tênis Adidas Breeze 102 combina um formato aerodinâmico com um solado flexível, conferindo uma sensação mais natural e confortável para sua corrida.','Calçado','Tenis','Preto','Adidas', '129.90', 100, 'adidas_breeze_blk.jpg');
*/
INSERT INTO tamanho_produto (id_prod, tamanho_prod)
VALUES (1, 39)
,(1, 40)
,(1, 41)
,(1, 42)
,(2, 36)
,(2, 37)
,(2, 38)
,(2, 39)
,(3, 36)
,(3, 37)
,(3, 38)
,(3, 39)
,(4, 40)
,(4, 41)
,(4, 42)
,(5, 36)
,(5, 37)
,(5, 38)
,(5, 39)
,(6, 36)
,(6, 37)
,(6, 38)
,(6, 39);
 
 
 INSERT INTO tb_cliente (nome_cliente, sobrenome_cliente, email_cliente, hash_senha, cpf_cliente, rg_cliente, member_since, data_nasc,sexo_cliente)
 VALUES ('Pedro','Strabeli','pedrostrabeli@gmail.com','1234567890987654321234567890','11111129288','8172839182', date(now()), '19930329', 'M');
 
 INSERT INTO tb_endereco(pais_end, estado_end, cidade_end, bairro_end, cep_end, rua_end, numero_end, complemento_end)
 VALUES ('Brasil','SP' ,'São Paulo', 'Belém','03062-003','Rua Alzira Sacchi',7,'Herval, 925');
 
 INSERT INTO cliente_endereco
 VALUES (1,1);
 
  INSERT INTO item_carrinho(id_cliente,id_prod,tamanho_prod,qte_prod)
 VALUES (1,1,40,1),(1,3,36,1);
 
 
 
