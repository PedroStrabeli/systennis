angular.module('systennis')
	.controller('orders_ctrl',function($scope, $state, $http, checkoutService, orderService){
		//console.log(checkoutService.checkout)
		$http.get('/orders/cli'+1).then(function(response){
			$scope.sendOrder=orderService.sendOrder;
			$scope.pedidos=response.data;
			// for (item in $scope.pedidos){
			// 	if ($scope.pedidos[item].entr_pedido) $scope.pedidos[item].entrega = 'Parcial'
			// 	else if (!$scope.pedidos[item].entr_pedido) $scope.pedidos[item].entrega = 'Total'
			// }
			console.log($scope.pedidos)
		})
	})
	.controller('order_detail_ctrl',function($scope, $state, $http, checkoutService, orderService){
		$scope.pedido=orderService.getOrder();
		console.log($scope.pedido);
		// $http.get('/orders/cli'+1'/getprod'+1)//pedido.id_pedido)//checkoutService.checkout.user.id_cliente)
		// .then(function(response){
		// 	$scope.produtos=response.data;
		// })
	})
	