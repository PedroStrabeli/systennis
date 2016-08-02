
angular.module('systennis')
	.controller('cart_ctrl',function($scope, $state, $http, cartService, checkoutService){
		
		$scope.pagename='Carrinho';

		var getCart=function(id_cliente){
			$http.get('/cart/'+id_cliente).then(function(response){
				checkoutService.checkout.cart=response.data;
				checkoutService.checkout.cart.total=calculaTotal(response.data);
				checkoutService.checkout.total=calculaTotal(response.data);
				//console.log (checkoutService.checkout.cart)
				$scope.cart = checkoutService.checkout.cart;
			});
		}

		$scope.changeItem=function(item){
			$http({method: 'POST', 
						data: {id_cliente: user.id_cliente, id_prod: item.id_prod, qte_prod:item.qte_prod},
						url: '/cart/changeItem'})
						.then(function(response){							
						}).catch(function(err){
							alert("Ocorreu um erro! \n"+err);
						});
			getCart(user.id_cliente);
		}

		var calculaTotal=function(item){
			var total=0;
			
			for (i=0, len= item.length; i < len; i++){
				total+=item[i].preco_prod*item[i].qte_prod;
			}
			return total.toFixed(2);
		}
		var user={id_cliente:1, nome_cliente:"Pedro Strabeli", email_cliente:'pedrostrabeli@gmail.com'};
		if(user){
			console.log('Usuario logado')
			//checa se existe algo no carrinho local.
			if (cartService.getProducts()[0]!= null){
				//console.log(cartService.getProducts()!==[])
				Checker();
			}
			else {
				getCart(user.id_cliente);
			}
		}
		else{
			$scope.cart = cartService.getProducts();
		}


		$scope.reloadState = function() {
		   // $state.go($state.current, {}, {reload: true});
		   $state.transitionTo('cart', $stateParams, { reload: true, inherit: false, notify: true });
		}
		
		//FAZER IR PARA O COOKIE
		$scope.removeCart=function(id_prod){
			console.log ('apagando')
			if(user){
				$http({method: 'POST', 
						data: {id_cliente: user.id_cliente, id_prod: id_prod},
						url: '/cart/removeCart'})
						.then(function(response){
							alert("Removido com sucesso.");
							$state.transitionTo('cart', $stateParams, { reload: true, inherit: false, notify: true });
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
					id_cliente: user.id_cliente,
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
									getCart(user.id_cliente);
								});	
							
						} else{
							getCart(user.id_cliente);
						}
						
					});	
			}
		};
		checkoutService.checkout.user=user;
	});