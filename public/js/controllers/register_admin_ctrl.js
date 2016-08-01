// var http = require('http');

angular.module('systennis')
	.controller('register_admin_ctrl', function($scope, $state, $http){
		$scope.title = "Página de cadastro [ADMIN]";
        $scope.funcdata = {};
        $scope.departamentos = ["Vendas", "Suporte", "Logística", "Transporte"];
        $scope.cargos = ["Funcionário", "Gerente", "Supervisor"];
        $scope.address = {};
		$scope.errors = [];
		$scope.cities = [];

        $scope.refresh_filters = function()
        {
            var filtro_depto = "";
            var filtro_cargo = "";

            // console.log("Estou filtrando alguma coisa");
            // console.log("depto = " + $scope.funcdata.depto + " AND cargo = " + $scope.funcdata.cargo);

            if ($scope.funcdata.dept_filter) {filtro_depto = $scope.funcdata.depto};
            if ($scope.funcdata.hierarchy_filter) {filtro_cargo = $scope.funcdata.cargo};

            $scope.autofill_supervisor(filtro_depto, filtro_cargo);
        };

        $scope.showmemyId = function(param)
        {
            console.log($scope.funcdata.supervisor);
        }

        $scope.autofill_supervisor = function(filtro_depto = "", filtro_cargo = "")
        {
            var filtros = {};
            filtros.filtro_depto = filtro_depto;
            filtros.filtro_cargo = filtro_cargo;

            $http.post('/users_ad/get_supervisor', filtros)
            .success(function(response)
            {
                $scope.supervisores = response;
            });
        }

		$scope.check_where_am_i = function() {
            var page = 0;

            if ($state.params.userData) {page ++;}
            if ($state.params.registrationStatus) {page = 2;}

            $scope.whereAmI = page;
        };

		$scope.cadastrar_func = function (cadastro) {
			$http.post('/users_ad/register_admin', cadastro)
			.success(function(response){

				if (!('nome_func' in response))
				{
					$scope.errors = response;
				}
				else
				{
					$scope.errors = [];
					// $scope.page = 2;
					$scope.data_holder = response;

					$state.go('register_admin_2', {userData: response});
				};
			});
		};

        $scope.confirmar_funcdata = function () {
            var regParams = $scope.registrationParams;

            console.log(regParams);

            $http.post('/users_ad/register_admin_3', regParams)
            .success(function(response){

                if (response.status == "success")
                {
                    $state.go('register_admin_3', {registrationStatus: response.status});
                };
            });
        };

        $scope.formatAndShowFuncData = function (){

            $scope.registrationParams = $state.params;
            $scope.userData = $state.params.userData;

            $scope.tbfUserData =
            {"(1) Nome Completo": ($scope.userData.nome_func + " " + $scope.userData.sobrenome_func),
            "(2) E-Mail": ($scope.userData.email_func),
            "(3) CPF": ($scope.userData.cpf_func),
            "(4) Telefone": ($scope.userData.tel_func),
            "(5) Cargo": ($scope.userData.cargo_func),
            "(6) Departamento": ($scope.userData.departamento_func),
            "(7) Supervisor": ($scope.userData.supervisor_func)};

            console.log("Estou prestes a cuspir os dados de FUNCIONÁRIO no console");

            // console.log($scope.tbfUserData);
            // console.log($scope.tbfAddressData);
        };
});