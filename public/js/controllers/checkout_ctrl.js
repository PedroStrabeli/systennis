
angular.module('systennis')
	.controller('checkout_address_ctrl',function($scope, $state, $http, checkoutService){
		var user={id_user: 1};
		$scope.address;

		$http.get('/checkout/getAddress/cli'+user.id_user)
						.then(function(response){
							$scope.addresses=response.data
							// $route.reload();
						}).catch(function(err){
							alert("Ocorreu um erro! \n"+JSON.stringify(err.data));
						});
						console.log('pronto')
		$scope.address=checkoutService.checkout.address;
		$scope.chooseAddr=function(addr){
			checkoutService.chooseAddress(addr);
			alert('Escolhido endereço '+ addr.rua_end +', '+addr.numero_end);
		}
		

		$scope.validateAddr=function(){
			console.log($scope.address);
			if($scope.address==null){
				alert("Escolha um endereço.");
			} else{
				checkoutService.checkout.address=$scope.address;
				$state.go('checkout2');}
		}		
		
})

	.controller('checkout_delivery_ctrl',function($scope, $state, $http, checkoutService){
		var user={id_user: 1};
		$scope.entrega;
		console.log($scope.entrega)
		
		$scope.validateEntr=function(){
			console.log($scope.entrega);
			if($scope.entrega==null){
				alert("Escolha uma forma de entrega.");
			} else{
				checkoutService.checkout.parcial=$scope.entrega;
				$state.go('checkout3');}

		}	
})

	.controller('checkout_payment_ctrl',function($scope, $state, $http, checkoutService){
		var user={id_user: 1};

})


	.controller('checkout_review_ctrl',function($scope, $state, $http, checkoutService){
		var user={id_user: 1};

})

