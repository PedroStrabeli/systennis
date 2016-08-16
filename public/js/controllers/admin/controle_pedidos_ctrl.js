angular.module('systennis')
	.controller('controle_pedidos_ctrl',function($scope, $http, $timeout, $state){
		$scope.title = "Controle de Pedidos";

		$scope.isAuthenticated = false;
		$scope.isAuthenticatedAsAdmin = false;

		$scope.session_check = function ()
		{
			$http.get('/users/get_session').success(function(response)
			{
				console.log(response);
				console.log("Estou checando a sessao!");
				if (response.user)
				{
					$scope.isAuthenticated = true;
					$scope.user = response.user;
				}
				if (response.func)
				{
					$scope.isAuthenticatedAsAdmin = true;
					$scope.func = response.func;
					console.log("Estou autenticado como funcionario.")

					$http.get('/gestao_entregas/pedidos_supervisor' + $scope.func.id_func).success(function(response){		
					 	$scope.pedidos = response;
					 	for (i = 0; i < $scope.pedidos.length ; i ++) {
					 		$scope.pedidos[i].data = $scope.pedidos[i].data_pedido.slice(0, 10);
					 		$scope.pedidos[i].hora = $scope.pedidos[i].data_pedido.slice(11, 19);

					 		if($scope.pedidos[i].entr_parcial == 1){
					 			$scope.pedidos[i].entr_parcial = "Sim";
					 		} else {
					 			$scope.pedidos[i].entr_parcial = "Não";
					 		}
					 	}
					});
				}
			})
		};

		// Query de Pedidos
		$scope.pedidos = [];

		$scope.func = [];

		// Paginação
		$scope.totalItems = $scope.pedidos.length
		$scope.maxSize = 5;
		$scope.currentPage = 1;

		$scope.visualizarPedido = function(pedido){
	        sessionStorage.id_pedido = pedido.id_pedido;
	        sessionStorage.id_supervisor = pedido.id_supervisor;
	        sessionStorage.id_endereco = pedido.id_endereco;
    	};

		$scope.ordenar = function(keyname){
	        $scope.sortKey = keyname;
	        $scope.reverse = !$scope.reverse;
    	};

	})

	// Filtro para paginação
	.filter('startFrom', function(){
       return function(data, start){
        return data.slice(start);
      }
    })