

angular.module('systennis')
	.controller('prod_detail_ctrl',function($scope, $state, $stateParams, $http, $window, productService, cartService){

			$scope.detail = productService.getProducts();
			//console.log($scope.detail);

			if (!$scope.detail)
			{
				$http.get('/prod_detail/prod='+$stateParams.id_prod)
				.then(function(response){
					$scope.detail = response.data[0];
					//console.log($scope.detail);
				});
			}

			$scope.colors = [];

			$scope.setSize=function(tamanho, index){
				//console.log('meu elemento', $('#size' + index));
				$scope.detail.tamanho_prod=tamanho;
				$('.size_radio').css('background-color', '#ccc');
				$('#size' + index).css('background-color', '#ffaa00');
				//$('#size'+0).click{addClass("isActive") ou algo assim
			}

			$scope.addProduct = function(currObj){
				if ($scope.detail.tamanho_prod){
					currObj.qte_prod=1;
    	    		cartService.addProduct(currObj);
    	    		$state.go('cart');
				}
    	    	else alert("Escolha um tamanho de tênis.")
	    	};
	    	//console.log($stateParams.id_prod);

	    	$scope.show_color = function()
	    	{
	    		//console.log($scope.product.color);
	    	}

	    	$scope.change_colors = function(id_prod)
	    	{
	    		$window.location.href = '/#/detalheProduto/prod=' + id_prod;
	    		$window.location.reload(true);
	    	}
	  //   	$http.get('/prod_detail/prod='+$stateParams.id_prod)
			// 	.then(function(response){
			// 		$scope.detail=response.data;

			// 	})
			//FAZER PELA URL
			// console.log($scope.detail.id_prod)
			$http.get('/prod_detail/prod='+$stateParams.id_prod+'/getsizes')
			//$stateParams
				.then(function(response){
					$scope.sizes=response.data;
					//console.log($scope.sizes);

				})

			$http.get('/prod_detail/prod='+$stateParams.id_prod+'/getcolors')
				.then(function(response){
					$scope.colors = response.data;
					//console.log($scope.colors);
				});
			});
