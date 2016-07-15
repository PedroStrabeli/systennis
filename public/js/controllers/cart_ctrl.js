
angular.module('systennis')
	.controller('catalog_ctrl',function($scope, $http){
		
		function add_prod(id_prod){
			$http.get('/addprod='+id_prod).success(function(response){
				
				$scope.result = response;
				$scope.title = 'Systennis'
			})
		}
	});