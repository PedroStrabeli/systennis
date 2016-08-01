angular.module('systennis')
	.controller('login_admin_ctrl', function($scope, $state, $http){

	$scope.title = "Página de login - [ADMIN]";
	$scope.loginData = {};
	$scope.authError = false;
	$scope.isAuthenticated = false;

	$scope.session_check_ad = function ()
	{
		$http.get('/users_ad/get_session_ad').success(function(response)
		{
			console.log(response);
			if (response.func)
			{
				$scope.isAuthenticated = true;
				$scope.func = response.func
			}
		})
	};

	$scope.logout = function ()
	{
		$http.get('/users_ad/logout_ad');
	}

	$scope.login_ad = function (userData) {
		if (userData.email && userData.password)
		{
			$http.post('/users_ad/login_admin', {email: userData.email, password: userData.password})
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