
angular.module('systennis')
	.controller('cart_ctrl',function($scope, $http, cartService){
		
		$scope.pagename='Carrinho';
		var user={id_user:1};
		if(user){
			console.log('Usuario logado')
			//checa se existe algo no carrinho local.
			if (cartService.getProducts()[0]!= null){
				//console.log(cartService.getProducts()!==[])
				Checker();
				console.log('checker')
			}
			else {
				$http.get('/cart/1').then(function(response){
					
					$scope.cart = response.data;
					console.log(response.data);
				});//.then(function(){
			}
		}
		else{
			$scope.cart = cartService.getProducts();
		}
		
		//FAZER IR PARA O COOKIE

		function Checker(){
			var lista=cartService.getProducts();
			while(lista[0]!=null){
				item=lista.pop();
				itemCart={
					id_prod: item.id_prod,
					id_cliente: user.id_user,
					qte_prod: 1,
					tamanho_prod: item.tamanho_prod
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
			}
		};
	});