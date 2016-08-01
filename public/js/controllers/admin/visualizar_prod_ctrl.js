angular.module('systennis')
	.controller('visualizar_prod_ctrl',function($scope, $http, $state){
		$scope.title = "Edição de Produtos";

		$scope.produto = {};

		//SELECT TIPO
		$scope.tipo_produto = [
			"Tênis"
		];

		//SELECT SUBTIPO
		$scope.subtipo_produto = [
			"Casual",
			"Running",
			"Tennis e Squash",
			"Aventura",
			"Fitness e Musculação"
		];

		//TAMANHOS
		$scope.tamanhos = [];	


		//RECUPERA PRODUTOS
		$scope.produto = [];
		$http.get('/crud_prod/recupera' + sessionStorage.editId).then(function(response){		
		 	$scope.produto = response.data[0];
		}, function(){});
		$http.get('/crud_prod/tamanhos' + sessionStorage.editId).then(function(response){		
		 	$scope.tamanhos = response.data;
		 	$scope.tamanhos.sort(function compare(a, b) {
			    if (a.tamanho_prod < b.tamanho_prod) return -1;
			    if (a.tamanho_prod > b.tamanho_prod) return 1;
			    return 0;
			})
		}, function(){});

	});