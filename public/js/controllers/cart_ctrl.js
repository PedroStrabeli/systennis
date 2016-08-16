
angular.module('systennis')
	.controller('cart_ctrl',function($scope, $state, $http, cartService, checkoutService){
		
		// $scope.pagename='Carrinho';
		var user=checkoutService.checkout.user;


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
			console.log(cartService.getProducts())
		}

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
			if (item.qte_prod<1){}
			else{
				if(checkoutService.checkout.user){
					$http({method: 'POST', 
								data: {id_cliente: user.id_cliente, id_prod: item.id_prod, qte_prod:item.qte_prod},
								url: '/cart/changeItem'})
								.then(function(response){
								}).catch(function(err){
									alert("Ocorreu um erro! \n"+err);
								});
					getCart(user.id_cliente);
				}
				else{
					for (i=0;i<checkoutService.checkout.cart;i++)
						if(checkoutService.checkout.cart[i]===item)
							console.log(checkoutService.checkout.cart[i])
							//checkoutService.checkout.cart[i].qte_prod=item.qte_prod
							cartService.cart[i].qte_prod=item.qte_prod
				}
			}
		}

		var calculaTotal=function(item){
			var total=0;
			
			for (i=0, len= item.length; i < len; i++){
				total+=item[i].preco_prod*item[i].qte_prod;
			}
			return total.toFixed(2);
		}
		//var user={id_cliente:1, nome_cliente:"Pedro Strabeli", email_cliente:'pedrostrabeli@gmail.com'};
		


		$scope.reloadState = function() {
			if(user)
				getCart(user.id_cliente);
			else
				$scope.cart=cartService.getProducts()
		   // $state.go($state.current, {}, {reload: true});
		   // $state.transitionTo('cart', $stateParams, { reload: true, inherit: false, notify: true });
		}
		
		//FAZER IR PARA O COOKIE
		$scope.removeCart=function(id_prod, tamanho_prod){
			console.log ('apagando')
			if(user){
				console.log(user.id_cliente+'  '+id_prod)
				$http({method: 'POST',
						data: {id_cliente: user.id_cliente, id_prod: id_prod, tamanho_prod: tamanho_prod},
						url: '/cart/removeCart'})
						.then(function(response){
							alert("Removido com sucesso.");
							getCart(user.id_cliente);
							//$state.transitionTo('cart', { reload: true, inherit: false, notify: true });
						}).catch(function(err){
							alert("Ocorreu um erro! \n"+err);
						});
					}
			else {
				//Tirar do array.
				console.log(checkoutService.checkout.user)
				var lista = cartService.getProducts()
				
				for (i=0;i<lista.length;i++){
					if (lista[i].id_prod==id_prod && lista[i].tamanho_prod==tamanho_prod){
						//console.log('vou pegar')
						//delete array[i];
						console.log(cartService.cart)
						cartService.cart.splice(i, 1);
						$scope.cart = cartService.getProducts();
					}
				}
			}
		}

		function Checker(){
			var lista=cartService.getProducts();
			
			while(lista[0]!=null){
				for (i=0;i<lista.length;i++){
					lista[i].id_cliente=user.id_cliente
					//lista[i].qte_prod=1
				}
				cartService.cart.pop()
				var item = lista.pop()
				putProdCart(item)
				
				
			}
		};

		function putProdCart(item){

			$http({method: 'POST', data: item, url: '/cart/CheckProd'})
					.then(function(response){
						//console.log(response.data[0]);
						if(response.data[0].count === 0){
							console.log("vou entrar\n\n");
							$http({method: 'POST', data: item, url: '/cart/addCartProduct'})
								.then(function(){
									console.log("Produto adicionado ao carrinho: " + item.id_prod);
									getCart(user.id_cliente);
								});
						} else{
							getCart(user.id_cliente);
						}
					});
		}


	});