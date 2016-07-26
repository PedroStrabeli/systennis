angular.module('systennis')

	.filter('offset', function() {
	  return function(input, start) {
	    start = parseInt(start, 10);
	    return input.slice(start);
	  };
	})
	.controller('catalog_ctrl',function($scope, $http, productService, cartService){
		// $scope.title = 'Systennis'

		// $scope.pagename='Catálogo';
		$http.get('/catalog').success(function(response){			
			$scope.result = response;
			$scope.currentPage = 0;
		    $scope.pageSize = 10;
		    //$scope.data = [];
		    $scope.numberOfPages=function(){
	        return Math.ceil($scope.result.length/$scope.pageSize);                
	    }
	    
		});

		$scope.sendDetail = function(currObj){
        	productService.sendProduct(currObj);
    	};

    	$scope.addProduct = function(currObj){
        	cartService.addProduct(currObj);
    	};


		$scope.searchProduct = function(){
			console.log($scope.search.opt);
			$http.post('/catalog', $scope.search).success(function(response){
				console.log(response);
				$scope.result = response;
			});
		};

	});