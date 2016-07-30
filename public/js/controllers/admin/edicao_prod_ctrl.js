angular.module('systennis')
	.controller('edicao_prod_ctrl',function($scope, $http, $state){
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


		//EDICAO DE PRODUTOS
		$scope.id_prod;
		$scope.editarProduto = function (produto, tamanhos, tamanhosToDelete) {
			console.log(produto);
			produto.preco_prod = parseFloat(produto.preco_prod.toString().replace(/[,]+/g,".")).toFixed(2);
			produto.preco_prod = parseFloat(produto.preco_prod);
			$http.post('/crud_prod/update', produto)
			for (i = 0; i < tamanhosToDelete.length; i++){
				console.log(tamanhosToDelete[i])
				$http.post('/crud_prod/delete_tamanho', tamanhosToDelete[i]);
			}
			for (i = 0; i < tamanhos.length; i++){
				if (!tamanhos[i].hasOwnProperty("id_prod")){
					var input = {
						tamanho_prod : tamanhos[i].tamanho_prod,
						id_prod : produto.id_prod
					};
					$http.post('/crud_prod/create_tamanho', input);
				}
			}
			delete $scope.tamanhosToDelete
			delete $scope.tamanhos;
			delete $scope.produto;
			$state.go('consulta_prod');
		};

		//CADASTRO DE TAMANHOS
		$scope.tamanhos = [];		

		$scope.adicionarTamanho = function (tamanho) {
			var teste =1;
			if ($scope.tamanhos.length > 0){
				for (i = 0; i < $scope.tamanhos.length; i++){
					if ($scope.tamanhos[i].tamanho_prod == tamanho.tamanho_prod){
						teste = 0;
					}
				}
			}
			if(teste == 1) {
				$scope.tamanhos.push(angular.copy(tamanho));
			}
			$scope.tamanhos.sort(function compare(a, b) {
			    if (a.tamanho_prod < b.tamanho_prod) return -1;
			    if (a.tamanho_prod > b.tamanho_prod) return 1;
			    return 0;
			})
			delete tamanho;
		};

		$scope.tamanhosToDelete = [];

		$scope.apagarTamanho = function (tamanho) {
			if (tamanho.hasOwnProperty("id_prod")){
				$scope.tamanhosToDelete.push(tamanho);
			}
			var temp;
			for (i = 0; i < $scope.tamanhos.length; i++){
				if ($scope.tamanhos[i] == tamanho){
					$scope.tamanhos[i] = temp;
					$scope.tamanhos[i] = $scope.tamanhos[$scope.tamanhos.length - 1];
					$scope.tamanhos[$scope.tamanhos.length - 1] = temp 
					$scope.tamanhos.pop();
				}
			}
			$scope.tamanhos.sort(function compare(a, b) {
			    if (a.tamanho_prod < b.tamanho_prod) return -1;
			    if (a.tamanho_prod > b.tamanho_prod) return 1;
			    return 0;
			})
		};

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