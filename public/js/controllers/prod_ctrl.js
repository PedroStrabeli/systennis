



angular.module('systennis')
	.controller('prod_detail_ctrl',function($scope, $http, productService, cartService){
			$scope.detail = productService.getProducts();
			console.log(JSON.stringify(productService.getProducts()))
			$scope.pagename=productService.getProducts().nome_prod;

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


			$http.get('/prod_detail/prod='+$scope.detail.id_prod+'/getsizes')
				.then(function(response){
					$scope.sizes=response.data;

				})
		}
	);
