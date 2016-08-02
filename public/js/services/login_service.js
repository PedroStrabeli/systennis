angular.module('systennis')
	.service('loginService', function($http) {

	var getUserAssync = function(callback){
		$http.get('/users/get_session').success(function(response)
		{
			if(response.user)
			{
				callback(response.user);
			}
			else
			{
				callback(false);
			}
		})
	};

	var getFuncAssync = function(callback){
		$http.get('/users/get_session').success(function(response)
		{
			if(response.func)
			{
				callback(response.func);
			}
			else
			{
				callback(false);
			}
		})
	};

	var getUser = function (){
        getUser(function(callback){
            return(callback)
        });
    };

    var getFunc = function (){
        getFunc(function(callback){
            return(callback)
        });
    };

	return {
		getUser: getUser,
		getFunc: getFunc
	};

});