
angular.module('systennis')
	.controller('cart_ctrl',function($scope, $state, $http, cartService){
		
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
				$http.get('/cart/'+user.id_user).then(function(response){
					
					$scope.cart = response.data;
					console.log(response.data);
				});//.then(function(){
			}
		}
		else{
			$scope.cart = cartService.getProducts();
		}


		$scope.reloadState = function() {
		   $state.go($state.current, {}, {reload: true});
		}
		
		//FAZER IR PARA O COOKIE
		var removeCart=function(id_prod){
			console.log ('apagando')
			if(user){
				$http({method: 'POST', 
						data: {id_cliente: id_cliente, id_prod: id_prod},
						url: '/cart/removeCart'})
						.then(function(response){
							alert("Removido com sucesso.");
							$route.reload();
						}).catch(function(err){
							alert("Ocorreu um erro! \n"+err);
						});
					}
			else {
				//Tirar do array.
			}
		}

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
									$http.get('/cart/'+id_user).then(function(response){
										$scope.cart = response.data;
									});
								});	
							
						}
						
					});	
			}
		};
	});