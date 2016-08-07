var express = require('express');
var nodemailer= require('nodemailer');
var queries = require('../constants/queries.js')
var mail = require('../constants/emails.js')
var router = express.Router();

router.get('/getAddress/cli:id_cliente',function(req, res){
	req.getConnection(function(err,connection){
  		var id_cliente=req.params.id_cliente;
  		if(err) return res.status(400).json(err);
        connection.query(queries.queries.get_address(id_cliente) ,[] ,function(err,result){
        	return res.status(200).json(result);
        });
  	});
});

router.post('/payment',function(req,res){
  var transporter = nodemailer.createTransport('smtps://systennisltda%40gmail.com:systennis123@smtp.gmail.com');
	var id_pagamento;
  var id_pedido;
  var p=req.body;
  //console.log(p.checkout.total);

  req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);
  	setTimeout(function() {
            console.log("Iniciando processo de pedido")
  	  			connection.query(queries.queries.update_payment_order(id_pagamento),[] ,function(err,result){	
              console.log('erro: '+JSON.stringify(err))
              console.log("atualizando pgto " +id_pagamento)
              //res.json(id_pagamento);
              //EMAIL PAGAMENTO APROVADO
              // console.log(mail.mail.paymentReceived({user:{email_cliente:p.checkout.user.email_cliente, nome:p.checkout.user.nome_cliente}, pedido:{id_pedido:id_pedido}}))
              transporter.sendMail(mail.mail.paymentReceived({user:{email_cliente:p.checkout.user.email_cliente, nome_cliente:p.checkout.user.nome_cliente}, pedido:{id_pedido:id_pedido}}), function(error, info){
                    if(error){
                        return console.log(error);
                    }
                    console.log('Message sent: ' + info.response);
                    //transporter.close();
                });
    			})
  	},12000);
  		  ////CRIANDO O PAGAMENTO
            //console.log(queries.queries.payment(p.pag));
      	   connection.query(queries.queries.payment(p.pag, p.checkout.total) ,[] ,function(err,result){
             		//console.log(result[0].id_pagamento)
                id_pagamento=result[1][0].id_pagamento;
                console.log("pagamento registrado. id = "+id_pagamento)

                //// CRIANDO O PEDIDO
                var orderParam=[p.checkout.user.id_cliente, p.checkout.parcial, p.checkout.address.id_endereco, 'null', id_pagamento]
                  connection.query(queries.queries.order(orderParam) ,[] ,function(err,result){
                      console.log('erro: '+JSON.stringify(err))
                      id_pedido=result[1][0].id_pedido;
                      console.log("criando pedido de id= "+id_pedido)
                      //EMAIL PEDIDO FEITO
                      transporter.sendMail(mail.mail.orderMade({user:{email_cliente:p.checkout.user.email_cliente, nome_cliente:p.checkout.user.nome_cliente}, pedido:{id_pedido:id_pedido}}), function(error, info){
                          if(error){
                              return console.log(error);
                          }
                          console.log('Message sent: ' + info.response);
                          //transporter.close();
                      });

                        ////COLOCANDO ITENS NO PEDIDO e tira do carrinho
                          connection.query(queries.queries.insert_order_items(id_pagamento, p.checkout.cart, p.checkout.user.id_cliente) ,[] ,function(err,result){
                              console.log('erro: '+JSON.stringify(err))
                              console.log("Itens inseridos com sucesso.")

                          })
                            //console.log(result[0].id_pagamento)

                            // id_pedido=result[0].id_pedido;
                            //console.log("pedido registrado. id = "+result[0].id_pedido)
                            console.log(result[1][0]);

                            // res.json(result[0].id_pedido);
              })
         })
       	});
  })

router.post('/order',function(req,res){
  req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);
          console.log(queries.queries.order(req.body.params))//create
       })
})
// router.get('/getAddress',function(req, res){
// 	req.getConnection(function(err,connection){
//   		var id_cliente=req.params.id_cliente;
//   		if(err) return res.status(400).json(err);

//         connection.query(queries.queries.get_address(id_cliente) ,[] ,function(err,result){

//         	return res.status(200).json(result);
//         });
//   	})
// });

module.exports = router;
