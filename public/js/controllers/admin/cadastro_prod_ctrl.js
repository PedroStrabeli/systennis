angular.module('systennis')
	.controller('cadastro_prod_ctrl',function($scope, $http, $state){
		$scope.title = "Cadastro de Produtos";

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

		//RECUPERA PRODUTOS
		$scope.produtos = [];
		$http.get('/crud_prod').success(function(response){		
		 	$scope.produtos = response;
		});

		//CADASTRO DE PRODUTOS
		$scope.id_prod;
		$scope.adicionarProduto = function (produto, tamanhos) {
			produto.tamanhos = tamanhos;
			console.log(produto);
			produto.preco_prod = parseFloat(produto.preco_prod.toString().replace(/[,]+/g,".")).toFixed(2);
			produto.preco_prod = parseFloat(produto.preco_prod);
			$http.post('/crud_prod/create', produto).then(function(response){
				for (i = 0; i < tamanhos.length; i++){
					var input = {
						tamanho_prod : tamanhos[i].tamanho_prod,
						id_prod : response.data.id
					};
					$http.post('/crud_prod/create_tamanho', input);
				}
			}, function(error){});
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

		$scope.teste = function () {
			console.log('teste');
		}
		$scope.apagarTamanho = function (tamanho) {
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

	});