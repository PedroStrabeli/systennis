angular.module('systennis')
	.controller('test',function($scope, $state, $http, checkoutService, mailService){
		$scope.fuck='FuckYou';
		var param={
							user:{id_cliente:1 ,email_cliente:'pedrostrabeli@gmail.com', nome:'Pedro Strabeli'}
							,pedido:7
						}
		console.log(mailService.paymentReceived(param))
	$scope.geraPagamento=function(){


			//console.log(date);
			$http({method: 'POST', 
					data: {params: {cartao:'123456789023456',
									boleto:'-1',
									valor:299.80},
							checkout:{user:{id_cliente:1, nome_cliente:"Pedro Strabeli", email_cliente:"pedrostrabeli@gmail.com"},
								cart:{}
								}
							},//checkoutService.checkout.cart.total]},//faz pagamento e muda status
									url: '/checkout/payment'})
				.then(function(response){
						$http({method: 'POST', 
								data: {params: [param.user.id_cliente, true, 1, 'null', response.data]},//checkoutService.checkout.cart.total]},
								url: '/checkout/order'})
							.then(function(response2){//faz pedido e traz o id do pedido.
											var mailOptions={
												user:{email_cliente:'pedrostrabeli@gmail.com', nome:'Pedro Strabeli'}
												,pedido:response2.data}
											console.log(mailOptions);
										})
								})
							
								
						
						//enviaEmail1(mailService.paymentReceived(params))
						
					.catch(function(err){
						alert(JSON.stringify(err));
					})
		}

		$scope.geraPedido=function(){
			$http({method: 'POST', 
					data: {params: [$scope.pag.numero_cartao,
									$scope.pag.numero_boleto,
									Date(),
									299.80]},//checkoutService.checkout.cart.total]},
					url: '/checkout/payment'}).then(function(response){
						param={
							user:{email_cliente:'pedrostrabeli@gmail.com', nome:'Pedro Strabeli'}
							,pedido:response.data
						}
						console.log(params)
						enviaEmail1(mailService.paymentReceived(params))
					}).catch(function(err){
					
					});
		}

		var enviaEmail1=function(params){
			console.log(mailService.orderMade(params))
				$http({method: 'POST', 
							data: {mailOptions: mailService.orderMade(params)},
							url: '/checkout/payment'}
						)
							.then(function(response){
								
								
							}).catch(function(err){
							
							});
				//$state.go('orders');
		}
	})