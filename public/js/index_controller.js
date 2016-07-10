
angular.module('systennis')
	.controller('catalog_ctrl',function($scope, $http){
		$scope.title = "oi";

		$http.get('/').success(function(response){
			console.log ('AAAAAAAAAAAAAAAAAAAAAAAHHHH got it bro');
			console.log(response);
			$scope.result=response.result;
		});
		// prod1 = {
		// 	nome_prod: 'tenis1',
		// 	desc_prod: 'o mais caro',
		// 	preco_prod: 799,
		// 	url_imagem:  'url1.png',
		// 	tipo_prod:  'tenis',
		// }

		// 		prod3 = {
		// 	nome_prod: 'tenis3',
		// 	desc_prod: 'o mais bunda',
		// 	preco_prod: 80,
		// 	url_imagem:  'url69.png',
		// 	tipo_prod:  'penis de borracha',
		// }

		// 		prod2 = {
		// 	nome_prod: 'tenis2',
		// 	desc_prod: 'o mais merda',
		// 	preco_prod: 1.99,
		// 	url_imagem:  'url666.png',
		// 	tipo_prod:  'penis',
		// }

		// $scope.result=[prod1, prod2, prod3]
	});