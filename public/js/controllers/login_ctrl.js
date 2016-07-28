angular.module('systennis')
	.controller('login_ctrl', function($scope, $state, $http){

	$scope.title = "Página de login";
	$scope.loginData = {};
	$scope.authError = false;

	$scope.login = function (userData) {
		if (userData.email && userData.password)
		{
			$http.post('/users/login', {email: userData.email, password: userData.password})
			.then(function (response)
			{
				if(response.data)
				{
					$scope.sessionToken = response.data
					$scope.loginSuccessful = true;
					$state.go('catalog');
				}
				else
				{
					$scope.errors = true;
				}

			});
		}
		else
		{

		}
	};
});