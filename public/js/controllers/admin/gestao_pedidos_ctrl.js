angular.module('systennis')
	.controller('gestao_pedidos_ctrl',function($scope, $http, $timeout, $state){
		$scope.title = "Seleção de Pedidos";

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

		// Adicionar PEdidos
		$scope.adicionarPedidos = function (pedidos) {
			console.log(pedidos);
			adicionarPedidos = [];
			for (i=0;i<pedidos.length;i++) {
				if (pedidos[i].selecionado){
					pedidos[i].status_pedido = 'Encaminhado';
					pedidos[i].id_supervisor = sessionStorage.loggedID;
					$http.post('/gestao_pedidos/selecionar_pedidos', pedidos[i]); 
				}
			}
			console.log(adicionarPedidos);
		}


		// DELETE
		$scope.deletarProduto = function (produtoSelecionado) {
			console.log(produtoSelecionado);
			$http.post('/crud_prod/delete', produtoSelecionado);
			$timeout(function() {
				$state.go($state.current, {}, {reload: true});
			}, 500);
			
		};

		$scope.selecionarProduto = function (id) {
			$scope.produtoSelecionado = {id_prod : id};
			console.log($scope.produtoSelecionado);
		}

		$scope.editarProduto = function (id) {
			sessionStorage.editId = id;
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