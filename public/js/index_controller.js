
angular.module('systennis')
	.controller('catalog_ctrl',function($scope, $http){
		$scope.title = "oi";

		$http.get('/catalog').success(function(response, data, datum, oi){
			
			$scope.result=response;
			$scope.title='title'
		});
		
	});