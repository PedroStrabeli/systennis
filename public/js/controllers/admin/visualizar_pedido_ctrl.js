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
		$scope.itens_selecao = [];
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
		 	for (i=0;i<response.length;i++){
		 		if(response[i].id_entrega === null){
		 			$scope.itens_selecao.push(response[i]);
		 		}
		 	}
		});

		// Recupera Entregas
		$http.get('/gestao_entregas/entregas' + sessionStorage.id_pedido).success(function(response){
		 	$scope.entregas = response;
		 	for (i=0;i<$scope.entregas.length;i++){
		 		//Formata data e horario
		 		$scope.entregas[i].data = $scope.entregas[i].horario_entrega.slice(0, 10);
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
		});


		$scope.criarEntrega = function(funcionario){
	        var existeProdutoSelecionado = false;
	        var itens_selecionados = [];
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
	        for (i=0;i<$scope.itens_selecao.length;i++) {
	        	if ($scope.itens_selecao[i].hasOwnProperty('selecionado')) {
	        		existeProdutoSelecionado = true;
	        		itens_selecionados.push($scope.itens_selecao[i]);
	        	}
	        }
	        if (existeProdutoSelecionado) {
	        	console.log(entrega);
	        	console.log(funcionario);
	        	$http.post('/gestao_entregas/create_entrega', entrega).then(function(response){
					for (i=0;i<$scope.itens_selecao.length;i++) {
						if ($scope.itens_selecao[i].hasOwnProperty('selecionado')) {
							$scope.itens_selecao[i].id_entrega = response.data.id;
							$http.post('/gestao_entregas/edit_item_pedido', $scope.itens_selecao[i]);
						}
					}
				}, function(error){});
	        } else {
	        	console.log('Erro!!!')
	        }
	        if ($scope.itens_selecao.length == itens_selecionados.length) {
	        	console.log("Encaminhado.");
	        	$scope.pedido.status_pedido = 'Encaminhado';
	        	$http.post('/gestao_entregas/selecionar_pedidos', $scope.pedido);
	        } else {
	        	console.log("Encaminhado Parcialmente.")
	        	$scope.pedido.status_pedido = 'Encaminhado Parcialmente';
	        	$http.post('/gestao_entregas/selecionar_pedidos', $scope.pedido);
	        }
	        $timeout(function() {
						$state.go($state.current, {}, {reload: true});}, 500);

    	};


		$scope.ordenar = function(keyname){
	        $scope.sortKey = keyname;
	        $scope.reverse = !$scope.reverse;
    	};

	})