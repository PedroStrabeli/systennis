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

		$http.get('/cadastro_prod').success(function(response){		
		 	$scope.produtos = response;
			
		});
		
		$scope.produtos = [];

		$scope.adicionarProduto = function (produto) {
			produto.preco = produto.preco.replace(/[R$.]+/g,"");
			produto.preco = parseFloat(produto.preco.replace(/[,]+/g,"."));
			// $scope.produtos.push(angular.copy(produto));
			$http.post('/cadastro_prod', produto);
			delete $scope.produto
		};

		$scope.teste = function (produto) {
			console.log(produto);
			$http.post('/cadastro_prod', produto);
		};

		// JQUERY - Price Format

		$('#price').priceFormat({
    		prefix: 'R$ ',
    		centsSeparator: ',',
    		thousandsSeparator: '.'
		});
		
	});