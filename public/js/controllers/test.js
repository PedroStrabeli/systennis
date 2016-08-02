angular.module('systennis')
	.controller('test',function($scope, $state, $http, checkoutService, mailService){
		$scope.fuck='FuckYou';

	$scope.geraPagamento=function(){


			//console.log(date);
			$http({method: 'POST', 
					data: {params: {cartao:'123456789023456',
									boleto:'-1',
									valor:299.80}},//checkoutService.checkout.cart.total]},
					url: '/checkout/payment'}).then(function(response){
						params={
							user:{email_cliente:'pedrostrabeli@gmail.com', nome:'Pedro Strabeli'}
							,pedido:response.data}
						
						console.log(params);
						enviaEmail1(mailService.paymentReceived(params))
						
					}).catch(function(err){
					
					})
		}

		$scope.geraPedido=function(){
			$http({method: 'POST', 
					data: {params: [$scope.pag.numero_cartao,
									$scope.pag.numero_boleto,
									Date(),
									299.80]},//checkoutService.checkout.cart.total]},
					url: '/checkout/payment'}).then(function(response){
						params={
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