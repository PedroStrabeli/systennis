
angular.module('systennis')
	.controller('cart_ctrl',function($scope, $http, cartService){
		
		
		var user;//={id_user:1};
		if(user){
			$http.get('/cart/1').success(function(response){
				
				$scope.cart = response;
				console.log(response);
			});//.then(function(){
		}
		else{
			$scope.cart = cartService.getProducts();
		}
		
		//FAZER IR PARA O COOKIE
		//FAZER A COMPARAÇÂO DO CARRINHO NO BANCO COM O CARRINHO LOCAL E FAZER O INSERT


		// function add_prod(id_prod){
		// 	$http.get('/addprod='+id_prod).success(function(response){
				
		// 		$scope.result = response;
		// 		$scope.title = 'Systennis'
		// 	})
		// }
	});