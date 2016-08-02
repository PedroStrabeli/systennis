angular.module('systennis')
	
	.controller('catalog_ctrl', function($scope, $http, $state, productService, cartService){
		// $scope.title = 'Systennis'
		$scope.maxSize = 30;
		$scope.currentPage = 1;	

		$http.get('/catalog/brands').success(function(response){
			$scope.brands = response;
	    });

	    $http.get('/catalog/types').success(function(response){
			$scope.types = response;
			//console.log("Os tipos que encontrei foram: " + $scope.types);
	    });

	    console.log("KW = " + $state.params.keywordFilter);
	    console.log("BF = " + $state.params.brandFilter);
	    console.log("TF = " + $state.params.typeFilter);

		if(!($state.params.keywordFilter || $state.params.brandFilter || $state.params.typeFilter))
		{
			console.log("Primeiro Caso!")
			if(!$scope.result)
			{
				$http.get('/catalog').success(function(response){
				$scope.result = response;
				$scope.currentPage = 0;
			    $scope.pageSize = 10;

			   // console.log($scope.result);
			    //$scope.data = [];
			    $scope.numberOfPages=function(){
		        return Math.ceil($scope.result.length/$scope.pageSize);
		    	}
		    });
			}
		}
		else if($state.params.keywordFilter)
		{
			var searchQuery = {searchQuery: $state.params.keywordFilter}

			$http.post('/catalog', searchQuery)
			.success(function(response){
				$scope.result = response;
			});
		}
		else if($state.params.brandFilter)
		{
			var searchQuery = {searchQuery: $state.params.brandFilter}

			$http.post('/catalog/brandfilter', searchQuery)
			.success(function(response){
				$scope.result = response;
			});
		}
		else if($state.params.typeFilter)
		{
			var searchQuery = {searchQuery: $state.params.typeFilter}

			$http.post('/catalog/typefilter', searchQuery)
			.success(function(response){
				$scope.result = response;
			});
		};
		// $scope.pagename='Catálogo';

		$scope.sendDetail = function(currObj){
        	productService.sendProduct(currObj);
    	};

    	$scope.addProduct = function(currObj){
        	cartService.addProduct(currObj);
    	};

    	$scope.filterProducts = function(keyword)
		{
			$state.go($state.current, {brandFilter: null, typeFilter: null, keywordFilter: keyword}, {reload: true});
		};

		$scope.filterByBrand = function(brand)
		{
			$state.go($state.current, {brandFilter: brand, typeFilter: null, keywordFilter: null}, {reload: true});
		};

		$scope.filterByType = function(type)
		{
			$state.go($state.current, {brandFilter: null, typeFilter: type, keywordFilter: null}, {reload: true});
		};

		// $scope.searchProduct = function(){
		// 	console.log($scope.search.opt);
		// 	$http.post('/catalog', $scope.search).success(function(response){
		// 		console.log(response);
		// 		$scope.result = response;
		// 	});
		// };

	})
	.filter('startFrom', function(){
       return function(data, start){
        return data.slice(start);
      }
    })