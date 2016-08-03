var mail={}

	mail.orderMade= function(params){
		return {
		    from: '"Systennis LTDA" <systennisltda@gmail.com>', // sender address
		    to: params.user.email_cliente, // list of receivers
		    subject: 'Seu pedido foi concluído com sucesso', // Subject line
		    text: params.user.nome_cliente+', Seu pedido foi registrado'+
		    		'Aguardaremos agora seu pagamento ser liberado para darmos continuidade ao seu pedido', // plaintext body
		    html: '<b>'+params.user.nome_cliente+', Seu pedido foi registrado</b><br>'+ // html body
		    		'Aguardaremos agora seu pagamento ser liberado para darmos continuidade ao seu pedido'
		};
	}

	mail.paymentReceived= function(params){
		return {
		    from: '"Systennis LTDA" <systennisltda@gmail.com>', // sender address
		    to: params.user.email_cliente, // list of receivers
		    subject: 'Seu pagamento foi recebido', // Subject line
		    text: params.user.nome_cliente+', Seu pagamento referente ao pedido de número #'+params.pedido.id_pedido+' foi recebido.'+ // html body
		    		'Seus produtos serão enviados em breve e avisaremos por email quando os produtos saírem para serem entregues.', // plaintext body
		    html: '<b>'+params.user.nome_cliente+', Seu pagamento referente ao pedido de número #'+params.pedido.id_pedido+' foi recebido.</b><br>'+ // html body
		    		'Seus produtos serão enviados em breve e avisaremos por email quando os produtos saírem para serem entregues.'
		};
	}


exports.mail = mail