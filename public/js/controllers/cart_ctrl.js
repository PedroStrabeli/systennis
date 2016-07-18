
angular.module('systennis')
	.controller('cart_ctrl',function($scope, $http){
		

		$http.get('/cart/1').success(function(response){
			$scope.cart = response;
		});


		function add_prod(id_prod){
			$http.get('/addprod='+id_prod).success(function(response){
				
				$scope.result = response;
				$scope.title = 'Systennis'
			})
		}
	});