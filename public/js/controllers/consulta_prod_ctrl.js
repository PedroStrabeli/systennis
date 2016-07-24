angular.module('systennis')
	.controller('consulta_prod_ctrl',function($scope, $http, $timeout, $state){
		$scope.title = "Consulta de Produtos";

		// Paginação
		$scope.maxSize = 5;
		$scope.currentPage = 1;	  

		$http.get('/crud_prod').success(function(response){		
		 	$scope.produtos = response;
		});
		
		$scope.produtos = [];

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


		$scope.ordenar = function(keyname){
	        $scope.sortKey = keyname;
	        $scope.reverse = !$scope.reverse;
    	};
		  
	})

	//Filtro para paginação 
	.filter('startFrom', function(){
       return function(data, start){
        return data.slice(start);
      }
    });

