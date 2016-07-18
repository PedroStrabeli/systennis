angular.module('systennis')
	.controller('catalog_ctrl',function($scope, $http){
		$scope.title = 'Systennis'

		$http.get('/catalog').success(function(response){
			$scope.result = response;
		});

		$scope.searchProduct = function(){
			console.log($scope.search.opt);
			$http.post('/catalog', $scope.search).success(function(response){
				console.log(response);
				$scope.result = response;
			});
		};
	});