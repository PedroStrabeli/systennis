angular.module('systennis')
	.controller('visualizar_pedido_ctrl',function($scope, $http, $timeout, $state){
		$scope.title = "Pedido";

		// Query de Pedidos
		$scope.pedidos = [];

		// Id supervisor dummy
		sessionStorage.loggedID = 1;

		//Dados Recuperados
		$scope.pedido = [];
		$scope.supervisor = [];
		$scope.equipe = [];
		$scope.itens_pedido = [];
		$scope.entregas = [];


		$scope.id_endereco = [];
		$scope.tel_cliente = [];
		$scope.cel_cliente = [];

		// Recupera Pedido
		$http.get('/gestao_entregas/pedido' + sessionStorage.id_pedido).success(function(response){		
		 	$scope.pedido = response[0];
	 		$scope.pedido.data = $scope.pedido.data_pedido.slice(0, 10);
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

		// Recupera Equipe
		$http.get('/gestao_entregas/equipe' + sessionStorage.id_supervisor).success(function(response){
		 	for (i=0;i<response.length;i++){
		 		if (response[i].id_func == response[i].id_supervisor){
		 			$scope.supervisor = response[i];
		 		} else {
		 			$scope.equipe.push(response[i]);
		 		}
		 	}
		});

		// Recupera Endereco
		$http.get('/gestao_entregas/endereco' + sessionStorage.id_endereco).success(function(response){
		 	$scope.endereco = response[0];
		});

		// Recupera Itens Pedido
		$http.get('/gestao_entregas/itens_pedido' + sessionStorage.id_pedido).success(function(response){
		 	$scope.itens_pedido = response;
		});

		// Recupera Entregas
		$http.get('/gestao_entregas/entregas' + sessionStorage.id_pedido).success(function(response){
		 	$scope.entregas = response;
		 	for (i=0;i<$scope.entregas.length;i++){
		 		$scope.entregas[i].data = $scope.entregas[i].horario_entrega.slice(0, 10);
		 		$scope.entregas[i].hora = $scope.entregas[i].horario_entrega.slice(11, 19);
		 	}
		});


		$scope.criarEntrega = function(funcionario){
	        var existeProdutoSelecionado = false;
	        var data = new Date();
	        var stringData = data.getFullYear() + "-" + data.getMonth() + "-" + data.getDay() + " " + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
	        var entrega = {
	        	id_pedido 		: $scope.pedido.id_pedido,
	        	status_entrega  : 'Pendente',
	        	id_nf  			: 9999,
	        	id_supervisor   : $scope.supervisor.id_supervisor,
	        	id_func			: funcionario.id_func,
	        	horario_entrega : stringData,
	        };
	        for (i=0;i<$scope.itens_pedido.length;i++) {
	        	if ($scope.itens_pedido[i].hasOwnProperty('selecionado')) {
	        		existeProdutoSelecionado = true;
	        	}
	        }
	        if (existeProdutoSelecionado) {
	        	console.log(entrega);
	        	console.log(funcionario);
	        	$http.post('/gestao_entregas/create_entrega', entrega).then(function(response){
				for (i=0;i<$scope.itens_pedido.length;i++) {
					if ($scope.itens_pedido[i].hasOwnProperty('selecionado')) {
						$scope.itens_pedido[i].id_entrega = response.data.id;
						$http.post('/gestao_entregas/edit_item_pedido', $scope.itens_pedido[i]);
					}
					$timeout(function() {
						$state.go($state.current, {}, {reload: true});}, 500);
				}
			}, function(error){});
	        } else {
	        	console.log('Erro!!!')
	        }

    	};

		// Adicionar Pedidos
		$scope.adicionarPedidos = function (pedidos) {
			adicionarPedidos = [];
			for (i=0;i<pedidos.length;i++) {
				if (pedidos[i].selecionado){
					pedidos[i].status_pedido = 'Encaminhado';
					pedidos[i].id_supervisor = sessionStorage.loggedID;
					$http.post('/gestao_pedidos/selecionar_pedidos', pedidos[i]); 
				}
			}
			$http.post
			$timeout(function() {
				$state.go($state.current, {}, {reload: true});
			}, 500);
		}

		$scope.ordenar = function(keyname){
	        $scope.sortKey = keyname;
	        $scope.reverse = !$scope.reverse;
    	};

	})