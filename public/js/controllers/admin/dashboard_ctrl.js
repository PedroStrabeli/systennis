angular.module('systennis')
	.controller('dashboard_ctrl',function($scope, $http, $timeout, $state){
		$scope.title = "Controle de Entregas";

		// Query de Pedidos
		$scope.pedidos = []; 

		// Id supervisor dummy
		sessionStorage.loggedID = 1;  

		$http.get('/gestao_pedidos').success(function(response){		
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
		
		// Paginação
		$scope.totalItems = $scope.pedidos.length
		$scope.maxSize = 5;
		$scope.currentPage = 1;	

		// Adicionar Pedidos
		$scope.adicionarPedidos = function (pedidos) {
			adicionarPedidos = [];
			for (i=0;i<pedidos.length;i++) {
				if (pedidos[i].selecionado){
					pedidos[i].status_pedido = 'Encaminhado';
					pedidos[i].id_supervisor = sessionStorage.loggedID;
					$http.post('/gestao_pedidos/selecionar_pedidos', pedidos[i]); 
				}
			}
			$timeout(function() {
				$state.go($state.current, {}, {reload: true});
			}, 500);
		}

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