
angular.module('systennis')
	.controller('cart_ctrl',function($scope, $http, cartService){
		
		
		var user={id_user:1};
		if(user){
			//checa se existe algo no carrinho local.
			if (cartService.getProducts()!=[]){
				Checker();
			}
			else if(cartService.getProducts()==[])
			$http.get('/cart/1').then(function(response){
				
				$scope.cart = response.data;
				//console.log(response.data);
			});//.then(function(){
		}
		else{
			$scope.cart = cartService.getProducts();
		}
		
		//FAZER IR PARA O COOKIE
		//FAZER A COMPARAÇÂO DO CARRINHO NO BANCO COM O CARRINHO LOCAL E FAZER O INSERT

		function Checker(){
			var lista=cartService.getProducts();
			lista.forEach(function(item, index){

				itemCart={
					id_prod: item.id_prod,
					id_cliente: user.id_user,
					qte_prod: 1,
					tamanho_prod: 40//item.tamanho_prod
				};
				
				$http({method: 'POST', data: itemCart, url: '/cart/CheckProd'})
					.then(function(response){
						console.log(response.data[0]);
						if(response.data[0].count === 0){
							console.log("vou entrar\n\n");
							$http({method: 'POST', data: itemCart, url: '/cart/addCartProduct'})
								.then(function(){
									console.log("Produto adicionado ao carrinho: " + item.id_prod);
									$http.get('/cart/1').then(function(response){
										$scope.cart = response.data;
									});
								});	
							
						}
						
					});	
			})
		};
	});