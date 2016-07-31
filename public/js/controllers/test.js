angular.module('systennis')
	.controller('test',function($scope, $state, $http, checkoutService){
		$scope.fuck='FuckYou';

	$scope.geraPagamento=function(){


			date= new Date()
			date= date.getFullYear()+'/'+date.getMonth()+'/'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
			console.log(date);
			$http({method: 'POST', 
					data: {params: {cartao:'123456789023456',
									boleto:'-1',
									data:date,
									valor:299.80}},//checkoutService.checkout.cart.total]},
					url: '/checkout/payment'}).then(function(response){
						
						
					}).catch(function(err){
					
					});
		}
		$scope.geraPedido=function(){
			$http({method: 'POST', 
					data: {params: [$scope.pag.numero_cartao,
									$scope.pag.numero_boleto,
									Date(),
									299.80]},//checkoutService.checkout.cart.total]},
					url: '/checkout/payment'}).then(function(response){
						
						
					}).catch(function(err){
					
					});
		}

		$scope.enviaEmail1=function(params){
				$http({method: 'POST', 
							data: {mailOptions: mailService.orderMade(mail)},
							url: '/checkout/payment'}
						)
							.then(function(response){
								
								
							}).catch(function(err){
							
							});
				$state.go('orders');
		}
	})