
angular.module('systennis')
	.controller('checkout_address_ctrl',function($scope, $state, $http, checkoutService){
		//var user={id_cliente: 1};
		//$scope.address;
		if(!checkoutService.checkout.user) $state.go('login')
		$http.get('/checkout/getAddress/cli'+checkoutService.checkout.user.id_cliente)
						.then(function(response){
							$scope.addresses=response.data
							// $route.reload();
						}).catch(function(err){
							alert("Ocorreu um erro! \n"+JSON.stringify(err.data));
						});
		
		//$scope.address=checkoutService.checkout.address;
		$scope.chooseAddr=function(addr){
			checkoutService.chooseAddress(addr);
			//alert('Escolhido endereço '+ addr.rua_end +', '+addr.numero_end);
		}
		

		$scope.validateAddr=function(){
			if(checkoutService.checkout.address==null){//$scope.address==null){
				alert("Escolha um endereço.");
			} else{
				//checkoutService.checkout.address=$scope.address;
				$state.go('checkout2');}
		}		
		
})
///////////////////////////////////////////////////////////////
	.controller('checkout_delivery_ctrl',function($scope, $state, $http, checkoutService){
		//var user={id_cliente: 1};
		$scope.entrega;
		
		$scope.validateEntr=function(){
			if($scope.entrega==null){
				alert("Escolha uma forma de entrega.");
			} else{
				checkoutService.checkout.parcial=$scope.entrega;
				if (checkoutService.checkout.parcial=true) checkoutService.checkout.entrega= 'Parcial';
				else checkoutService.checkout.entrega='Normal';
				$state.go('checkout4');}

		}	
})
		.controller('checkout_payment_ctrl',function($scope, $state, $http, checkoutService, mailService){
		//var user={id_cliente: 1};
		$scope.pag={numero_cartao:'',nome_portador:'',mes_val:"", ano_val:'',cvv:''};

		//$scope.pagamento.tipo;
		//checkoutService.checkout.pagamento={};
		$scope.loadPartial = function(link) {
		    $scope.currentPartial = 'pages/template/common/pagamento/' + link + '.html';
		    if( link ==="cartao"){
		    	checkoutService.checkout.pagamento="Cartão de Crédito";
		    	$scope.pag.numero_boleto='null';
		    }
		    else {
		    	checkoutService.checkout.pagamento="Boleto Bancario";
		    	$scope.pag.numero_cartao='null';
		    }
		}


		$scope.validatePayment= function(){
			console.log(checkoutService.checkout)
			console.log($scope.pag)
			if ($scope.pag.numero_cartao === 'null'){

			}
			else{
				if ($scope.pag.numero_cartao.length !== 16)
					alert("Verifique se o número do cartão está correto")
				else if ($scope.pag.cvv.length !== 3)
					alert("Verifique se o código de verificação está correto")
				else if ($scope.pag.mes_val =='')
					alert("Verifique a data de validade do cartão")
				else if ($scope.pag.ano_val == '')
					alert("Verifique a data de validade do cartão")
				else if ($scope.pag.nome_portador == '')
					alert("Insira o nome do portador do cartão")
				else{
						geraPedido();
						$state.go('orders');
						//geraPedido();
						//MANDAR EMAIL


						var mail={user:checkoutService.checkout.user}
				}
			}
		};
		
		var geraPedido=function(){
			$http({method: 'POST', 
					data: {pag:$scope.pag, 
							checkout:checkoutService.checkout
									},//checkoutService.checkout.cart.total]},
					url: '/checkout/payment'}).then(function(response){
						// $state.go('pedidos');
					}).catch(function(err){
						console.log(JSON.stringify(err));
					});
		}

		// var enviaEmail1=function(params){
		// 		$http({method: 'POST', 
		// 					data: {mailOptions: mailService.orderMade(mail)},
		// 					url: '/checkout/payment'}
		// 				)
		// 					.then(function(response){
		// 					}).catch(function(err){
		// 					});
		// 		$state.go('orders');
		// }
		//console.log($scope.pagamento)
})




	.controller('checkout_review_ctrl',function($scope, $state, $http, checkoutService){
		//var user={id_cliente: 1};
		$scope.order=checkoutService.checkout.cart;	
})

	.controller('checkout_summary_ctrl',function($scope, $state, $http, checkoutService){
		//var user={id_cliente: 1};
		$scope.checkout=checkoutService.checkout;
		$scope.total=checkoutService.checkout.cart.total;
})
