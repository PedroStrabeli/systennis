



angular.module('systennis')
	.controller('prod_detail_ctrl',function($scope, $http, productService, cartService){
			$scope.detail = productService.getProducts();
		}
	);
	//nao estou sabendo acessar!! problemas de escopo.