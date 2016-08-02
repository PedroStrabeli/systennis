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

			$http.get('/orders/cli'+1+'/getprod'+1).then(function(response){
				$scope.detail=response.data;
				$scope.detail.total=calculaTotal(response.data);
				checkoutService.checkout.total=calculaTotal(response.data);
				console.log ($scope.detail)
			});

			var calculaTotal=function(item){
			var total=0;
			
			for (i=0, len= item.length; i < len; i++){
				total+=item[i].preco_prod*item[i].qte_prod;
			}
			return total.toFixed(2);
		}
		
		// $http.get('/orders/cli'+1'/getprod'+1)//pedido.id_pedido)//checkoutService.checkout.user.id_cliente)
		// .then(function(response){
		// 	$scope.produtos=response.data;
		// })
	})
	