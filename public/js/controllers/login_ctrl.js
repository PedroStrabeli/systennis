angular.module('systennis')
	.controller('login_ctrl', function($scope, $state, $http){

	$scope.title = "Página de login";
	$scope.loginData = {};
	$scope.authError = false;
	$scope.isAuthenticated = false;

	$scope.session_check = function ()
	{
		$http.get('/users/get_session').success(function(response)
		{
			console.log(response);
			if (response.user)
			{
				$scope.isAuthenticated = true;
				$scope.user = response.user
			}
		})
	};

	$scope.logout = function ()
	{
		$http.get('/users/logout');
	}

	$scope.login = function (userData) {
		if (userData.email && userData.password)
		{
			$http.post('/users/login', {email: userData.email, password: userData.password})
			.then(function (response)
			{
				if(response.data)
				{
					$scope.sessionToken = response.data.token

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