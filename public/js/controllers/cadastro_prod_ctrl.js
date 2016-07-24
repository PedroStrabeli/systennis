angular.module('systennis')
	.controller('cadastro_prod_ctrl',function($scope, $http){
		$scope.title = "Cadastro de Produtos";

		$scope.tipo_produto = [
			"Tênis"
		];

		$scope.subtipo_produto = [
			"Casual",
			"Running",
			"Tennis e Squash",
			"Aventura",
			"Fitness e Musculação"
		];

		$http.get('/crud_prod').success(function(response){		
		 	$scope.produtos = response;
			
		});
		
		$scope.produtos = [];

		$scope.adicionarProduto = function (produto) {
			produto.preco = parseFloat(produto.preco.replace(/[,]+/g,".")).toFixed(2);
			produto.preco = parseFloat(produto.preco);
			$http.post('/crud_prod/create', produto);
			delete $scope.produto
		};

		$scope.teste = function (produto) {
			console.log(produto);
			$http.post('/cadastro_prod', produto);
		};
	
	});