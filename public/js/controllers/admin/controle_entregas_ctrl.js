angular.module('systennis')
	.controller('controle_entregas_ctrl',function($scope, $http, $timeout, $state){
		$scope.title = "Controle de Entregas";

		// Dados Recuperados
		$scope.pedido = [];
		$scope.entregas = [];

		// Id supervisor dummy
		sessionStorage.loggedID = 5;

		$http.get('/gestao_entregas/entregas_funcionario' + sessionStorage.loggedID).success(function(response){
		 	$scope.entregas = response;
		 	for (i = 0; i < $scope.entregas.length ; i ++) {
		 		$scope.entregas[i].data = $scope.entregas[i].horario_entrega.slice(0, 10);
		 		$scope.entregas[i].hora = $scope.entregas[i].horario_entrega.slice(11, 19);
		 	}
		});


		// Paginação
		$scope.totalItems = $scope.entregas.length
		$scope.maxSize = 5;
		$scope.currentPage = 1;

		$scope.visualizarEntrega = function(entrega){
	        sessionStorage.id_pedido = entrega.id_pedido;
	        sessionStorage.id_supervisor = entrega.id_supervisor;
	        sessionStorage.id_entrega = entrega.id_entrega;

	        $http.get('/gestao_entregas/pedido' + entrega.id_pedido).success(function(response){
		 	sessionStorage.id_endereco = response[0].id_endereco;
		 	});
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