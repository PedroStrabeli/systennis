angular.module('systennis')
	.controller('prod_detail_ctrl',function($scope, $stateParams, $http, productService, cartService){
			$scope.detail = productService.getProducts();
			console.log(JSON.stringify(productService.getProducts()))
			$scope.pagename=productService.getProducts().nome_prod;

			//$stateParams.prod_id=$scope.detail.id_prod;
			//expect($stateParams).toBe({contactId: $scope.detail.id_prod});

			$scope.setSize=function(tamanho, index){
				//console.log('meu elemento', $('#size' + index));
				$scope.detail.tamanho_prod=tamanho;
				// $('#size' + index). fazer mudar a bolinha como se fosse hover.
				//$('#size'+0).click{addClass("isActive") ou algo assim
			}

			$scope.addProduct = function(currObj){
    	    	cartService.addProduct(currObj);
    	    	console.log(currObj);
	    	};
	    	console.log($stateParams.id_prod);
	  //   	$http.get('/prod_detail/prod='+$stateParams.id_prod)
			// 	.then(function(response){
			// 		$scope.detail=response.data;

			// 	})
			//FAZER PELA URL
			console.log($scope.detail.id_prod)
			$http.get('/prod_detail/prod='+$stateParams.id_prod+'/getsizes')
			//$stateParams
				.then(function(response){
					$scope.sizes=response.data;

				})

			$http.get('/prod_detail/prod='+$stateParams.id_prod+'/getcolors')
				.then(function(response){
					$scope.colors = response.data
					// console.log($scope.colors);
				});
	});
