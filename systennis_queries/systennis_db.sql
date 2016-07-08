---------------------------------------------------------------
---------------------------------------------------------------
--O intuito deste script eh gerar todas as tabelas e 
--constraints do banco de dados do Systennis
---------------------------------------------------------------
---------------------------------------------------------------


--Ainda falta testar.


CREATE DATABASE systennis_db;

USE systennis_db;

---------------------------------------------------------------
---------------------------------------------------------------

--Enderecos e cliente, ate produto.

--#1 - 
DROP TABLE IF EXISTS tb_endereco;
CREATE TABLE tb_endereco (
	id_endereco int primary key NOT NULL UNIQUE AUTO_INCREMENT
	,pais_end varchar(32) NOT NULL
	,estado_end char(2) NOT NULL
	,cidade_end varchar(32) NOT NULL
	,bairro_end varchar(32) NOT NULL
	,cep_end varchar(32) NOT NULL
	,rua_end varchar(128) NOT NULL
	,numero_end int NOT NULL
	,complemento_end varchar(64) NOT NULL

);

--#2 - 
DROP TABLE IF EXISTS tb_cliente;
CREATE TABLE tb_cliente (
	id_cliente int primary key NOT NULL UNIQUE AUTO_INCREMENT
	,nome_cliente varchar (32) NOT NULL
	,sobrenome_cliente varchar (64) NOT NULL
	,email_cliente varchar (64) NOT NULL
	,hash_senha varchar (512) NOT NULL
	,cpf_cliente varchar (16) NOT NULL
	,rg_cliente varchar (16) NOT NULL
	,member_since date
	,tel_fixo varchar(16) 
	,tel_cel varchar(16) 
	,data_nasc date  NOT NULL
	,sexo_cliente char(1)  NOT NULL

);

--#3 - 
DROP TABLE IF EXISTS cliente_endereco;
CREATE TABLE cliente_endereco (
	id_endereco int NOT NULL
	,id_cliente int NOT NULL
);

--#4 - 
DROP TABLE IF EXISTS tb_produto;
CREATE TABLE tb_produto (
	id_prod  int primary key NOT NULL UNIQUE AUTO_INCREMENT
	,nome_prod varchar(64) NOT NULL
	,desc_prod varchar(256)
	,tipo_prod varchar(16)
	,subtipo_prod varchar(16)
	,cor_prod varchar(32) NOT NULL
	,tamanho_prod int NOT NULL
	,marca_prod varchar(16) NOT NULL
	,preco_prod decimal(10,2) NOT NULL
	,estoque_prod int NOT NULL
	,url_imagem varchar(64)

);

--#5 - 
DROP TABLE IF EXISTS item_carrinho;
CREATE TABLE item_carrinho (
	id_cliente int NOT NULL
	,id_prod int NOT NULL
	,qte_produto int NOT NULL
);

---------------------------------------------------------------
---------------------------------------------------------------

-- Funcionarios e adm

--#6 - 
DROP TABLE IF EXISTS tb_administrador;
CREATE TABLE tb_administrador (
	id_admin int primary key NOT NULL UNIQUE AUTO_INCREMENT
	,nome_admin varchar (32) NOT NULL
	,sobrenome_admin varchar (64) NOT NULL
	,hash_senha varchar (512) NOT NULL
	,cpf_admin varchar (16) NOT NULL
	,email_admin varchar (64) NOT NULL
	,tel_admin varchar(16)

);

--#7 - 
DROP TABLE IF EXISTS tb_funcionario;
CREATE TABLE tb_funcionario (
	id_func int primary key NOT NULL UNIQUE AUTO_INCREMENT
	,nome_func varchar (32) NOT NULL
	,sobrenome_func varchar (64) NOT NULL
	,cpf_func varchar (16) NOT NULL
	,cargo_func varchar(32) NOT NULL
	,departamento_func varchar(32) NOT NULL
	,hash_senha varchar (512) NOT NULL
	,id_supervisor int NOT NULL
	,tel_func varchar(16)
	,email_func varchar (64) NOT NULL
);

--#8 - 
DROP TABLE IF EXISTS tb_alerta;
CREATE TABLE tb_alerta (
	id_alerta int primary key NOT NULL UNIQUE AUTO_INCREMENT
	,titulo_alerta varchar(64) NOT NULL
	,prioridade_alerta varchar(16) NOT NULL --ou int para prioridade numerica?
	,texto_alerta varchar(512) NOT NULL
	,id_emissor int NOT NULL

);

--#9 - 
DROP TABLE IF EXISTS alerta_destino;
CREATE TABLE alerta_destino (
	id_alerta int NOT NULL
	,id_func int NOT NULL
);

---------------------------------------------------------------
---------------------------------------------------------------

--Pedido e entrega

--#10 - 
DROP TABLE IF EXISTS tb_pagamento;
CREATE TABLE tb_pagamento (
	id_pagamento int primary key NOT NULL UNIQUE AUTO_INCREMENT
	,numero_cartao char(19) NOT NULL
	,numero_boleto char (44) NOT NULL
	,horario_pagamento datetime NOT NULL
	,valor_pedido decimal(10,2) NOT NULL
);

--#11 - 
DROP TABLE IF EXISTS tb_cortesia;
CREATE TABLE tb_cortesia (
	id_cortesia int primary key NOT NULL UNIQUE AUTO_INCREMENT
	,nome_cortesia varchar(128) NOT NULL
	,desc_cortesia varchar(256)
	,tipo_cortesia varchar(32) NOT NULL
	,valor_cortesia decimal(10,2) NOT NULL
);

--#12 - 
DROP TABLE IF EXISTS tb_pedido;
CREATE TABLE tb_pedido (
	id_pedido int primary key NOT NULL UNIQUE AUTO_INCREMENT
	,id_cliente int NOT NULL
	,data_pedido datetime NOT NULL
	,status_pedido varchar(32) NOT NULL
	,entr_parcial bool NOT NULL
	,id_endereco int NOT NULL
	,id_cortesia int NOT NULL
	,id_func int NOT NULL
	,id_pagamento int NOT NULL
);

--#13 - 
DROP TABLE IF EXISTS tb_nota_fiscal;
CREATE TABLE tb_nota_fiscal (
	id_nf int primary key NOT NULL UNIQUE --id será o 
	,horario_emissao datetime NOT NULL
	,horario_envio datetime NOT NULL
);

--#14 - 
DROP TABLE IF EXISTS tb_entrega;
CREATE TABLE tb_entrega (
	id_entrega int primary key NOT NULL UNIQUE AUTO_INCREMENT
	,id_pedido  int NOT NULL
	,horario_entrega datetime NOT NULL
	,status_entrega varchar(32) NOT NULL
	,id_nf int NOT NULL

);

--#15 - 
DROP TABLE IF EXISTS item_pedido;
CREATE TABLE item_pedido (
	id_pedido int primary key NOT NULL UNIQUE AUTO_INCREMENT
	,id_prod int NOT NULL
	,id_entrega int NOT NULL
	,qte_prod int NOT NULL
);

---------------------------------------------------------------
---------------------------------------------------------------

--Adding Foreign Keys


ALTER TABLE cliente_endereco
ADD FOREIGN KEY (id_cliente) REFERENCES tb_cliente(id_cliente)
,ADD FOREIGN KEY (id_endereco) REFERENCES tb_endereco(id_endereco);


ALTER TABLE item_carrinho
ADD FOREIGN KEY (id_prod) REFERENCES tb_produto(id_prod)
,ADD FOREIGN KEY (id_cliente) REFERENCES tb_cliente(id_cliente);


ALTER TABLE tb_funcionario
ADD FOREIGN KEY (id_supervisor) REFERENCES tb_funcionario(id_supervisor);


ALTER TABLE tb_alerta
ADD FOREIGN KEY (id_emissor) REFERENCES tb_administrador(id_admin);


ALTER TABLE alerta_destino
ADD FOREIGN KEY (id_alerta) REFERENCES tb_alerta(id_alerta)
,ADD FOREIGN KEY (id_func) REFERENCES tb_funcionario(id_func);


ALTER TABLE tb_pedido
ADD FOREIGN KEY (id_cliente) REFERENCES tb_cliente(id_cliente)
,ADD FOREIGN KEY (id_endereco) REFERENCES tb_endereco(id_endereco)
,ADD FOREIGN KEY (id_cortesia) REFERENCES tb_cortesia(id_cortesia)
,ADD FOREIGN KEY (id_func) REFERENCES tb_funcionario(id_func)
,ADD FOREIGN KEY (id_pagamento) REFERENCES tb_pagamento(id_pagamento);


ALTER TABLE tb_entrega
ADD FOREIGN KEY (id_pedido) REFERENCES tb_pedido(id_pedido)
,ADD FOREIGN KEY (id_nf) REFERENCES tb_nota_fiscal(id_nf);


ALTER TABLE item_pedido
ADD FOREIGN KEY (id_prod) REFERENCES tb_produto(id_prod)
,ADD FOREIGN KEY (id_cliente) REFERENCES tb_cliente(id_cliente)
,ADD FOREIGN KEY (id_entrega) REFERENCES tb_entrega(id_entrega);



