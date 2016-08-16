angular.module('systennis')
	.controller('visualizar_entrega_ctrl',function($scope, $http, $timeout, $state){
		$scope.title = "Entrega";

		// Query de Pedidos
		$scope.pedidos = [];

		// Id supervisor dummy
		sessionStorage.loggedID = 1;

		//Dados Recuperados
		$scope.pedido = [];
		$scope.supervisor = [];
		$scope.equipe = [];
		$scope.itens_pedido = [];
		$scope.itens_selecao = [];
		$scope.entregas = [];
		$scope.entregaSelecionada = [];


		$scope.id_endereco = [];
		$scope.tel_cliente = [];
		$scope.cel_cliente = [];

		// Recupera Pedido
		$http.get('/gestao_entregas/pedido' + sessionStorage.id_pedido).success(function(response){
		 	$scope.pedido = response[0];
	 		$scope.pedido.data = $scope.pedido.data_pedido.slice(0, 10);
	 		$scope.pedido.data = $scope.pedido.data.replace("-", "/");
	 		$scope.pedido.hora = $scope.pedido.data_pedido.slice(11, 19);
	 		if($scope.pedido.entr_parcial == 1){
	 			$scope.pedido.entr_parcial = "Sim";
	 		} else {
	 			$scope.pedido.entr_parcial = "Não";
	 		}
	 		$scope.tel_cliente = {
	 			ddd 	: $scope.pedido.tel_fixo.slice(0,2),
	 			numero  : $scope.pedido.tel_fixo.slice(2,11)
	 		};
	 		$scope.cel_cliente = {
	 			ddd 	: $scope.pedido.tel_cel.slice(0,2),
	 			numero  : $scope.pedido.tel_cel.slice(2,11)
	 		};
		});

		// Recupera Itens Pedido
		$http.get('/gestao_entregas/itens_pedido' + sessionStorage.id_pedido).success(function(response){
		 	$scope.itens_pedido = response;
		 	for (i=0;i<response.length;i++){
		 		if(response[i].id_entrega === null){
		 			$scope.itens_selecao.push(response[i]);
		 		}
		 	}
		});

		// Recupera Endereco
		$http.get('/gestao_entregas/endereco' + sessionStorage.id_endereco).success(function(response){
		 	$scope.endereco = response[0];
		});

		// Recupera Entregas
		$http.get('/gestao_entregas/entregas' + sessionStorage.id_pedido).success(function(response){
		 	$scope.entregas = response;
		 	for (i=0;i<$scope.entregas.length;i++){
		 		//Formata data e horario
		 		$scope.entregas[i].data = $scope.entregas[i].horario_entrega.slice(0, 10);
		 		$scope.entregas[i].data = $scope.entregas[i].data.replace("-", "/");
		 		$scope.entregas[i].data = $scope.entregas[i].data.replace("-", "/");
		 		$scope.entregas[i].hora = $scope.entregas[i].horario_entrega.slice(11, 19);
		 		//recupera itens de entrega
		 		$http.get('/gestao_entregas/entregaitens' + $scope.entregas[i].id_entrega).success(function(response){
		 			for (i=0;i<$scope.entregas.length;i++){
		 				if (response.length >= 1){
			 				if($scope.entregas[i].id_entrega == response[0].id_entrega){
			 					$scope.entregas[i].itens_entrega = response;
			 				}
			 			}
		 			}
		 		});
		 	}
		 	for (i=0;i<$scope.entregas.length;i++){
		 		if($scope.entregas[i].id_entrega == sessionStorage.id_entrega){
		 			$scope.entregaSelecionada = $scope.entregas[i];
		 		}
		 	}
		});


		$scope.finalizarEntrega = function(){
	        var atualizarPedido = 0;
	        // Atualiza status para Entregue
	        var input = {
	        	status_entrega :  "Entregue"
	        };
	        for (i=0;i<$scope.entregas.length;i++){
	        	if(sessionStorage.id_entrega == $scope.entregas[i].id_entrega){
	        		$scope.entregas[i].status_entrega = "Entregue";
	        	}
	        }
	        $http.post('/gestao_entregas/finalizar_entrega' + sessionStorage.id_entrega, input);
	        // Atualiza Estoques dos pedidos
	        // for (i=0;i<$scope.entregaSelecionada.itens_entrega.length;i++) {
        	// 	var atualizarEstoque = $scope.entregaSelecionada.itens_entrega[i].estoque_prod - $scope.entregaSelecionada.itens_entrega[i].qte_prod;
        	// 	$scope.entregaSelecionada.itens_entrega[i].estoque_prod = atualizarEstoque;
        	// 	var input = {
        	// 		estoque_prod : atualizarEstoque
        	// 	};
        	// 	$http.post('/gestao_entregas/atualizar_estoque' + $scope.entregaSelecionada.itens_entrega[i].id_prod, input);
       		// }
       		// Atualiza Status do Pedido
       		for (i=0;i<$scope.entregas.length;i++){
       			if($scope.entregas[i].status_entrega == "Entregue") {
       				var atualizarPedido = atualizarPedido + 1;
       			}
       		}
       		console.log($scope.entregas.length);
       		console.log(atualizarPedido);
       		if ($scope.entregas.length == atualizarPedido) {
			 	if ($scope.itens_selecao.length == 0){
			 		console.log("Fechar Pedido!");
	       			$scope.pedido.status_pedido = "Entregue";
	       			$http.post('/gestao_entregas/selecionar_pedidos', $scope.pedido);
			 	}
       		} else {
       			console.log("Não Fechar Pedido!");
       		}
       		$timeout(function() {
						$state.go($state.current, {}, {reload: true});}, 1000);

    	};


		$scope.ordenar = function(keyname){
	        $scope.sortKey = keyname;
	        $scope.reverse = !$scope.reverse;
    	};

	})